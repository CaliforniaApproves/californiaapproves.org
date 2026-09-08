import { useCallback, useEffect, useRef, useState } from "preact/hooks";

// Public site key for the Cloudflare Turnstile widget (safe to ship to the
// browser). The matching secret key lives only in the Pages project as the
// TURNSTILE_SECRET_KEY environment variable and is used by
// functions/api/subscribe.ts for server-side verification.
export const TURNSTILE_SITE_KEY = "0x4AAAAAAEshBKfGRpZh1De-";

const SCRIPT_SRC =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileRenderOptions = {
	sitekey: string;
	action?: string;
	callback?: (token: string) => void;
	"error-callback"?: () => void;
	"expired-callback"?: () => void;
};

type TurnstileApi = {
	render: (el: HTMLElement, options: TurnstileRenderOptions) => string;
	reset: (widgetId?: string) => void;
	remove: (widgetId?: string) => void;
};

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

let scriptPromise: Promise<void> | null = null;

// Inject the Turnstile script once per page load and resolve when it is ready.
function loadTurnstileScript(): Promise<void> {
	if (typeof window === "undefined") return Promise.resolve();
	if (window.turnstile) return Promise.resolve();
	if (scriptPromise) return scriptPromise;

	scriptPromise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = SCRIPT_SRC;
		script.async = true;
		script.defer = true;
		script.addEventListener("load", () => resolve());
		script.addEventListener("error", () => {
			scriptPromise = null;
			reject(new Error("Failed to load the Turnstile script"));
		});
		document.head.appendChild(script);
	});

	return scriptPromise;
}

export type TurnstileWidget = {
	/** Attach to the element that should host the widget. */
	containerRef: { current: HTMLDivElement | null };
	/** The current verification token, or null until the challenge is solved. */
	token: string | null;
	/** Discard the current token and re-arm the widget (tokens are single-use). */
	reset: () => void;
};

// Render an explicit Turnstile widget into a ref'd element and expose its token.
export function useTurnstile(action: string): TurnstileWidget {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetId = useRef<string | null>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		loadTurnstileScript()
			.then(() => {
				if (cancelled || !containerRef.current || !window.turnstile) return;
				widgetId.current = window.turnstile.render(containerRef.current, {
					sitekey: TURNSTILE_SITE_KEY,
					action,
					callback: (value) => setToken(value),
					"error-callback": () => setToken(null),
					"expired-callback": () => setToken(null),
				});
			})
			.catch(() => {
				// Network/script failure: the form stays usable via its native
				// action fallback, and the server rejects submissions with no token.
			});

		return () => {
			cancelled = true;
			if (widgetId.current && window.turnstile) {
				window.turnstile.remove(widgetId.current);
			}
			widgetId.current = null;
			setToken(null);
		};
	}, [action]);

	const reset = useCallback(() => {
		setToken(null);
		if (widgetId.current && window.turnstile) {
			window.turnstile.reset(widgetId.current);
		}
	}, []);

	return { containerRef, token, reset };
}

export type SubscribeForm = "newsletter" | "pledge";

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
	} catch {
		return {
			ok: false,
			message: "Network error — please check your connection and try again.",
		};
	}

	const data = (await response
		.json()
		.catch(() => null)) as SubscribeResult | null;
	if (data && typeof data.ok === "boolean") return data;
	return { ok: false, message: "Something went wrong. Please try again." };
}
