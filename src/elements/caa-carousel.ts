// Shows one [data-slide] child at a time. Clicking a [data-prev] or [data-next]
// control steps through the slides, wrapping around at either end. Every slide
// is in the page's HTML (inactive ones are `hidden`), so all of them are
// indexable and readable without JavaScript.
//
//   <caa-carousel>
//     <svg data-prev>…</svg>
//     <div data-slide>…</div>
//     <div data-slide hidden>…</div>
//     <svg data-next>…</svg>
//   </caa-carousel>

export class CaaCarousel extends HTMLElement {
	constructor() {
		super();
		this.addEventListener("click", (event) => {
			const control =
				event.target instanceof Element
					? event.target.closest("[data-prev], [data-next]")
					: null;
			if (!control) return;
			const step = control.hasAttribute("data-next") ? 1 : -1;
			this.show(this.#index + step);
		});
	}

	get #slides() {
		return [...this.querySelectorAll<HTMLElement>("[data-slide]")];
	}

	get #index() {
		return Math.max(
			0,
			this.#slides.findIndex((slide) => !slide.hidden),
		);
	}

	show(index: number) {
		const slides = this.#slides;
		const active = (index + slides.length) % slides.length;
		slides.forEach((slide, i) => {
			slide.hidden = i !== active;
		});
	}
}

customElements.define("caa-carousel", CaaCarousel);

declare global {
	interface HTMLElementTagNameMap {
		"caa-carousel": CaaCarousel;
	}
}
