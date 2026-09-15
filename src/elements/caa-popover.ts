// A panel that its button toggles open and closed, positioned next to the
// button by Floating UI. It only responds to the button: clicking outside or
// pressing Escape does not close it.
//
//   <caa-popover>
//     <button type="button" aria-expanded="false" aria-controls="details">…</button>
//     <div id="details" data-popover-panel hidden>…</div>
//   </caa-popover>

import { autoPlacement, autoUpdate, computePosition } from "@floating-ui/dom";

export class CaaPopover extends HTMLElement {
	#stopUpdating: (() => void) | null = null;

	constructor() {
		super();
		this.addEventListener("click", (event) => {
			if (this.#button?.contains(event.target as Node)) this.toggle();
		});
	}

	disconnectedCallback() {
		this.hide();
	}

	get #button() {
		return this.querySelector<HTMLButtonElement>(":scope > button");
	}

	get #panel() {
		return this.querySelector<HTMLElement>("[data-popover-panel]");
	}

	toggle() {
		if (this.#panel?.hidden) this.show();
		else this.hide();
	}

	show() {
		const button = this.#button;
		const panel = this.#panel;
		if (!button || !panel) return;

		Object.assign(panel.style, { position: "absolute", left: "0", top: "0" });
		panel.hidden = false;
		button.setAttribute("aria-expanded", "true");
		this.#stopUpdating = autoUpdate(button, panel, async () => {
			const { x, y } = await computePosition(button, panel, {
				middleware: [autoPlacement({ alignment: "start" })],
			});
			Object.assign(panel.style, { left: `${x}px`, top: `${y}px` });
		});
	}

	hide() {
		this.#stopUpdating?.();
		this.#stopUpdating = null;
		const panel = this.#panel;
		if (panel) panel.hidden = true;
		this.#button?.setAttribute("aria-expanded", "false");
	}
}

customElements.define("caa-popover", CaaPopover);

declare global {
	interface HTMLElementTagNameMap {
		"caa-popover": CaaPopover;
	}
}
