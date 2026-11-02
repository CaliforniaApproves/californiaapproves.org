// The pledge leaderboard: the people whose personal pledge links brought in the
// most pledges. It enhances static markup and fills itself in from
// /api/leaderboard (src/worker/leaderboard.ts), which only returns a rank, a
// display name and a count.
//
// Parts, found by data attribute:
//   [data-leaderboard-list]   <ol> that rows are added to
//   [data-leaderboard-empty]  hidden message shown when there are no referrals yet
//
// If the board can't be loaded, the enclosing [data-leaderboard-section] (the
// heading and intro too) is hidden rather than showing a broken or empty board.

interface Entry {
	rank: number;
	name: string;
	count: number;
}

export class CaaLeaderboard extends HTMLElement {
	connectedCallback() {
		void this.#load();
	}

	async #load() {
		let entries: Entry[];
		try {
			const response = await fetch("/api/leaderboard");
			const data = (await response.json()) as {
				ok?: boolean;
				entries?: Entry[];
			};
			if (!response.ok || !data.ok || !Array.isArray(data.entries)) {
				throw new Error(`unexpected response (${response.status})`);
			}
			entries = data.entries;
		} catch (error) {
			console.error("leaderboard: could not load", error);
			(this.closest("[data-leaderboard-section]") ?? this).setAttribute(
				"hidden",
				"",
			);
			return;
		}
		this.#render(entries);
	}

	#render(entries: Entry[]) {
		const list = this.querySelector<HTMLOListElement>(
			"[data-leaderboard-list]",
		);
		const empty = this.querySelector<HTMLElement>("[data-leaderboard-empty]");
		if (!list) return;

		list.replaceChildren();
		for (const entry of entries) {
			const row = document.createElement("li");
			row.className =
				"flex items-center gap-4 rounded-2xl bg-white px-5 py-3 text-left";

			const rank = document.createElement("span");
			rank.className = "w-8 shrink-0 text-center font-extrabold text-purple";
			rank.textContent = String(entry.rank);

			const name = document.createElement("span");
			name.className = "grow font-semibold text-black";
			name.textContent = entry.name;

			const count = document.createElement("span");
			count.className = "shrink-0 text-bsm text-schist-higher";
			count.textContent = `${entry.count} ${entry.count === 1 ? "referral" : "referrals"}`;

			row.append(rank, name, count);
			list.append(row);
		}

		list.hidden = entries.length === 0;
		if (empty) empty.hidden = entries.length > 0;
	}
}

customElements.define("caa-leaderboard", CaaLeaderboard);

declare global {
	interface HTMLElementTagNameMap {
		"caa-leaderboard": CaaLeaderboard;
	}
}
