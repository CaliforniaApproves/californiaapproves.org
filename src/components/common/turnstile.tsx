import { useCallback, useEffect, useRef, useState } from "preact/hooks";

// Public site key for the Cloudflare Turnstile widget (safe to ship to the
// browser). The matching secret key lives only in the Workers project as the
// TURNSTILE_SECRET_KEY environment variable and is used by
// functions/api/subscribe.ts for server-side verification.
export const TURNSTILE_SITE_KEY = "0x4AAAAAAEshBKfGRpZh1De-";

// Turnstile invokes this global once window.turnstile is populated. The
// script's own "load" event fires before that, so resolving on "load" races
// the API and can leave window.turnstile undefined.
const READY_CALLBACK = "__caaTurnstileReady";

const SCRIPT_SRC = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${READY_CALLBACK}`;

// Content blockers sometimes answer the request with an empty 200 rather than
// failing it, so no "error" event fires and the load would hang forever.
const LOAD_TIMEOUT_MS = 10_000;

type TurnstileRenderOptions = {
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
function loadTurnstileScript(): Promise<void> {
	if (typeof window === "undefined") return Promise.resolve();
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

export type TurnstileStatus = "loading" | "ready" | "unavailable";

export type TurnstileWidget = {
	/** Attach to the element that should host the widget. */
	containerRef: { current: HTMLDivElement | null };
	/** The current verification token, or null until the challenge is solved. */
	token: string | null;
	/**
	 * "unavailable" means the challenge could not be presented at all (script
	 * blocked, timed out, or the browser cannot run it). Submission is
	 * impossible in that state — there is no unverified fallback path.
	 */
	status: TurnstileStatus;
	/** Discard the current token and re-arm the widget (tokens are single-use). */
	reset: () => void;
	/** Start a fresh load attempt after a failure. */
	retry: () => void;
};

// Render an explicit Turnstile widget into a ref'd element and expose its token.
export function useTurnstile(action: string): TurnstileWidget {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetId = useRef<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [status, setStatus] = useState<TurnstileStatus>("loading");
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		let cancelled = false;
		setStatus("loading");
		setToken(null);

		loadTurnstileScript()
			.then(() => {
				if (cancelled) return;
				if (!containerRef.current || !window.turnstile) {
					setStatus("unavailable");
					return;
				}
				try {
					widgetId.current = window.turnstile.render(containerRef.current, {
						sitekey: TURNSTILE_SITE_KEY,
						action,
						callback: (value) => setToken(value),
						// Transient challenge errors are retried by Turnstile itself and
						// surfaced in its own widget UI; just drop the stale token.
						"error-callback": () => setToken(null),
						"expired-callback": () => setToken(null),
						"timeout-callback": () => setToken(null),
						"unsupported-callback": () => setStatus("unavailable"),
					});
					setStatus("ready");
				} catch {
					// Bad sitekey, or a domain the key is not configured for.
					setStatus("unavailable");
				}
			})
			.catch(() => {
				if (!cancelled) setStatus("unavailable");
			});

		return () => {
			cancelled = true;
			if (widgetId.current && window.turnstile) {
				window.turnstile.remove(widgetId.current);
			}
			widgetId.current = null;
			setToken(null);
		};
	}, [action, attempt]);

	const reset = useCallback(() => {
		setToken(null);
		if (widgetId.current && window.turnstile) {
			window.turnstile.reset(widgetId.current);
		}
	}, []);

	const retry = useCallback(() => setAttempt((n) => n + 1), []);

	return { containerRef, token, status, reset, retry };
}

type TurnstileFieldProps = {
	widget: TurnstileWidget;
	/** Address offered when the challenge cannot be presented. */
	fallbackEmail: string;
	className?: string;
};

// The widget host plus the explanation shown when it cannot be presented.
// There is no unverified submission path, so the visitor is given a way to
// reach us instead of a challenge they cannot complete.
export function TurnstileField({
	widget,
	fallbackEmail,
	className = "",
}: TurnstileFieldProps) {
	return (
		<>
			<div
				ref={widget.containerRef}
				className={`flex justify-center empty:hidden ${className}`}
			/>
			{widget.status === "unavailable" ? (
				<p
					role="alert"
					className="text-bsm text-orange text-center mt-2 leading-snug"
				>
					We couldn't load the spam check that protects this form — an ad
					blocker or privacy extension is the usual cause. Allow{" "}
					<span className="whitespace-nowrap">challenges.cloudflare.com</span>{" "}
					and{" "}
					<button
						type="button"
						onClick={widget.retry}
						className="underline font-semibold cursor-pointer"
					>
						try again
					</button>
					, or email{" "}
					<a
						className="underline font-semibold"
						href={`mailto:${fallbackEmail}`}
					>
						{fallbackEmail}
					</a>{" "}
					and we'll add you by hand.
				</p>
			) : null}
		</>
	);
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
