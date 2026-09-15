import { expect, type Page, test } from "@playwright/test";

// Interaction states of the custom elements in src/elements/: routes.spec.ts
// only covers each page as it first loads. Each test drives an element through
// its states and snapshots the affected region, checking behaviour (focus,
// ARIA state, what a form posts) along the way.

// A stand-in for Cloudflare's Turnstile API: renders a grey box, hands out a
// token straight away, then calls the page's onload callback like the real one.
const FAKE_TURNSTILE = `
window.turnstile = {
	render(el, opts) {
		const box = document.createElement("div");
		box.style.cssText = "width:300px;height:65px;background:#ccc";
		el.appendChild(box);
		setTimeout(() => opts.callback("fake-token"), 0);
		return "w1";
	},
	reset() {},
	remove() {},
};
const onload = document.currentScript.src.match(/onload=([^&]+)/);
if (onload) window[onload[1]]();
`;

test.beforeEach(async ({ page }) => {
	// Same hermetic setup as routes.spec.ts: only the site's own origin loads.
	// Tests that need Turnstile route it to FAKE_TURNSTILE afterwards (later
	// routes take precedence).
	await page.route("**/*", (route) => {
		const host = new URL(route.request().url()).hostname;
		if (host === "127.0.0.1" || host === "localhost") return route.continue();
		return route.abort();
	});
});

async function open(page: Page, path: string) {
	await page.goto(path, { waitUntil: "load" });
	await page.evaluate(() => document.fonts.ready);
}

/** Serves FAKE_TURNSTILE and answers /api/subscribe; returns what was posted. */
async function withTurnstile(
	page: Page,
	reply: { ok: boolean; message: string },
): Promise<URLSearchParams[]> {
	await page.route("https://challenges.cloudflare.com/**", (route) =>
		route.fulfill({ contentType: "text/javascript", body: FAKE_TURNSTILE }),
	);
	const posted: URLSearchParams[] = [];
	await page.route("**/api/subscribe", (route) => {
		posted.push(new URLSearchParams(route.request().postData() ?? ""));
		return route.fulfill({ json: reply });
	});
	return posted;
}

test.describe("mobile menu", () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test("opens, and closes on Escape or an outside click", async ({ page }) => {
		await open(page, "/404/");
		const button = page.locator("caa-menu > button");
		const panel = page.locator("[data-menu-panel]");

		await button.click();
		await expect(button).toHaveAttribute("aria-expanded", "true");
		await expect(page).toHaveScreenshot("menu-open.png");

		await page.keyboard.press("Escape");
		await expect(panel).toBeHidden();
		await expect(button).toBeFocused();
		await expect(button).toHaveAttribute("aria-expanded", "false");
		await expect(page).toHaveScreenshot("menu-closed-after-escape.png");

		// The open panel covers most of this short page, so click the header's
		// top-left padding: above the panel and clear of the logo link.
		await button.click();
		await expect(panel).toBeVisible();
		await page.mouse.click(1, 1);
		await expect(panel).toBeHidden();
	});
});

test("quote carousel steps through quotes and wraps around", async ({
	page,
}) => {
	await open(page, "/");
	const carousel = page.locator("caa-carousel");
	const next = carousel.locator("[data-next]");
	// The first [data-prev] is the desktop arrow; the other is for mobile.
	const previous = carousel.locator("[data-prev]").first();

	await next.click();
	await next.click();
	await expect(carousel).toHaveScreenshot("carousel-third.png");

	await previous.click();
	await previous.click();
	await previous.click();
	await expect(carousel).toHaveScreenshot("carousel-wrapped-to-last.png");
});

test("campaigning popover toggles from its button", async ({ page }) => {
	await open(page, "/");
	const section = page
		.locator("h1", { hasText: "How We Are Making Waves" })
		.locator("xpath=..");
	const button = page.getByRole("button", { name: "LEARN MORE" });

	await button.click();
	await expect(button).toHaveAttribute("aria-expanded", "true");
	await expect(section).toHaveScreenshot("popover-open.png");

	await button.click();
	await expect(page.locator("[data-popover-panel]")).toBeHidden();
	await expect(section).toHaveScreenshot("popover-closed.png");
});

test("approval-101 ballot approves any number of candidates", async ({
	page,
}) => {
	await open(page, "/approval-101/");
	const section = page.locator('section[aria-label="What is Approval Voting"]');

	await page.getByRole("button", { name: /Hero 1/ }).click();
	await expect(page.getByRole("button", { name: /Hero 1/ })).toHaveAttribute(
		"aria-pressed",
		"true",
	);
	await expect(section).toHaveScreenshot("a101-one.png");

	await page.getByRole("button", { name: /Acceptable/ }).click();
	await page.getByRole("button", { name: /Villain 2/ }).click();
	await expect(section).toHaveScreenshot("a101-three.png");

	for (const name of [/Hero 1/, /Acceptable/, /Villain 2/]) {
		await page.getByRole("button", { name }).click();
	}
	await expect(section).toHaveScreenshot("a101-cleared.png");
});

