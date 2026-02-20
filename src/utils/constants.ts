/** Centralized application constants used across tests and page objects. */

export const APP = {
  /** Page title as rendered in the <title> tag. */
  TITLE: 'StackDemo',

  /** Default base URL (can be overridden via env / Playwright config). */
  BASE_URL: 'https://testathon.live',
} as const;

/** Vendor names exactly as they appear in the filter sidebar. */
export const VENDORS = ['Apple', 'Samsung', 'Google', 'OnePlus'] as const;
export type Vendor = (typeof VENDORS)[number];

/** Brand keywords used to validate that filtered products belong to a vendor. */
export const VENDOR_PRODUCT_KEYWORDS: Record<Vendor, string[]> = {
  Apple: ['iPhone', 'iPad', 'Apple'],
  Samsung: ['Galaxy', 'Samsung'],
  Google: ['Pixel', 'Google'],
  OnePlus: ['OnePlus'],
};
