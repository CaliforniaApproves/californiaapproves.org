// Remembers which referral code brought a visitor here, so a pledge made later
// (after browsing to the pledge page, or on a return visit) still credits the
// person who shared the link. The code is not personal data; it only names the
// referrer. It is kept in localStorage for 30 days.

const STORAGE_KEY = "caa-referral";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

// Must match REFERRAL_CODE_PATTERN in src/worker/subscribe.ts.
const CODE_PATTERN = /^[0-9A-Za-z]{4,12}$/;

type Stored = { code: string; expires: number };

/** Saves a `?ref=CODE` from the current URL, if there is a valid one. */
export function captureReferral(): void {
	const code = new URLSearchParams(window.location.search).get("ref");
	if (!code || !CODE_PATTERN.test(code)) return;
	try {
		const stored: Stored = {
			code: code.toUpperCase(),
			expires: Date.now() + TTL_MS,
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
	} catch {
		// Storage can be blocked (private windows, strict settings); the
		// referral then only counts if the pledge is made on this same visit.
	}
}

/** The remembered referral code, or null if none or it has expired. */
export function getStoredReferral(): string | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const stored = JSON.parse(raw) as Stored;
		if (stored.expires < Date.now() || !CODE_PATTERN.test(stored.code)) {
			localStorage.removeItem(STORAGE_KEY);
			return null;
		}
		return stored.code;
	} catch {
		return null;
	}
}