test("approval-primary ballots: choose one vs. approve several", async ({
	page,
}) => {
	await open(page, "/our-reforms/approval-primary/");
	const section = page.locator('section[aria-label="See it in action"]');
	const chooseOne = page.locator("caa-ballot").nth(0);
	const approveAll = page.locator("caa-ballot").nth(1);

	// Marking C on the choose-one ballot moves the mark off A.
	await chooseOne.getByRole("button", { name: /Candidate A/ }).click();
	await chooseOne.getByRole("button", { name: /Candidate C/ }).click();
	await approveAll.getByRole("button", { name: /Candidate A/ }).click();
	await approveAll.getByRole("button", { name: /Candidate B/ }).click();
	await expect(section).toHaveScreenshot("ap-ballots-marked.png");

	await chooseOne.getByRole("button", { name: /Candidate C/ }).click();
	await approveAll.getByRole("button", { name: /Candidate B/ }).click();
	await expect(section).toHaveScreenshot("ap-ballots-partly-cleared.png");
});

test("faq accordion keeps one answer open at a time", async ({ page }) => {
	await open(page, "/faq/");
	const section = page.locator(
		'section[aria-label="Common questions about our reform"]',
	);
	const question = page.getByText(
		"Won't this create more single-party generals?",
	);

	await question.click();
	await expect(section).toHaveScreenshot("faq-q3.png");

	await page.getByText("Go deeper").filter({ visible: true }).click();
	await expect(section).toHaveScreenshot("faq-q3-deeper.png");

	await question.click();
	await expect(section).toHaveScreenshot("faq-all-closed.png");
});

test("pledge form submits and shows the success panel", async ({ page }) => {
	const posted = await withTurnstile(page, {
		ok: true,
		message: "You're signed up — check your inbox to confirm.",
	});
	await open(page, "/our-reforms/approval-primary/");
	const section = page.locator("section#pledge");
	await expect(section.locator('button[type="submit"]')).toBeEnabled();
	await expect(section).toHaveScreenshot("pledge-ready.png");

	await section.locator('input[name="EMAIL"]').fill("voter@example.com");
	await section.locator('input[name="FNAME"]').fill("Ada");
	await section.locator('input[type="checkbox"]').check();
	await section.locator('button[type="submit"]').click();
	await expect(section.getByText("You're on the list.")).toBeVisible();
	await expect(section).toHaveScreenshot("pledge-success.png");

	expect(Object.fromEntries(posted[0])).toMatchObject({
		EMAIL: "voter@example.com",
		FNAME: "Ada",
		form: "pledge",
		"cf-turnstile-response": "fake-token",
		tags: "4527864",
		"group[384917][16]": "16",
	});
});

test("pledge form shows server errors", async ({ page }) => {
	await withTurnstile(page, { ok: false, message: "That email looks wrong." });
	await open(page, "/our-reforms/approval-primary/");
	const section = page.locator("section#pledge");

	await section.locator('input[name="EMAIL"]').fill("voter@example.com");
	await section.locator('button[type="submit"]').click();
	await expect(section.getByText("That email looks wrong.")).toBeVisible();
	await expect(section).toHaveScreenshot("pledge-error.png");
});

test("contact form submits and clears", async ({ page }) => {
	const posted = await withTurnstile(page, {
		ok: true,
		message: "You're signed up — check your inbox to confirm.",
	});
	await open(page, "/contact/");
	const area = page.locator("div.max-w-2xl");

	await area.locator('input[name="EMAIL"]').fill("voter@example.com");
	await area.locator('button[type="submit"]').click();
	await expect(area.getByText("check your inbox")).toBeVisible();
	await expect(area.locator('input[name="EMAIL"]')).toHaveValue("");
	await expect(area).toHaveScreenshot("contact-success.png");

	expect(Object.fromEntries(posted[0])).toMatchObject({
		EMAIL: "voter@example.com",
		form: "contact",
		"cf-turnstile-response": "fake-token",
	});
});

test("turnstile can be retried after a blocked load", async ({ page }) => {
	let attempts = 0;
	await page.route("https://challenges.cloudflare.com/**", (route) => {
		attempts++;
		return attempts === 1
			? route.abort()
			: route.fulfill({ contentType: "text/javascript", body: FAKE_TURNSTILE });
	});
	await open(page, "/contact/");
	const area = page.locator("div.max-w-2xl");

	await expect(area.getByRole("alert")).toBeVisible();
	await area.getByRole("button", { name: "try again" }).click();
	await expect(area.locator('button[type="submit"]')).toBeEnabled();
	await expect(area.getByRole("alert")).toHaveCount(0);
	await expect(area).toHaveScreenshot("contact-after-retry.png");
});
