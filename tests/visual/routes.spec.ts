import { expect, test } from "@playwright/test";

// One full-page screenshot per prerendered route.
const routes: { path: string; name: string }[] = [
	{ path: "/", name: "home" },
	{ path: "/approval-101", name: "approval-101" },
	{ path: "/faq", name: "faq" },
	{ path: "/about", name: "about" },
	{ path: "/contact", name: "contact" },
	{ path: "/donate", name: "donate" },
	{ path: "/404", name: "404" },
];

// Third-party embeds whose regions are dynamic and excluded from snapshots:
// the YouTube lite-embed (.yt-lite) and the Donorbox donation iframe.
const dynamicRegions = '.yt-lite, iframe[name="donorbox"]';

test.beforeEach(async ({ page }) => {
	// Keep snapshots hermetic and deterministic: serve only the site's own
	// origin and block all third-party requests (YouTube thumbnails, the
	// Donorbox payment widget, etc.). All site assets/fonts are bundled
	// same-origin, so nothing legitimate is blocked. This also prevents
	// third-party connections (e.g. Donorbox) from stalling page load.
	await page.route("**/*", (route) => {
		const host = new URL(route.request().url()).hostname;
		if (host === "127.0.0.1" || host === "localhost") return route.continue();
		return route.abort();
	});
});

for (const { path, name } of routes) {
	test(`visual: ${name} (${path})`, async ({ page }) => {
		await page.goto(path, { waitUntil: "load" });
		// Wait for icon/web fonts (e.g. FontAwesome) before snapshotting.
		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot(`${name}.png`, {
			fullPage: true,
			mask: [page.locator(dynamicRegions)],
		});
	});
}
