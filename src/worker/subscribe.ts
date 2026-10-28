// Handler for POST /api/subscribe, routed from src/worker/index.ts.
//
// Verifies a Cloudflare Turnstile token server-side, then (and only then)
// adds the subscriber to the matching listmonk lists. listmonk's own public
// subscription endpoint is not used, because anyone could post to it directly
// and skip the Turnstile check.
//
// Required Worker environment variables:
//   TURNSTILE_SECRET_KEY        - secret key paired with the widget site key
//   LISTMONK_URL                - base URL, e.g. https://lists.californiaapproves.org
//   LISTMONK_API_USER           - listmonk API user (needs subscribers:manage
//                                 and lists:get_all)
//   LISTMONK_API_TOKEN          - that user's API token (secret)
// Optional:
//   TURNSTILE_ALLOWED_HOSTNAMES - comma-separated hostname allowlist
//                                 (defaults to the production domains below)
//   ENVIRONMENT                 - set to "production" on the prod deployment.
//                                 Any other value also allows localhost tokens;
//                                 UNSET counts as production (fail closed), so
//                                 local runs must set it explicitly.

export interface Env {
	TURNSTILE_SECRET_KEY?: string;
	LISTMONK_URL?: string;
	LISTMONK_API_USER?: string;
	LISTMONK_API_TOKEN?: string;
	TURNSTILE_ALLOWED_HOSTNAMES?: string;
	ENVIRONMENT?: string;
}

interface SiteVerifyResponse {
	success: boolean;
	action?: string;
	hostname?: string;
	"error-codes"?: string[];
}

// Client form id -> the Turnstile action it must carry. Checkbox fields on the
// form select the listmonk lists, which are looked up by name.
const FORMS = {
	pledge: { action: "pledge", alwaysLists: ["Pledge"] },
	contact: { action: "contact", alwaysLists: [] as string[] },
} as const;

type FormKey = keyof typeof FORMS;

const CHECKBOX_LISTS = {
	news: "News",
	pledge: "Pledge",
	signature_gatherer: "SignatureGatherer",
} as const;

const DEFAULT_HOSTNAMES = [
	"californiaapproves.org",
	"www.californiaapproves.org",
];

const SITEVERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

const GENERIC_REJECTION =
	"Verification failed. Please refresh the page and try again.";

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}

