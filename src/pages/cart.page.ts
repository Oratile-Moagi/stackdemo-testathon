import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * CartPage models the floating cart sidebar that slides in
 * from the right when the user clicks the bag icon.
 */
export class CartPage extends BasePage {
  /* ── Locators ───────────────────────────────────────────── */
  readonly sidebar: Locator;
  readonly closeBtn: Locator;
  readonly items: Locator;
  readonly subtotal: Locator;
  readonly checkoutBtn: Locator;
  readonly emptyMessage: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebar = page.locator('.float-cart');
    this.closeBtn = page.locator('.float-cart__close-btn');
    this.items = page.locator('.float-cart__shelf-container .shelf-item');
    this.subtotal = page.locator('.sub-price__val');
    this.checkoutBtn = page.locator('.buy-btn');
    this.emptyMessage = page.locator('.shelf-empty');
    this.header = page.locator('.float-cart__header');
  }

  /* ── State queries ──────────────────────────────────────── */

  async isCartOpen(): Promise<boolean> {
    const cls = await this.sidebar.getAttribute('class');
    return cls?.includes('float-cart--open') ?? false;
  }

  async getItemCount(): Promise<number> {
    return this.items.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.items.locator('.shelf-item__details .title').allTextContents();
  }

  async getSubtotalText(): Promise<string> {
    return (await this.subtotal.textContent())?.trim() ?? '';
  }

  /** Parse the numeric subtotal (strips currency symbols). */
  async getSubtotalNumeric(): Promise<number> {
    const raw = await this.getSubtotalText();
    return parseFloat(raw.replace(/[^0-9.]/g, '')) || 0;
  }

  async isEmpty(): Promise<boolean> {
    return this.emptyMessage.isVisible();
  }

  /* ── Actions ────────────────────────────────────────────── */

  async close(): Promise<void> {
    await this.closeBtn.click();
  }

  /**
   * Increase quantity for the item at `index` (0-based).
   * The "+" button is the LAST .change-product-button within the item.
   */
  async increaseQuantity(index: number): Promise<void> {
    await this.items.nth(index).locator('.change-product-button').last().click();
  }

  /**
   * Decrease quantity for the item at `index` (0-based).
   * The "−" button is the FIRST .change-product-button within the item.
   */
  async decreaseQuantity(index: number): Promise<void> {
    await this.items.nth(index).locator('.change-product-button').first().click();
  }

  /** Remove the item at `index` from the cart. */
  async removeItem(index: number): Promise<void> {
    await this.items.nth(index).locator('.shelf-item__del').click();
  }

  /** Get the displayed quantity for the item at `index`. */
  async getItemQuantity(index: number): Promise<number> {
    const el = this.items.nth(index).locator('.change-product-button').locator('..').locator('p');
    const text = await el.textContent();
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }

  /** Click the Checkout button at the bottom of the cart. */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutBtn.click();
  }
}
