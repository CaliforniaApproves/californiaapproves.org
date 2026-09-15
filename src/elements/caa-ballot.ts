// A sample ballot visitors can mark. Each [data-candidate] button toggles a
// mark on its candidate. With mode="single" at most one candidate can be marked
// (like today's choose-one ballots); otherwise any number can be approved.
//
// The [data-summary] line shows its original content while nothing is marked,
// and otherwise the <template data-summary-marked>, with its
// [data-summary-value] filled in: the marked candidate's name in single mode,
// or "N candidate(s)".
//
//   <caa-ballot mode="single" unit="vote">
//     <button type="button" data-candidate="Candidate A" aria-pressed="false">
//       <div data-mark class="bg-white border-schist-medium text-transparent">✕</div>
//       … <div data-count>0</div>
//     </button>
//     …
//     <div data-summary>Nothing marked yet.</div>
//     <template data-summary-marked>You marked <b data-summary-value></b>.</template>
//   </caa-ballot>

const MARKED = ["bg-orange", "border-orange", "text-white"];
const UNMARKED = ["bg-white", "border-schist-medium", "text-transparent"];

export class CaaBallot extends HTMLElement {
	#unmarkedSummary: Node[] | null = null;

	constructor() {
		super();
		this.addEventListener("click", (event) => {
			const button =
				event.target instanceof Element
					? event.target.closest<HTMLElement>("[data-candidate]")
					: null;
			if (button) this.toggle(button);
		});
	}

	get #candidates() {
		return [...this.querySelectorAll<HTMLElement>("[data-candidate]")];
	}

	toggle(candidate: HTMLElement) {
		const marking = candidate.getAttribute("aria-pressed") !== "true";
		if (marking && this.getAttribute("mode") === "single") {
			for (const other of this.#candidates) this.#setMarked(other, false);
		}
		this.#setMarked(candidate, marking);
		this.#renderSummary();
	}

	#setMarked(candidate: HTMLElement, marked: boolean) {
		candidate.setAttribute("aria-pressed", String(marked));
		const mark = candidate.querySelector("[data-mark]");
		mark?.classList.remove(...(marked ? UNMARKED : MARKED));
		mark?.classList.add(...(marked ? MARKED : UNMARKED));
		const count = candidate.querySelector("[data-count]");
		if (count) {
			count.textContent = marked ? `1 ${this.getAttribute("unit")}` : "0";
		}
	}

	#renderSummary() {
		const summary = this.querySelector("[data-summary]");
		const template = this.querySelector<HTMLTemplateElement>(
			"template[data-summary-marked]",
		);
		if (!summary || !template) return;
		this.#unmarkedSummary ??= [...summary.childNodes];

		const marked = this.#candidates.filter(
			(candidate) => candidate.getAttribute("aria-pressed") === "true",
		);
		if (marked.length === 0) {
			summary.replaceChildren(...this.#unmarkedSummary);
			return;
		}

		const content = template.content.cloneNode(true) as DocumentFragment;
		const value = content.querySelector("[data-summary-value]");
		if (value) {
			value.textContent =
				this.getAttribute("mode") === "single"
					? (marked[0].dataset.candidate ?? "")
					: `${marked.length} candidate${marked.length > 1 ? "s" : ""}`;
		}
		summary.replaceChildren(content);
	}
}

customElements.define("caa-ballot", CaaBallot);

declare global {
	interface HTMLElementTagNameMap {
		"caa-ballot": CaaBallot;
	}
}
