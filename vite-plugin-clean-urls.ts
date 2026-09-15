// Serves the site's pages at clean URLs in `vite dev` and `vite preview`, the
// way the production host does: /faq serves faq/index.html (on its own, Vite
// only tries /faq.html), and a URL with no page gets the 404 page and status.

import fs from "node:fs";
import path from "node:path";
import type { Connect, Plugin } from "vite";

type Options = {
	/** Every page, relative to the project root: "index.html", "faq/index.html", … */
	pages: string[];
	/** The page served for unknown URLs, e.g. "404/index.html". */
	notFound: string;
};

/** The route a request asks for ("faq", "" for home), or undefined if it isn't a page load. */
function requestedRoute(req: Connect.IncomingMessage): string | undefined {
	if (req.method !== "GET" && req.method !== "HEAD") return;
	const { pathname } = new URL(req.url ?? "/", "http://localhost");
	// Files (/src/main.ts, /favicon.svg) and Vite internals (/@vite/client).
	if (pathname.startsWith("/@") || path.posix.extname(pathname)) return;
	return decodeURIComponent(pathname).replace(/^\/+|\/+$/g, "");
}

function withQuery(url: string, original = ""): string {
	const query = original.indexOf("?");
	return query === -1 ? url : url + original.slice(query);
}

export function cleanUrls({ pages, notFound }: Options): Plugin {
	const routes = new Map(
		pages.map((page) => [path.posix.dirname(page).replace(/^\.$/, ""), page]),
	);
	let root = process.cwd();

	return {
		name: "clean-urls",

		configResolved(config) {
			root = config.root;
		},

		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				const route = requestedRoute(req);
				if (route === undefined) return next();
				const page = routes.get(route);
				if (page) {
					req.url = withQuery(`/${page}`, req.url);
					return next();
				}
				try {
					const html = await server.transformIndexHtml(
						`/${notFound}`,
						fs.readFileSync(path.join(root, notFound), "utf8"),
						req.originalUrl,
					);
					res.statusCode = 404;
					res.setHeader("Content-Type", "text/html; charset=utf-8");
					res.end(html);
				} catch (error) {
					next(error);
				}
			});
		},

		configurePreviewServer(server) {
			const outDir = path.resolve(root, server.config.build.outDir);
			server.middlewares.use((req, res, next) => {
				const route = requestedRoute(req);
				if (route === undefined) return next();
				const page = routes.get(route);
				if (page) {
					req.url = withQuery(`/${page}`, req.url);
					return next();
				}
				res.statusCode = 404;
				res.setHeader("Content-Type", "text/html; charset=utf-8");
				res.end(fs.readFileSync(path.join(outDir, notFound)));
			});
		},
	};
}
