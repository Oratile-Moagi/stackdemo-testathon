import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * ConfirmationPage models the order-confirmation screen shown
 * after a successful checkout submission.
 */
export class ConfirmationPage extends BasePage {
  /* ── Locators ───────────────────────────────────────────── */
  readonly confirmationHeading: Locator;
  readonly continueShoppingBtn: Locator;
  readonly orderDetails: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmationHeading = page.locator('#__next').getByText(/thank you|order|confirmation/i);
    this.continueShoppingBtn = page.locator('.continueButtonContainer button, a[href="/"]').first();
    this.orderDetails = page.locator('.order-info, .orders-listing');
  }

  /* ── Queries ────────────────────────────────────────────── */

  async isDisplayed(): Promise<boolean> {
    return this.confirmationHeading.isVisible({ timeout: 10_000 });
  }

  /* ── Actions ────────────────────────────────────────────── */

  async continueShopping(): Promise<void> {
    await this.continueShoppingBtn.click();
  }
}
