// A lightweight YouTube embed. Until clicked it is only the video's poster
// image and a play button; YouTube's (heavy) player iframe loads on demand.
// Ported from react-lite-youtube-embed's defaults. Styles: caa-youtube.css.
//
//   <caa-youtube video-id="m8VXIIaC9Zw" video-title="…"></caa-youtube>

const EMBED_ORIGIN = "https://www.youtube-nocookie.com";

export class CaaYoutube extends HTMLElement {
	constructor() {
		super();
		// Warm up the connections the player needs as soon as it looks likely
		// to be played.
		this.addEventListener("pointerover", () => this.#preconnect(), {
			once: true,
		});
		this.addEventListener("click", () => this.play());
	}

	get #videoId() {
		return encodeURIComponent(this.getAttribute("video-id") ?? "");
	}

	get #title() {
		return this.getAttribute("video-title") ?? "";
	}

	connectedCallback() {
		if (this.querySelector(":scope > button, :scope > iframe")) return;

		this.setAttribute("role", "img");
		this.setAttribute("aria-label", `${this.#title} - YouTube video preview`);
		this.style.backgroundImage = `url(https://i.ytimg.com/vi/${this.#videoId}/hqdefault.jpg)`;

		const button = document.createElement("button");
		button.type = "button";
		button.setAttribute("aria-label", `Watch ${this.#title}`);
		const label = document.createElement("span");
		label.className = "sr-only";
		label.textContent = "Watch";
		button.append(label);
		this.append(button);
	}

	play() {
		if (this.hasAttribute("playing")) return;
		this.setAttribute("playing", "");
		this.removeAttribute("role");
		this.removeAttribute("aria-label");

		const iframe = document.createElement("iframe");
		iframe.title = this.#title;
		iframe.width = "560";
		iframe.height = "315";
		iframe.allow =
			"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
		iframe.allowFullscreen = true;
		iframe.referrerPolicy = "strict-origin-when-cross-origin";
		iframe.src = `${EMBED_ORIGIN}/embed/${this.#videoId}?autoplay=1`;
		this.append(iframe);
	}

	#preconnect() {
		for (const href of [EMBED_ORIGIN, "https://www.google.com"]) {
			const link = document.createElement("link");
			link.rel = "preconnect";
			link.href = href;
			document.head.append(link);
		}
	}
}

customElements.define("caa-youtube", CaaYoutube);

declare global {
	interface HTMLElementTagNameMap {
		"caa-youtube": CaaYoutube;
	}
}
