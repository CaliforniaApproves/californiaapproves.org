import { expect, test } from "@playwright/test";

// The press list and the releases it links to. These pages are checked by
// content rather than by screenshot so minor edits don't require updating
// screenshots.

// The list is newest first, so its last entry is the oldest release and stays
// put as new ones are added above it. That makes it the one entry whose URL
// can be named here.
const OLDEST_RELEASE = "/press/2026-09-15-approval-primary-measure-filed/";
const OLDEST_RELEASE_TITLE =
	"Approval Voting Primary Measure Filed with California Attorney General; Public Comment Open Through October 12";

test.beforeEach(async ({ page }) => {
	// Same hermetic setup as the visual tests: only the site's own origin loads,
	// so no third-party request can stall the page.
	await page.route("**/*", (route) => {
		const host = new URL(route.request().url()).hostname;
		if (host === "127.0.0.1" || host === "localhost") return route.continue();
		return route.abort();
	});
});

test("the press list links to a release, titled the same on both pages", async ({
	page,
}) => {
	await page.goto("/press/", { waitUntil: "load" });

	const link = page.locator("main li a").last();
	const title = (await link.innerText()).replace(/\s+/g, " ").trim();
	expect(title).toEqual(OLDEST_RELEASE_TITLE);

	await link.click();

	await expect(page).toHaveURL(OLDEST_RELEASE);
	await expect(page.locator("main h1")).toHaveText(OLDEST_RELEASE_TITLE);
});
