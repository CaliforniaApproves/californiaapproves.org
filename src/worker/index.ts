// Worker entry point for the static-assets deployment (see wrangler.jsonc).
//
// Cloudflare serves anything matching a file in ./dist directly, without
// invoking this Worker. Everything else lands here: the /api/subscribe
// endpoint is handled below, and the rest is handed back to the asset server
// so 404s and redirects keep their existing behaviour.

import { handleLeaderboard } from "./leaderboard";
import {
	handleSubscribe,
	REFERRAL_CODE_PATTERN,
	type Env as SubscribeEnv,
} from "./subscribe";

interface Env extends SubscribeEnv {
	/** Static assets binding, declared as `assets.binding` in wrangler.jsonc. */
	ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/subscribe") {
			if (request.method !== "POST") {
				return new Response("Method Not Allowed", {
					status: 405,
					headers: { allow: "POST" },
				});
			}
			return handleSubscribe(request, env);
		}

		if (url.pathname === "/api/leaderboard") {
			if (request.method !== "GET") {
				return new Response("Method Not Allowed", {
					status: 405,
					headers: { allow: "GET" },
				});
			}
			return handleLeaderboard(env);
		}

		// Short personal pledge links: /r/AB12CD sends the visitor to the pledge
		// form with the referral code attached (the page remembers it).
		const referral = url.pathname.match(/^\/r\/([^/]+)\/?$/);
		if (referral && REFERRAL_CODE_PATTERN.test(referral[1])) {
			const target = new URL("/our-reforms/approval-primary/", url);
			target.searchParams.set("ref", referral[1].toUpperCase());
			target.hash = "pledge";
			return Response.redirect(target.toString(), 302);
		}

		return env.ASSETS.fetch(request);
	},
};
