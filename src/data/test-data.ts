/**
 * Centralized test data for the StackDemo E2E suite.
 * Keeping data separate from tests improves readability and maintainability.
 */

/* ── Authentication ───────────────────────────────────────── */

export const USERS = {
  /** Known-good user that completes all flows successfully. */
  valid: {
    username: 'fav_user',
    password: 'testingisfun99',
  },
  /** Locked account — login should fail with a clear error. */
  locked: {
    username: 'locked_user',
    password: 'testingisfun99',
  },
  /** Valid user with an intentionally wrong password. */
  invalidPassword: {
    username: 'fav_user',
    password: 'wrong_password_123',
  },
  /** Completely invalid credentials. */
  invalidUser: {
    username: 'nonexistent_user',
    password: 'nope',
  },
} as const;

/* ── Shipping / checkout ──────────────────────────────────── */

export const SHIPPING = {
  firstName: 'Jane',
  lastName: 'Tester',
  address: '742 Evergreen Terrace',
  province: 'Ontario',
  postalCode: 'M5V 2T6',
} as const;
