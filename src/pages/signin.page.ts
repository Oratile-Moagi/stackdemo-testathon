import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * SignInPage models the StackDemo login form.
 *
 * The username field is a custom react-select dropdown, not a native <select>.
 * The password field is a standard <input type="password">.
 */
export class SignInPage extends BasePage {
  /* ── Locators ───────────────────────────────────────────── */
  readonly usernameSelect: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginWrapper: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameSelect = page.locator('#react-select-2-input');
    this.passwordInput = page.locator('#react-select-3-input');
    this.loginButton = page.locator('#login-btn');
    this.errorMessage = page.locator('.api-error');
    this.loginWrapper = page.locator('.login_wrapper');
  }

  /* ── Navigation ─────────────────────────────────────────── */

  async open(): Promise<void> {
    await this.goto('/signin');
    await this.loginWrapper.waitFor({ state: 'visible' });
  }

  /* ── Actions ────────────────────────────────────────────── */

  /** Select a username from the react-select dropdown. */
  async selectUsername(username: string): Promise<void> {
    await this.usernameSelect.fill(username);
    await this.page.locator(`[id*="option"]`).filter({ hasText: username }).first().click();
  }

  /** Type a password into the password field. */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.page.locator(`[id*="option"]`).filter({ hasText: password }).first().click();
  }

  /** Submit the login form. */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /** Convenience: perform a full login in one call. */
  async login(username: string, password: string): Promise<void> {
    await this.selectUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /** Return the error message text (empty string if not visible). */
  async getErrorMessage(): Promise<string> {
    if (await this.errorMessage.isVisible()) {
      return (await this.errorMessage.textContent())?.trim() ?? '';
    }
    return '';
  }
}
