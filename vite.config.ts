import reactRefresh from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh(), svgr()]
    , server: {
        fs: {
            allow: [searchForWorkspaceRoot(process.cwd()), '/node_modules/']
        },
        // https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
        host: '127.0.0.1',
    }
    , preview: {
        // https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
        host: '127.0.0.1',
    }
    , build: {
        commonjsOptions: { include: ['node_modules/**'] }
    }
    , resolve: {
        dedupe: ["react", "react-dom", "react-router"]
    }
})
