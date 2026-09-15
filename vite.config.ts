import fs from "node:fs";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import Handlebars from "handlebars";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const fromRoot = (file: string) =>
	fileURLToPath(new URL(file, import.meta.url));

// Every page of the site, served at its folder's URL (faq/index.html is
// /faq/). Add new pages here.
const pages = {
	home: "index.html",
	notFound: "404/index.html",
	about: "about/index.html",
	approval101: "approval-101/index.html",
	approvalPrimary: "our-reforms/approval-primary/index.html",
	contact: "contact/index.html",
	donate: "donate/index.html",
	faq: "faq/index.html",
	press: "press/index.html",
	pressApprovalPrimaryFiled:
		"press/2026-09-15-approval-primary-measure-filed/index.html",
};

/**
 * `{{svg "Arrow.svg" class="w-6 h-6"}}` inlines src/assets/icons/Arrow.svg and
 * adds the given attributes to its <svg> element (`class` is appended to any
 * the file already has). Inline SVGs can be coloured with Tailwind's `text-*`
 * and `fill-*` classes, which an <img> can't.
 */
function svg(file: string, options: Handlebars.HelperOptions) {
	const markup = fs
		.readFileSync(fromRoot(`src/assets/icons/${file}`), "utf8")
		.replace(/<\?xml[\s\S]*?\?>|<!DOCTYPE[^>]*>|<!--[\s\S]*?-->/gi, "")
		.trim()
		.replace(/<svg\b([^>]*)>/, (_, existing: string) => {
			let attributes = existing;
			for (const [name, raw] of Object.entries(options.hash)) {
				const value = Handlebars.escapeExpression(String(raw));
				const current = new RegExp(`\\s${name}="([^"]*)"`);
				const match = attributes.match(current);
				if (!match) attributes += ` ${name}="${value}"`;
				else {
					const merged = name === "class" ? `${match[1]} ${value}` : value;
					attributes = attributes.replace(current, ` ${name}="${merged}"`);
				}
			}
			return `<svg${attributes}>`;
		});
	return new Handlebars.SafeString(markup);
}

// https://vitejs.dev/config/
export default defineConfig({
	// Multi-page: an unknown URL is a 404, not the home page.
	appType: "mpa",
	plugins: [
		// Shared markup: {{> header}} includes src/partials/header.html.
		handlebars({
			partialDirectory: fromRoot("src/partials"),
			helpers: { svg },
		}),
		tailwindcss(),
	],
	build: {
		rollupOptions: {
			input: Object.fromEntries(
				Object.entries(pages).map(([name, page]) => [name, fromRoot(page)]),
			),
		},
	},
	server: {
		// https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
		host: "127.0.0.1",
	},
	preview: {
		// https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
		host: "127.0.0.1",
	},
});
