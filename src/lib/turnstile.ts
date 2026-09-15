// Cloudflare Turnstile and /api/subscribe helpers for <caa-subscribe-form>.

// Public site key for the Cloudflare Turnstile widget (safe to ship to the
// browser). The matching secret key lives only in the Workers project as the
// TURNSTILE_SECRET_KEY environment variable and is used by
// src/worker/subscribe.ts for server-side verification.
export const TURNSTILE_SITE_KEY = "0x4AAAAAAEshBKfGRpZh1De-";

// Turnstile invokes this global once window.turnstile is populated. The
// script's own "load" event fires before that, so resolving on "load" races
// the API and can leave window.turnstile undefined.
const READY_CALLBACK = "__caaTurnstileReady";

const SCRIPT_SRC = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${READY_CALLBACK}`;

// Content blockers sometimes answer the request with an empty 200 rather than
// failing it, so no "error" event fires and the load would hang forever.
const LOAD_TIMEOUT_MS = 10_000;

export type TurnstileRenderOptions = {
	sitekey: string;
	action?: string;
	callback?: (token: string) => void;
	/** Receives a Cloudflare error code; the widget shows its own error UI. */
	"error-callback"?: (code?: string) => void;
	"expired-callback"?: () => void;
	"timeout-callback"?: () => void;
	"unsupported-callback"?: () => void;
};

type TurnstileApi = {
	render: (el: HTMLElement, options: TurnstileRenderOptions) => string;
	reset: (widgetId?: string) => void;
	remove: (widgetId?: string) => void;
};

declare global {
	interface Window {
		turnstile?: TurnstileApi;
		__caaTurnstileReady?: () => void;
	}
}

let scriptPromise: Promise<void> | null = null;

// Inject the Turnstile script once per page load and resolve when the API is
// ready. A rejection clears the cached promise so a later call can retry.
export function loadTurnstileScript(): Promise<void> {
	if (window.turnstile) return Promise.resolve();
	if (scriptPromise) return scriptPromise;

	scriptPromise = new Promise<void>((resolve, reject) => {
		let settled = false;

		const settle = (error?: Error) => {
			if (settled) return;
			settled = true;
			window.clearTimeout(timer);
			if (error) {
				// Let the next caller start a fresh attempt.
				scriptPromise = null;
				reject(error);
			} else {
				resolve();
			}
		};

		const timer = window.setTimeout(
			() => settle(new Error("Timed out loading the Turnstile script")),
			LOAD_TIMEOUT_MS,
		);

		window.__caaTurnstileReady = () => settle();

		const script = document.createElement("script");
		script.src = SCRIPT_SRC;
		script.async = true;
		script.defer = true;
		script.addEventListener("error", () =>
			settle(new Error("Failed to load the Turnstile script")),
		);
		document.head.appendChild(script);
	});

	return scriptPromise;
}

/** Keys of the form configs in src/worker/subscribe.ts. */
export type SubscribeForm = "pledge" | "contact";

export type SubscribeResult = {
	ok: boolean;
	message: string;
};

// POST a subscription form to the Turnstile-protected proxy at /api/subscribe,
// which verifies the token server-side before forwarding to Mailchimp. Every
// field currently on the form (including Mailchimp's hidden group/tag/honeypot
// inputs) is forwarded as-is.
export async function submitSubscription(
	form: SubscribeForm,
	formEl: HTMLFormElement,
	token: string,
): Promise<SubscribeResult> {
	const body = new URLSearchParams();
	for (const [key, value] of new FormData(formEl).entries()) {
		if (typeof value === "string") body.append(key, value);
	}
	body.set("form", form);
	body.set("cf-turnstile-response", token);

	let response: Response;
	try {
		response = await fetch("/api/subscribe", {
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			body: body.toString(),
		});
	} catch (error) {
		console.error("subscribe: request never reached the server", error);
		return {
			ok: false,
			message: "Network error — please check your connection and try again.",
		};
	}

	// Read the body as text first so a non-JSON response (an HTML error page, or
	// a payload swapped by an extension or proxy) is logged rather than silently
	// swallowed by .json().
	let raw: string;
	try {
		raw = await response.text();
	} catch (error) {
		console.error("subscribe: could not read the response body", error);
		return { ok: false, message: "Something went wrong. Please try again." };
	}

	let data: SubscribeResult | null = null;
	try {
		data = JSON.parse(raw) as SubscribeResult;
	} catch (error) {
		console.error(
			`subscribe: response was not JSON (status ${response.status})`,
			raw.slice(0, 500),
			error,
		);
	}
	if (data && typeof data.ok === "boolean") return data;
	return { ok: false, message: "Something went wrong. Please try again." };
}
