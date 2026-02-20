import { type Page } from '@playwright/test';

/**
 * BasePage provides shared navigation and utility methods
 * inherited by every concrete page object.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navigate to a path relative to the configured baseURL. */
  async goto(path = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /** Wait for the SPA to finish all pending network requests. */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Return the document title. */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** Current page URL. */
  getUrl(): string {
    return this.page.url();
  }
}
