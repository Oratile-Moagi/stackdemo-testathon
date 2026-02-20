import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CartPage } from '../pages/cart.page';
import { SignInPage } from '../pages/signin.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ConfirmationPage } from '../pages/confirmation.page';

/**
 * Custom fixture type that provides pre-constructed page objects
 * to every test via Playwright's dependency-injection mechanism.
 *
 * Usage in tests:
 *   import { test, expect } from '../src/fixtures/test.fixture';
 *   test('example', async ({ homePage, cartPage }) => { ... });
 */
type PageFixtures = {
  homePage: HomePage;
  cartPage: CartPage;
  signInPage: SignInPage;
  checkoutPage: CheckoutPage;
  confirmationPage: ConfirmationPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  },
});

export { expect } from '@playwright/test';
