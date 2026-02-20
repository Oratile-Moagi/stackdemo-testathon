import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * HomePage models the StackDemo product catalog, including
 * the product grid, vendor filter sidebar, and header cart badge.
 */
export class HomePage extends BasePage {
  /* ── Locators ───────────────────────────────────────────── */
  readonly logo: Locator;
  readonly productGrid: Locator;
  readonly productItems: Locator;
  readonly productsFoundLabel: Locator;
  readonly cartBadge: Locator;
  readonly cartBag: Locator;
  readonly filterSidebar: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('.Navbar_root__2kbI9');
    this.productGrid = page.locator('.shelf-container');
    this.productItems = page.locator('.shelf-item');
    this.productsFoundLabel = page.locator('.products-found span');
    this.cartBadge = page.locator('.bag__quantity');
    this.cartBag = page.locator('.bag');
    this.filterSidebar = page.locator('.filters');
    this.sortDropdown = page.locator('.sort');
  }

  /* ── Navigation ─────────────────────────────────────────── */

  async open(): Promise<void> {
    await this.goto('/');
    await this.productGrid.waitFor({ state: 'visible' });
  }

  /* ── Product catalog queries ────────────────────────────── */

  async getVisibleProductCount(): Promise<number> {
    return this.productItems.count();
  }

  async getAllProductNames(): Promise<string[]> {
    return this.productItems.locator('.shelf-item__title').allTextContents();
  }

  async getAllProductPrices(): Promise<string[]> {
    return this.productItems.locator('.shelf-item__price .val b').allTextContents();
  }

  /* ── Add to cart ────────────────────────────────────────── */

  /** Add the first product matching `name` to the cart. */
  async addToCartByName(name: string): Promise<void> {
    const product = this.productItems.filter({ hasText: name });
    await product.locator('.shelf-item__buy-btn').click();
  }

  /** Add the product at `index` (0-based) to the cart. */
  async addToCartByIndex(index: number): Promise<void> {
    await this.productItems.nth(index).locator('.shelf-item__buy-btn').click();
  }

  /* ── Vendor filters ─────────────────────────────────────── */

  /** Toggle a vendor filter checkbox (click once to enable, again to disable). */
  async toggleVendorFilter(vendor: string): Promise<void> {
    await this.filterSidebar.locator('label').filter({ hasText: vendor }).click();
    /* Allow the product grid to re-render after the filter toggle. */
    await this.page.waitForTimeout(600);
  }

  /** Return the text of all currently-visible vendor filter labels. */
  async getAvailableVendors(): Promise<string[]> {
    return this.filterSidebar.locator('label span').allTextContents();
  }

  /* ── Cart badge ─────────────────────────────────────────── */

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return parseInt(text?.trim() || '0', 10);
  }

  /** Click the bag icon to open the floating cart sidebar. */
  async openCart(): Promise<void> {
    await this.cartBag.click();
  }
}
