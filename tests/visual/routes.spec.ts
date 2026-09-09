import { expect, type Page, test } from "@playwright/test";

// One full-page screenshot per prerendered route.
const routes: { path: string; name: string }[] = [
	{ path: "/", name: "home" },
	{ path: "/approval-101", name: "approval-101" },
	{ path: "/our-reforms/approval-primary", name: "approval-primary" },
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

async function snapshotRoute(page: Page, path: string, name: string) {
	await page.goto(path, { waitUntil: "load" });
	// Wait for icon/web fonts (e.g. FontAwesome) before snapshotting.
	await page.evaluate(() => document.fonts.ready);
	await expect(page).toHaveScreenshot(`${name}.png`, {
		fullPage: true,
		mask: [page.locator(dynamicRegions)],
	});
}

for (const { path, name } of routes) {
	test(`visual: ${name} (${path})`, async ({ page }) => {
		await snapshotRoute(page, path, name);
	});
}

// Narrow-viewport baselines. Layouts that reorder across the `lg` breakpoint
// (the approval-primary hero stacks its heading, CTA and paragraphs in a
// different order than the desktop two-column arrangement) are invisible to
// the 1280px snapshots above, so they get their own baseline.
test.describe("mobile", () => {
	// iPhone 12/13/14 logical viewport; below Tailwind's `lg` (1024px) and
	// `md` (768px), so mobile-only branches of the layout are exercised.
	test.use({ viewport: { width: 390, height: 844 } });

	test("visual: approval-primary mobile (/our-reforms/approval-primary)", async ({
		page,
	}) => {
		await snapshotRoute(
			page,
			"/our-reforms/approval-primary",
			"approval-primary-mobile",
		);
	});
});
