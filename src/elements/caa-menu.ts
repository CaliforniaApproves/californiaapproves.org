// The site header's mobile navigation: a button that toggles a dropdown
// panel. It keeps the transitions and dismissal behaviour of the Headless UI
// Popover it replaced: the panel closes on Escape (returning focus to the
// button), on a click outside the menu, and when keyboard focus leaves it.
//
//   <caa-menu>
//     <button type="button" aria-expanded="false" aria-controls="menu">…</button>
//     <div id="menu" data-menu-panel hidden>…</div>
//   </caa-menu>

const ENTER = ["transition", "ease-out", "duration-200"];
const LEAVE = ["transition", "ease-in", "duration-150"];
const OPENED = ["opacity-100", "translate-y-0"];
const CLOSED = ["opacity-0", "translate-y-1"];

export class CaaMenu extends HTMLElement {
	#outsideClicks: AbortController | null = null;

	constructor() {
		super();
		this.addEventListener("click", (event) => {
			if (this.#button?.contains(event.target as Node)) this.toggle();
		});
		this.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && this.open) {
				this.close();
				this.#button?.focus();
			}
		});
		this.addEventListener("focusout", (event) => {
			const next = event.relatedTarget;
			if (this.open && next instanceof Node && !this.contains(next)) {
				this.close();
			}
		});
	}

	disconnectedCallback() {
		this.#outsideClicks?.abort();
	}

	get #button() {
		return this.querySelector<HTMLButtonElement>(":scope > button");
	}

	get #panel() {
		return this.querySelector<HTMLElement>("[data-menu-panel]");
	}

	get open(): boolean {
		return this.#button?.getAttribute("aria-expanded") === "true";
	}

	toggle() {
		if (this.open) this.close();
		else this.show();
	}

	show() {
		const button = this.#button;
		const panel = this.#panel;
		if (!button || !panel || this.open) return;

		button.setAttribute("aria-expanded", "true");
		button.classList.replace("text-gray-500", "text-gray-900");
		panel.hidden = false;
		void transition(panel, ENTER, CLOSED, OPENED);

		this.#outsideClicks = new AbortController();
		document.addEventListener(
			"pointerdown",
			(event) => {
				if (!this.contains(event.target as Node)) this.close();
			},
			{ signal: this.#outsideClicks.signal },
		);
	}

	async close() {
		const button = this.#button;
		const panel = this.#panel;
		if (!button || !panel || !this.open) return;

		this.#outsideClicks?.abort();
		this.#outsideClicks = null;
		button.setAttribute("aria-expanded", "false");
		button.classList.replace("text-gray-900", "text-gray-500");
		if (await transition(panel, LEAVE, OPENED, CLOSED)) panel.hidden = true;
	}
}

// Animates `el` between two sets of Tailwind classes: applies `active` and
// `from`, then swaps `from` for `to` so the browser transitions between them.
// Resolves false if a newer transition interrupted this one.
async function transition(
	el: HTMLElement,
	active: string[],
	from: string[],
	to: string[],
): Promise<boolean> {
	el.classList.remove(...ENTER, ...LEAVE, ...OPENED, ...CLOSED);
	el.classList.add(...active, ...from);
	el.getBoundingClientRect(); // Commit the `from` styles so the swap animates.
	el.classList.remove(...from);
	el.classList.add(...to);
	try {
		await Promise.all(el.getAnimations().map((a) => a.finished));
	} catch {
		return false;
	}
	el.classList.remove(...active);
	return true;
}

customElements.define("caa-menu", CaaMenu);

declare global {
	interface HTMLElementTagNameMap {
		"caa-menu": CaaMenu;
	}
}
