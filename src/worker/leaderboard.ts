// Handler for GET /api/leaderboard, routed from src/worker/index.ts.
//
// Relays the Pledge list's referral leaderboard from listmonk for the public
// pledge page. listmonk does the sanitising: each entry is a rank, a display
// name ("First L.", or "Anonymous" for people who opted out) and a count; no
// e-mail addresses or IDs ever reach this Worker or the browser.
//
// Not cached for now: every request reads the top 10 from listmonk, which is a
// single index-only query there.

import { type Env, listmonk } from "./subscribe";

const LIST_NAME = "Pledge";
const ENTRIES = 10;

interface Entry {
	rank: number;
	name: string;
	count: number;
}

// The list's ID never changes, so look it up once per Worker instance.
let pledgeListId: number | null = null;

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store",
		},
	});
}

async function findPledgeListId(env: Env): Promise<number | null> {
	if (pledgeListId !== null) return pledgeListId;
	const lists = await listmonk(env, "/api/lists?per_page=all&minimal=true");
	if (lists.status !== 200) return null;
	const found = lists.body?.data?.results?.find((l) => l.name === LIST_NAME);
	pledgeListId = found?.id ?? null;
	return pledgeListId;
}

export async function handleLeaderboard(env: Env): Promise<Response> {
	if (!env.LISTMONK_URL || !env.LISTMONK_API_USER || !env.LISTMONK_API_TOKEN) {
		console.error("leaderboard: listmonk is not configured");
		return json({ ok: false }, 500);
	}

	try {
		const id = await findPledgeListId(env);
		if (id === null) {
			console.error(`leaderboard: no list named ${LIST_NAME}`);
			return json({ ok: false }, 502);
		}

		const res = await listmonk<Entry[]>(
			env,
			`/api/lists/${id}/leaderboard/public?per_page=${ENTRIES}`,
		);
		if (res.status !== 200 || !Array.isArray(res.body?.data)) {
			console.error(`leaderboard: listmonk returned ${res.status}`);
			return json({ ok: false }, 502);
		}

		// Pass on only the three public fields, whatever listmonk sent.
		const entries = res.body.data.map(({ rank, name, count }) => ({
			rank,
			name,
			count,
		}));
		return json({ ok: true, entries });
	} catch (error) {
		console.error("leaderboard: request failed", error);
		return json({ ok: false }, 502);
	}
}
