// Handler for POST /api/subscribe, routed from src/worker/index.ts.
//
// Verifies a Cloudflare Turnstile token server-side, then (and only then)
// forwards the submission to the correct Mailchimp audience. No form posts to
// Mailchimp directly, so the Turnstile check cannot be bypassed.
//
// Required Worker environment variable:
//   TURNSTILE_SECRET_KEY        - secret key paired with the widget site key
// Optional:
//   TURNSTILE_ALLOWED_HOSTNAMES - comma-separated hostname allowlist
//                                 (defaults to the production domains below)
//   ENVIRONMENT                 - set to "production" on the prod deployment.
//                                 Any other value also allows localhost tokens;
//                                 UNSET counts as production (fail closed), so
//                                 local runs must set it explicitly.

export interface Env {
	TURNSTILE_SECRET_KEY?: string;
	TURNSTILE_ALLOWED_HOSTNAMES?: string;
	ENVIRONMENT?: string;
}

interface SiteVerifyResponse {
	success: boolean;
	action?: string;
	hostname?: string;
	"error-codes"?: string[];
}

const MAILCHIMP_BASE =
	"https://californiaapproves.us5.list-manage.com/subscribe/post-json";

// Client form id -> the Turnstile action it must carry and its Mailchimp form.
const FORMS = {
	newsletter: {
		action: "newsletter",
		mailchimp: `${MAILCHIMP_BASE}?u=b4aa7540a62457c043ff00e36&id=dddf3d641c&f_id=003abee6f0`,
	},
	pledge: {
		action: "pledge",
		mailchimp: `${MAILCHIMP_BASE}?u=b4aa7540a62457c043ff00e36&id=dddf3d641c&f_id=004f43edf0`,
	},
	// Same audience and form id as the newsletter; separate Turnstile action so
	// a token minted on one page cannot be replayed against the other.
	contact: {
		action: "contact",
		mailchimp: `${MAILCHIMP_BASE}?u=b4aa7540a62457c043ff00e36&id=dddf3d641c&f_id=003abee6f0`,
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

// Mailchimp's post-json endpoint answers with bare JSON or, sometimes, a
// JSONP wrapper like `/**/typeof cb === 'function' && cb({...});`.
function parseMailchimp(text: string): { result?: string; msg?: string } {
	const match = text.match(/\{[\s\S]*\}/);
	if (!match) return {};
	try {
		return JSON.parse(match[0]);
	} catch {
		return {};
	}
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

	// Mailchimp bot honeypot: any field named b_* must stay empty. Pretend it
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

	// --- Gate passed: forward to Mailchimp ---------------------------------
	const mailchimpBody = new URLSearchParams();
	for (const [key, value] of params.entries()) {
		if (key === "form" || key === "cf-turnstile-response") continue;
		mailchimpBody.append(key, value);
	}

	let result: { result?: string; msg?: string };
	try {
		const mcRes = await fetch(config.mailchimp, {
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			body: mailchimpBody.toString(),
		});
		result = parseMailchimp(await mcRes.text());
	} catch {
		return json(
			{
				ok: false,
				message: "Could not reach the mailing service. Please try again later.",
			},
			502,
		);
	}

	const cleanMsg = (result.msg ?? "").replace(/<[^>]*>/g, "").trim();

	if (result.result === "success") {
		return json({
			ok: true,
			message: cleanMsg || "You're signed up — check your inbox to confirm.",
		});
	}
	if (/already subscribed/i.test(cleanMsg)) {
		return json({ ok: true, message: "You're already on the list — thanks!" });
	}
	return json(
		{
			ok: false,
			message:
				cleanMsg || "Sign-up failed. Please check your details and try again.",
		},
		400,
	);
}
