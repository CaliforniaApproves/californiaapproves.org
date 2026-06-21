import { defineConfig } from "@playwright/test";

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

// Visual regression config for the prerendered Preact site.
// Baselines are environment-sensitive (font rendering differs across OSes), so
// the authoritative snapshots are generated in CI inside the pinned Playwright
// container (see .github/workflows/visual.yml). Locally, use
// `npm run test:visual:update` to (re)generate snapshots for iteration.
export default defineConfig({
	testDir: "tests/visual",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
	expect: {
		toHaveScreenshot: {
			// Baselines and CI render in the same devcontainer, so rendering is
			// deterministic; a small cushion only absorbs rare sub-pixel noise
			// while still catching real visual changes (which differ by 1000s of px).
			maxDiffPixels: 100,
			animations: "disabled",
			caret: "hide",
		},
	},
	use: {
		baseURL: BASE_URL,
		viewport: { width: 1280, height: 800 },
		deviceScaleFactor: 1,
	},
	projects: [{ name: "chromium", use: { browserName: "chromium" } }],
	webServer: {
		// Build the static site and serve the prerendered output.
		command: "npm run build && npm run preview",
		url: BASE_URL,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
