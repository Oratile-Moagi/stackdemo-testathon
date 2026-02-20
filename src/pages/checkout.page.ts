import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * CheckoutPage models the shipping / billing form that appears
 * after a successful sign-in during the checkout flow.
 */
export class CheckoutPage extends BasePage {
  /* ── Locators ───────────────────────────────────────────── */
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly provinceInput: Locator;
  readonly postalCodeInput: Locator;
  readonly submitButton: Locator;
  readonly checkoutHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[id="firstNameInput"]');
    this.lastNameInput = page.locator('[id="lastNameInput"]');
    this.addressInput = page.locator('[id="addressLine1Input"]');
    this.provinceInput = page.locator('[id="provinceInput"]');
    this.postalCodeInput = page.locator('[id="postCodeInput"]');
    this.submitButton = page.locator('#checkout-shipping-continue');
    this.checkoutHeading = page.locator('.optimizedCheckout-headingPrimary');
  }

  /* ── Actions ────────────────────────────────────────────── */

  /** Fill the entire shipping form with the given details. */
  async fillShippingForm(details: {
    firstName: string;
    lastName: string;
    address: string;
    province: string;
    postalCode: string;
  }): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.provinceInput.fill(details.province);
    await this.postalCodeInput.fill(details.postalCode);
  }

  /** Submit the shipping form. */
  async submitOrder(): Promise<void> {
    await this.submitButton.click();
  }
}
