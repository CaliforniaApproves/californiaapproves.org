// Handler for POST /api/subscribe, routed from src/worker/index.ts.
//
// Verifies a Cloudflare Turnstile token server-side, then (and only then)
// adds the submission to listmonk (lists.californiaapproves.org) through its
// API. No form posts to listmonk directly, so the Turnstile check cannot be
// bypassed.
//
// Required Worker environment variables:
//   TURNSTILE_SECRET_KEY        - secret key paired with the widget site key
//   LISTMONK_API_USER           - listmonk API user (Users in the listmonk admin)
//   LISTMONK_API_TOKEN          - that user's token
// Optional:
//   TURNSTILE_ALLOWED_HOSTNAMES - comma-separated hostname allowlist
//                                 (defaults to the production domains below)
//   ENVIRONMENT                 - set to "production" on the prod deployment.
//                                 Any other value also allows localhost tokens;
//                                 UNSET counts as production (fail closed), so
//                                 local runs must set it explicitly.

export interface Env {
	TURNSTILE_SECRET_KEY?: string;
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

const LISTMONK_URL = "https://lists.californiaapproves.org";

// listmonk list IDs (Lists in the listmonk admin). The newsletter and pledge
// lists are double opt-in, so new signups get a confirmation email.
// TODO: set these to the real IDs once the lists exist in listmonk.
const LISTS = {
	newsletter: 0,
	approvalPrimaryPledge: 0,
	signatureVolunteers: 0,
} as const;

// Client form id -> the Turnstile action it must carry and the lists it joins.
const FORMS = {
	pledge: {
		action: "pledge",
		lists: [LISTS.newsletter, LISTS.approvalPrimaryPledge],
	},
	contact: {
		action: "contact",
		lists: [LISTS.newsletter],
	},
} as const;

type FormKey = keyof typeof FORMS;

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

// Longest value kept from a free-text field.
const MAX_FIELD_LENGTH = 500;

function field(params: URLSearchParams, name: string): string {
	return (params.get(name) ?? "").trim().slice(0, MAX_FIELD_LENGTH);
}

type Signup = {
	email: string;
	name: string;
	lists: number[];
	attribs: Record<string, string | boolean>;
};

// Builds the listmonk subscriber from the form fields. Only these fields are
// kept, so a client can't write arbitrary attributes.
function toSignup(params: URLSearchParams, lists: readonly number[]): Signup {
	const firstName = field(params, "first_name");
	const lastName = field(params, "last_name");
	const attribs: Signup["attribs"] = {};
	if (firstName) attribs.first_name = firstName;
	if (lastName) attribs.last_name = lastName;
	const zip = field(params, "zip");
	if (zip) attribs.zip = zip;
	const why = field(params, "why");
	if (why) attribs.why = why;

	// Ticking the box joins the volunteers list. Like the old Mailchimp form,
	// this is additive: leaving it unticked never removes anyone.
	const allLists = [...lists];
	if (params.get("volunteer") === "yes") {
		allLists.push(LISTS.signatureVolunteers);
	}

	return {
		email: field(params, "email"),
		// listmonk fills in a name from the email address when this is empty.
		name: [firstName, lastName].filter(Boolean).join(" "),
		lists: allLists,
		attribs,
	};
}

type Subscriber = {
	id: number;
	email: string;
	status: "enabled" | "disabled" | "blocklisted";
	attribs: Record<string, unknown>;
};

class ListmonkError extends Error {
	readonly status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

async function listmonk<T>(
	env: Env,
	method: string,
	path: string,
	body?: unknown,
): Promise<T> {
	const response = await fetch(`${LISTMONK_URL}${path}`, {
		method,
		headers: {
			authorization: `token ${env.LISTMONK_API_USER}:${env.LISTMONK_API_TOKEN}`,
			...(body === undefined ? {} : { "content-type": "application/json" }),
		},
		body: body === undefined ? undefined : JSON.stringify(body),
	});
	const text = await response.text();
	let data: { data?: T; message?: string } = {};
	try {
		data = JSON.parse(text);
	} catch {
		// Not JSON; reported below.
	}
	if (!response.ok) {
		throw new ListmonkError(
			response.status,
			data.message ?? `listmonk returned ${response.status}`,
		);
	}
	return data.data as T;
}

// listmonk's subscriber search is a case-insensitive regex over names and
// emails, so escape the address and anchor it to match only that email.
function emailPattern(email: string): string {
	return `^${email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`;
}

async function findSubscriber(
	env: Env,
	email: string,
): Promise<Subscriber | undefined> {
	const query = new URLSearchParams({
		search: emailPattern(email),
		per_page: "10",
	});
	const page = await listmonk<{ results: Subscriber[] }>(
		env,
		"GET",
		`/api/subscribers?${query}`,
	);
	return page.results.find(
		(sub) => sub.email.toLowerCase() === email.toLowerCase(),
	);
}

type Outcome = "created" | "updated" | "blocklisted";

// Creates the subscriber, or adds an existing one to the form's lists and
// merges in the new attributes. Either way listmonk emails a confirmation
// link for any double opt-in list they haven't confirmed yet.
async function subscribe(env: Env, signup: Signup): Promise<Outcome> {
	try {
		await listmonk(env, "POST", "/api/subscribers", {
			email: signup.email,
			name: signup.name,
			status: "enabled",
			lists: signup.lists,
			attribs: signup.attribs,
			preconfirm_subscriptions: false,
		});
		return "created";
	} catch (error) {
		// 409: the email is already a subscriber.
		if (!(error instanceof ListmonkError) || error.status !== 409) throw error;
	}

	const existing = await findSubscriber(env, signup.email);
	if (!existing) throw new Error("subscriber exists but was not found");
	// Someone who unsubscribed everywhere or marked us as spam. Don't mail them.
	if (existing.status === "blocklisted") return "blocklisted";

	// Without a status, new subscriptions start unconfirmed and existing ones
	// keep theirs.
	await listmonk(env, "PUT", "/api/subscribers/lists", {
		ids: [existing.id],
		action: "add",
		target_list_ids: signup.lists,
	});
	// Rebuild the name from the merged attributes, so a form that only sends a
	// last name doesn't drop the first name given earlier.
	const attribs = { ...existing.attribs, ...signup.attribs };
	const name = [attribs.first_name, attribs.last_name]
		.filter((part) => typeof part === "string" && part)
		.join(" ");
	// PATCH keeps fields it isn't sent, and sends the opt-in email for the
	// unconfirmed double opt-in lists.
	await listmonk(env, "PATCH", `/api/subscribers/${existing.id}`, {
		...(signup.name && name ? { name } : {}),
		attribs,
	});
	return "updated";
}

export async function handleSubscribe(
	request: Request,
	env: Env,
): Promise<Response> {
	if (
		!env.TURNSTILE_SECRET_KEY ||
		!env.LISTMONK_API_USER ||
		!env.LISTMONK_API_TOKEN
	) {
		console.error(
			"subscribe: TURNSTILE_SECRET_KEY, LISTMONK_API_USER or LISTMONK_API_TOKEN is not configured",
		);
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

	// Bot honeypot: any field named b_* must stay empty. Pretend it
	// worked so bots get no signal, but don't forward anything.
	for (const [key, value] of params.entries()) {
		if (key.startsWith("b_") && value.trim() !== "") {
			return json({ ok: true, message: "Thanks — you're signed up!" });
		}
	}

	// --- Server-to-server Turnstile verification -----------------------------
	const verifyBody = new URLSearchParams();
	verifyBody.set("secret", env.TURNSTILE_SECRET_KEY);
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
	if (outcome.action && outcome.action !== config.action) {
		console.warn(
			`subscribe: action mismatch (got ${outcome.action}, want ${config.action})`,
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

	// --- Gate passed: add to listmonk ---------------------------------------
	const signup = toSignup(params, config.lists);
	if (!signup.email) {
		return json(
			{ ok: false, message: "Please enter your email address." },
			400,
		);
	}

	let result: Outcome;
	try {
		result = await subscribe(env, signup);
	} catch (error) {
		// listmonk's 400s are about the submitted details, such as an invalid
		// email address, and are safe to show.
		if (error instanceof ListmonkError && error.status === 400) {
			return json({ ok: false, message: error.message }, 400);
		}
		console.error("subscribe: listmonk request failed", error);
		return json(
			{
				ok: false,
				message: "Could not reach the mailing service. Please try again later.",
			},
			502,
		);
	}

	if (result === "blocklisted") {
		console.warn("subscribe: ignored a signup from a blocklisted subscriber");
	}
	return json({
		ok: true,
		message:
			result === "created"
				? "You're signed up — check your inbox to confirm."
				: "Thanks — you're on the list!",
	});
}
