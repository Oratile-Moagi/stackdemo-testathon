/**
 * Lightweight logger for test execution diagnostics.
 * Outputs to stdout so results appear in CI/BrowserStack logs.
 */
export const logger = {
  info: (message: string, context?: Record<string, unknown>): void => {
    const ts = new Date().toISOString();
    console.log(`[INFO  ${ts}] ${message}`, context ? JSON.stringify(context) : '');
  },

  warn: (message: string, context?: Record<string, unknown>): void => {
    const ts = new Date().toISOString();
    console.warn(`[WARN  ${ts}] ${message}`, context ? JSON.stringify(context) : '');
  },

  error: (message: string, context?: Record<string, unknown>): void => {
    const ts = new Date().toISOString();
    console.error(`[ERROR ${ts}] ${message}`, context ? JSON.stringify(context) : '');
  },

  step: (stepName: string): void => {
    console.log(`  ▸ ${stepName}`);
  },
};
