// Static multi-page site support for Vite.
//
// Every route is an HTML file under src/pages/ whose path mirrors the URL:
// src/pages/faq/index.html is served at /faq and built to dist/faq/index.html.
// This plugin:
//
//  - registers every page as a build entry,
//  - expands `<!--#include file="/src/..." -->` directives (see below),
//  - strips HTML comments, so notes in the sources don't ship,
//  - writes pages to dist/<route>/index.html rather than dist/src/pages/...,
//  - serves clean URLs (/faq) and the 404 page for unknown routes in both
//    `vite dev` and `vite preview`, like the production host does.
//
// Include directives
// ------------------
//   <!--#include file="/src/partials/header.html" -->
//   <!--#include file="/src/assets/icons/Arrow.svg" class="w-6 h-6" -->
//
// `file` is resolved from the project root and its contents replace the
// directive; includes may nest. Any other attributes are merged into the first
// element of the included file (`class` is appended to, the rest replace), which
// is how inline SVG icons get their Tailwind classes.

import fs from "node:fs";
import path from "node:path";
import type { Connect, Plugin } from "vite";

const PAGES_DIR = "src/pages";
const NOT_FOUND_ROUTE = "404";

const INCLUDE_RE = /<!--#include\s+([\s\S]*?)\s*-->/g;
const ATTRIBUTE_RE = /([\w:-]+)="([^"]*)"/g;
const COMMENT_RE = /<!--[\s\S]*?-->/g;
const FIRST_TAG_RE = /<([a-zA-Z][\w:-]*)((?:\s[^>]*?)?)(\s*\/?)>/;

/** Routes ("" for the home page, "faq", "our-reforms/approval-primary", …). */
function findRoutes(dir: string, prefix = ""): string[] {
	const routes: string[] = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			routes.push(
				...findRoutes(path.join(dir, entry.name), `${prefix}${entry.name}/`),
			);
		} else if (entry.name === "index.html") {
			routes.push(prefix.slice(0, -1));
		}
	}
	return routes;
}

function mergeAttributes(
	content: string,
	attributes: Record<string, string>,
): string {
	if (Object.keys(attributes).length === 0) return content;
	return content.replace(
		FIRST_TAG_RE,
		(_, tag: string, existing: string, end) => {
			let merged = existing;
			for (const [name, value] of Object.entries(attributes)) {
				const current = new RegExp(`(\\s${name}=")([^"]*)(")`);
				if (current.test(merged)) {
					merged = merged.replace(current, (_m, open, old, close) =>
						name === "class"
							? `${open}${old} ${value}${close}`
							: `${open}${value}${close}`,
					);
				} else {
					merged += ` ${name}="${value}"`;
				}
			}
			return `<${tag}${merged}${end}>`;
		},
	);
}

function expandIncludes(
	html: string,
	root: string,
	dependencies: Set<string>,
	stack: string[] = [],
): string {
	return html.replace(INCLUDE_RE, (directive, rawAttributes: string) => {
		const { file, ...attributes } = Object.fromEntries(
			[...rawAttributes.matchAll(ATTRIBUTE_RE)].map(([, name, value]) => [
				name,
				value,
			]),
		);
		if (!file?.startsWith("/")) {
			throw new Error(
				`${directive} needs a root-relative file="/src/..." attribute`,
			);
		}
		const absolute = path.join(root, decodeURI(file));
		if (stack.includes(absolute)) {
			throw new Error(`Circular #include of ${file}`);
		}
		dependencies.add(absolute);
		const content = fs
			.readFileSync(absolute, "utf8")
			.replace(/<\?xml[\s\S]*?\?>/, "")
			.replace(/<!DOCTYPE[^>]*>/i, "");
		return mergeAttributes(
			expandIncludes(content, root, dependencies, [...stack, absolute]).trim(),
			attributes,
		);
	});
}

/** The route a request is asking for, or undefined if it isn't a page load. */
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

export function pages(): Plugin[] {
	let root = process.cwd();
	const includedFiles = new Set<string>();
	const pagesDir = () => path.join(root, PAGES_DIR);

	return [
		{
			name: "caa-pages",

			config(config) {
				root = path.resolve(config.root ?? process.cwd());
				const input = Object.fromEntries(
					findRoutes(pagesDir()).map((route) => [
						route.replaceAll("/", "-") || "index",
						path.join(pagesDir(), route, "index.html"),
					]),
				);
				return { appType: "mpa", build: { rollupOptions: { input } } };
			},

			transformIndexHtml: {
				order: "pre",
				handler(html) {
					return expandIncludes(html, root, includedFiles).replace(
						COMMENT_RE,
						"",
					);
				},
			},

			configureServer(server) {
				// Partials and icons aren't modules, so Vite doesn't know that
				// pages depend on them.
				server.watcher.on("change", (file) => {
					if (includedFiles.has(path.resolve(file))) {
						server.ws.send({ type: "full-reload" });
					}
				});

				server.middlewares.use(async (req, res, next) => {
					const route = requestedRoute(req);
					if (route === undefined) return next();
					if (findRoutes(pagesDir()).includes(route)) {
						const page = path.posix.join("/", PAGES_DIR, route, "index.html");
						req.url = withQuery(page, req.url);
						return next();
					}
					try {
						const page = path.posix.join(
							"/",
							PAGES_DIR,
							NOT_FOUND_ROUTE,
							"index.html",
						);
						const html = await server.transformIndexHtml(
							page,
							fs.readFileSync(path.join(root, page), "utf8"),
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
					if (fs.existsSync(path.join(outDir, route, "index.html"))) {
						req.url = withQuery(
							path.posix.join("/", route, "index.html"),
							req.url,
						);
						return next();
					}
					const notFound = path.join(outDir, NOT_FOUND_ROUTE, "index.html");
					if (!fs.existsSync(notFound)) return next();
					res.statusCode = 404;
					res.setHeader("Content-Type", "text/html; charset=utf-8");
					res.end(fs.readFileSync(notFound));
				});
			},
		},
		{
			// Vite names built pages after their source path; publish them at
			// their route instead (src/pages/faq/index.html -> faq/index.html).
			name: "caa-pages:output",
			apply: "build",
			enforce: "post",
			generateBundle(_options, bundle) {
				for (const [fileName, output] of Object.entries(bundle)) {
					if (
						output.type !== "asset" ||
						!fileName.startsWith(`${PAGES_DIR}/`)
					) {
						continue;
					}
					delete bundle[fileName];
					this.emitFile({
						type: "asset",
						fileName: fileName.slice(PAGES_DIR.length + 1),
						source: output.source,
					});
				}
			},
		},
	];
}
