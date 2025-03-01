import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
		svgr(),
		tailwindcss(),
	],
	server: {
		// https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
		host: '127.0.0.1',
	}
	, preview: {
		// https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
		host: '127.0.0.1',
	}
});
