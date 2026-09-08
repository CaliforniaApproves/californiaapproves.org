// Worker entry point for the static-assets deployment (see wrangler.jsonc).
//
// Cloudflare serves anything matching a file in ./dist directly, without
// invoking this Worker. Everything else lands here: the /api/subscribe
// endpoint is handled below, and the rest is handed back to the asset server
// so 404s and redirects keep their existing behaviour.

import { handleSubscribe, type Env as SubscribeEnv } from "./subscribe";

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

		return env.ASSETS.fetch(request);
	},
};