function hostnameAllowed(hostname: string, env: Env): boolean {
	const host = hostname.toLowerCase();
	const isProduction = (env.ENVIRONMENT ?? "production") === "production";

	if (host === "localhost" || host === "127.0.0.1") return !isProduction;
	// Preview deployments: <version>.californiaapproves.workers.dev
	if (host.endsWith(".californiaapproves.workers.dev")) return true;

	const configured = (env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
		.split(",")
		.map((entry) => entry.trim().toLowerCase())
		.filter(Boolean);
	const allowlist = configured.length > 0 ? configured : DEFAULT_HOSTNAMES;
	return allowlist.includes(host);
}

async function readParams(request: Request): Promise<URLSearchParams | null> {
	const contentType = request.headers.get("content-type") ?? "";
	if (contentType.includes("application/x-www-form-urlencoded")) {
		return new URLSearchParams(await request.text());
	}
	if (contentType.includes("multipart/form-data")) {
		const form = await request.formData();
		const params = new URLSearchParams();
		for (const [key, value] of form.entries()) {
			params.append(key, typeof value === "string" ? value : "");
		}
		return params;
	}
	return null;
}

class ListmonkError extends Error {}

// The parts of listmonk's `{data: ...}` responses that this file reads.
interface ListmonkBody {
	message?: string;
	data?: {
		results?: { id: number; name: string; email?: string; status?: string }[];
	};
}

async function listmonk(
	env: Env,
	path: string,
	init: { method?: string; body?: unknown } = {},
): Promise<{ status: number; body: ListmonkBody | null }> {
	const res = await fetch(`${env.LISTMONK_URL}${path}`, {
		method: init.method ?? "GET",
		headers: {
			authorization: `token ${env.LISTMONK_API_USER}:${env.LISTMONK_API_TOKEN}`,
			"content-type": "application/json",
		},
		body: init.body === undefined ? undefined : JSON.stringify(init.body),
	});
	let body: ListmonkBody | null = null;
	try {
		body = (await res.json()) as ListmonkBody;
	} catch {
		// Non-JSON body; callers go by the status.
	}
	return { status: res.status, body };
}

// Adds `email` to the named lists, creating the subscriber if needed. An
// existing subscriber keeps their name and attributes and just gains the lists;
// a blocklisted one is left alone. Returns false for a blocklisted address.
async function subscribe(
	env: Env,
	email: string,
	name: string,
	attribs: Record<string, string>,
	listNames: string[],
): Promise<boolean> {
	const lists = await listmonk(env, "/api/lists?per_page=all&minimal=true");
	if (lists.status !== 200)
		throw new ListmonkError(`could not read lists (${lists.status})`);
	const idByName = new Map(
		(lists.body?.data?.results ?? []).map((l) => [l.name, l.id]),
	);
	const ids = listNames.map((n) => idByName.get(n));
	if (ids.some((id) => id === undefined)) {
		throw new ListmonkError(`missing list in ${listNames.join(", ")}`);
	}

	const created = await listmonk(env, "/api/subscribers", {
		method: "POST",
		body: {
			email,
			name,
			status: "enabled",
			lists: ids,
			attribs,
			preconfirm_subscriptions: true,
		},
	});
	if (created.status === 200) return true;
	if (created.status !== 409) {
		throw new ListmonkError(
			`create failed (${created.status}): ${created.body?.message}`,
		);
	}

	// `search` is a plain substring match, so keep only the exact address. The
	// SQL `query` parameter would need the subscribers:sql_query permission.
	const found = await listmonk(
		env,
		`/api/subscribers?per_page=20&search=${encodeURIComponent(email)}`,
	);
	const existing = found.body?.data?.results?.find(
		(subscriber) => subscriber.email?.toLowerCase() === email,
	);
	if (found.status !== 200 || !existing) {
		throw new ListmonkError(
			`lookup failed (${found.status}): ${found.body?.message}`,
		);
	}
	if (existing.status === "blocklisted") return false;

	const added = await listmonk(env, "/api/subscribers/lists", {
		method: "PUT",
		body: {
			ids: [existing.id],
			action: "add",
			target_list_ids: ids,
			status: "confirmed",
		},
	});
	if (added.status !== 200) {
		throw new ListmonkError(
			`add to lists failed (${added.status}): ${added.body?.message}`,
		);
	}
	return true;
}

// What Cloudflare's always-pass test widget (site key 1x00000000000000000000AA)
// hands the browser. Its siteverify answer has a made-up hostname and action,
// so it can't go through verifyTurnstile.
const TURNSTILE_TEST_TOKEN = "XXXX.DUMMY.TOKEN.XXXX";

// Local development only: skip Cloudflare's check for the test widget's token.
// Needs ENVIRONMENT=development (unset counts as production) and a request that
// really arrived on localhost, so no deployed Worker can take this path.
function isLocalDevToken(request: Request, env: Env, token: string): boolean {
	const host = new URL(request.url).hostname;
	return (
		env.ENVIRONMENT === "development" &&
		(host === "localhost" || host === "127.0.0.1") &&
		token === TURNSTILE_TEST_TOKEN
	);
}

// Server-to-server Turnstile verification. Returns the response to send when
// the token is rejected, or null when it passes.
async function verifyTurnstile(
	request: Request,
	env: Env,
	secret: string,
	token: string,
	action: string,
): Promise<Response | null> {
	const verifyBody = new URLSearchParams();
	verifyBody.set("secret", secret);
	verifyBody.set("response", token);
	const remoteIp = request.headers.get("CF-Connecting-IP");
	if (remoteIp) verifyBody.set("remoteip", remoteIp);

	let outcome: SiteVerifyResponse;
	try {
		const verifyRes = await fetch(SITEVERIFY_URL, {
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			body: verifyBody.toString(),
		});
		outcome = (await verifyRes.json()) as SiteVerifyResponse;
	} catch {
		return json(
			{ ok: false, message: "Could not reach the verification service." },
			502,
		);
	}

	if (!outcome.success) {
		console.warn("subscribe: siteverify rejected", outcome["error-codes"]);
		return json({ ok: false, message: GENERIC_REJECTION }, 403);
	}
	if (outcome.action && outcome.action !== action) {
		console.warn(
			`subscribe: action mismatch (got ${outcome.action}, want ${action})`,
		);
		return json({ ok: false, message: GENERIC_REJECTION }, 403);
	}
	if (!outcome.hostname || !hostnameAllowed(outcome.hostname, env)) {
		const isLocal =
			outcome.hostname === "localhost" || outcome.hostname === "127.0.0.1";
		// The response stays generic; only the log distinguishes the cases, so a
		// local run doesn't look like a genuine bad-host rejection.
		console.warn(
			isLocal && !env.ENVIRONMENT
				? `subscribe: rejected a ${outcome.hostname} token because ENVIRONMENT is unset, which counts as production. Set ENVIRONMENT=development in .dev.vars for local runs.`
				: `subscribe: hostname not allowed (${outcome.hostname})`,
		);
		return json({ ok: false, message: GENERIC_REJECTION }, 403);
	}
	return null;
}

export async function handleSubscribe(
	request: Request,
	env: Env,
): Promise<Response> {
	if (!env.TURNSTILE_SECRET_KEY) {
		console.error("subscribe: TURNSTILE_SECRET_KEY is not configured");
		return json(
			{ ok: false, message: "Sign-up is temporarily unavailable." },
			500,
		);
	}

	if (!env.LISTMONK_URL || !env.LISTMONK_API_USER || !env.LISTMONK_API_TOKEN) {
		console.error("subscribe: listmonk is not configured");
		return json(
			{ ok: false, message: "Sign-up is temporarily unavailable." },
			500,
		);
	}

	const params = await readParams(request);
	if (!params) {
		return json({ ok: false, message: "Unsupported request." }, 415);
	}

	const formKey = params.get("form") ?? "";
	// hasOwn, not `in`: `in` walks the prototype chain, so form=constructor or
	// form=__proto__ would clear this check and reach siteverify with an
	// undefined config.
	if (!Object.hasOwn(FORMS, formKey)) {
		return json({ ok: false, message: "Unknown form." }, 400);
	}
	const config = FORMS[formKey as FormKey];

	const token = params.get("cf-turnstile-response");
	if (!token) {
		return json(
			{ ok: false, message: "Please complete the verification challenge." },
			400,
		);
	}

	// Bot honeypot: the hidden `website` field must stay empty. Pretend it
	// worked so bots get no signal, but don't add anyone.
	if ((params.get("website") ?? "").trim() !== "") {
		return json({ ok: true, message: "Thanks — you're signed up!" });
	}

	const email = (params.get("email") ?? "").trim().toLowerCase();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
		return json(
			{ ok: false, message: "Please enter a valid email address." },
			400,
		);
	}
	const selected = new Set<string>(config.alwaysLists);
	for (const [field, listName] of Object.entries(CHECKBOX_LISTS)) {
		if (params.has(field)) selected.add(listName);
	}
	if (selected.size === 0) {
		return json(
			{ ok: false, message: "Please choose at least one option." },
			400,
		);
	}

	const rejection = isLocalDevToken(request, env, token)
		? null
		: await verifyTurnstile(
				request,
				env,
				env.TURNSTILE_SECRET_KEY,
				token,
				config.action,
			);
	if (rejection) return rejection;

	// --- Gate passed: add to listmonk --------------------------------------
	const field = (key: string) => (params.get(key) ?? "").trim().slice(0, 500);
	const name =
		[field("fname"), field("lname")].filter(Boolean).join(" ") ||
		email.split("@")[0];
	const attribs: Record<string, string> = {};
	if (field("zip")) attribs.zip = field("zip");
	if (field("why")) attribs.reform_why = field("why");

	try {
		const added = await subscribe(env, email, name, attribs, [...selected]);
		if (!added) {
			// Don't reveal that an address is blocklisted.
			return json({ ok: true, message: "Thanks — you're signed up!" });
		}
	} catch (error) {
		console.error("subscribe: listmonk request failed", error);
		return json(
			{
				ok: false,
				message: "Could not reach the mailing service. Please try again later.",
			},
			502,
		);
	}
	return json({ ok: true, message: "Thanks — you're signed up!" });
}
