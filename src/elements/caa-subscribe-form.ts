// A mailing-list signup form protected by Cloudflare Turnstile. It wraps a
// static <form> with no action and submits it to /api/subscribe, which checks
// the Turnstile token server-side before forwarding to Mailchimp (see
// src/worker/subscribe.ts). There is deliberately no unverified fallback: if
// the challenge can't be shown, visitors are offered an email address instead.
//
// Attributes:
//   form-key             the server-side form config ("pledge" | "contact")
//   busy-label           submit button text while a submission is in flight
//   unavailable-message  shown if a submission is attempted without Turnstile
//
// Parts, found by data attribute:
//   [data-turnstile]              an empty element the widget renders into
//   [data-turnstile-unavailable]  hidden notice, shown when the widget can't
//                                 load; a [data-turnstile-retry] button in it
//                                 starts another attempt
//   [data-message]                hidden status line for results and errors
//   [data-success]                optional hidden panel that replaces the form
//                                 after a successful submission; its
//                                 [data-success-message] gets the server's reply

import {
	loadTurnstileScript,
	type SubscribeForm,
	submitSubscription,
	TURNSTILE_SITE_KEY,
} from "../lib/turnstile";

/**
 * "unavailable" means the challenge could not be presented at all (script
 * blocked, timed out, or the browser cannot run it), so the form can't be sent.
 */
type TurnstileStatus = "loading" | "ready" | "unavailable";

export class CaaSubscribeForm extends HTMLElement {
	#status: TurnstileStatus = "loading";
	#token: string | null = null;
	#widgetId: string | null = null;
	#submitting = false;
	#submitLabel = "";
	/** Incremented to abandon an in-flight load. */
	#attempt = 0;

	constructor() {
		super();
		this.addEventListener("submit", (event) => {
			event.preventDefault();
			void this.#submit(event.target as HTMLFormElement);
		});
		this.addEventListener("click", (event) => {
			if (
				event.target instanceof Element &&
				event.target.closest("[data-turnstile-retry]")
			) {
				void this.#load();
			}
		});
	}

	connectedCallback() {
		this.#submitLabel = this.#submitButton?.textContent ?? "";
		void this.#load();
	}

	disconnectedCallback() {
		this.#attempt++;
		this.#removeWidget();
	}

	get #formKey() {
		return this.getAttribute("form-key") as SubscribeForm;
	}

	get #submitButton() {
		return this.querySelector<HTMLButtonElement>('button[type="submit"]');
	}

	async #load() {
		const attempt = ++this.#attempt;
		this.#removeWidget();
		this.#setStatus("loading");

		try {
			await loadTurnstileScript();
		} catch {
			if (attempt === this.#attempt) this.#setStatus("unavailable");
			return;
		}
		if (attempt !== this.#attempt) return;

		const container = this.querySelector<HTMLElement>("[data-turnstile]");
		if (!container || !window.turnstile) {
			this.#setStatus("unavailable");
			return;
		}
		try {
			this.#widgetId = window.turnstile.render(container, {
				sitekey: TURNSTILE_SITE_KEY,
				action: this.#formKey,
				callback: (token) => {
					this.#token = token;
				},
				"error-callback": (code) => {
					this.#token = null;
					// 110* is the sitekey/domain family (110200 = domain not
					// allowed, 110100 = bad sitekey, 110500 = unsupported
					// browser). Retrying cannot fix any of them and no widget
					// renders, so the form must not sit there looking submittable.
					// Everything else is transient — Turnstile retries those
					// itself and shows its own error UI.
					if (code?.startsWith("110")) this.#setStatus("unavailable");
				},
				"expired-callback": () => {
					this.#token = null;
				},
				"timeout-callback": () => {
					this.#token = null;
				},
				"unsupported-callback": () => this.#setStatus("unavailable"),
			});
			if (this.#status === "loading") this.#setStatus("ready");
		} catch {
			// Bad sitekey, or a domain the key is not configured for.
			this.#setStatus("unavailable");
		}
	}

	async #submit(form: HTMLFormElement) {
		if (this.#submitting) return;
		if (this.#status === "unavailable") {
			this.#showMessage(this.getAttribute("unavailable-message") ?? "", true);
			return;
		}
		const token = this.#token;
		if (!token) {
			this.#showMessage(
				"Please complete the verification challenge and try again.",
				true,
			);
			return;
		}

		this.#setSubmitting(true);
		this.#showMessage("", false);
		const result = await submitSubscription(this.#formKey, form, token);
		this.#setSubmitting(false);
		this.#showMessage(result.message, !result.ok);
		if (result.ok) {
			form.reset();
			this.#showSuccess(form, result.message);
		}
		// Tokens are single-use.
		this.#token = null;
		if (this.#widgetId) window.turnstile?.reset(this.#widgetId);
	}

	#removeWidget() {
		if (this.#widgetId) window.turnstile?.remove(this.#widgetId);
		this.#widgetId = null;
		this.#token = null;
	}

	#setStatus(status: TurnstileStatus) {
		this.#status = status;
		const notice = this.querySelector<HTMLElement>(
			"[data-turnstile-unavailable]",
		);
		if (notice) notice.hidden = status !== "unavailable";
		this.#syncSubmitButton();
	}

	#setSubmitting(submitting: boolean) {
		this.#submitting = submitting;
		this.#syncSubmitButton();
	}

	#syncSubmitButton() {
		const button = this.#submitButton;
		if (!button) return;
		button.disabled = this.#status !== "ready" || this.#submitting;
		button.textContent = this.#submitting
			? (this.getAttribute("busy-label") ?? this.#submitLabel)
			: this.#submitLabel;
	}

	#showMessage(text: string, isError: boolean) {
		const message = this.querySelector<HTMLElement>("[data-message]");
		if (!message) return;
		message.hidden = !text;
		message.textContent = text;
		message.classList.toggle("text-orange", isError);
		message.classList.toggle("text-green", !isError);
	}

	#showSuccess(form: HTMLFormElement, text: string) {
		const panel = this.querySelector<HTMLElement>("[data-success]");
		if (!panel) return;
		const message = panel.querySelector("[data-success-message]");
		if (message && text) message.textContent = text;
		form.hidden = true;
		panel.hidden = false;
	}
}

customElements.define("caa-subscribe-form", CaaSubscribeForm);

declare global {
	interface HTMLElementTagNameMap {
		"caa-subscribe-form": CaaSubscribeForm;
	}
}
