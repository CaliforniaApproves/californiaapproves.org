import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { pages } from "./vite-plugin-pages.ts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [pages(), tailwindcss()],
	server: {
		// https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
		host: "127.0.0.1",
	},
	preview: {
		// https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
		host: "127.0.0.1",
	},
});
