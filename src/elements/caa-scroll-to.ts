// Smoothly scrolls to the element whose id is `target` when anything inside
// is clicked. Takes up no box of its own (display: contents in style.css).
//
//   <caa-scroll-to target="pledge"><button type="button">…</button></caa-scroll-to>

export class CaaScrollTo extends HTMLElement {
	constructor() {
		super();
		this.addEventListener("click", () => {
			const id = this.getAttribute("target");
			if (id) {
				document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
			}
		});
	}
}

customElements.define("caa-scroll-to", CaaScrollTo);

declare global {
	interface HTMLElementTagNameMap {
		"caa-scroll-to": CaaScrollTo;
	}
}
