import { test, expect } from '@playwright/test';

test.describe('Trainer Hub', () => {
  test('should display 8 pokemon cards on initial load', async ({ page }) => {
    // baseURL is usually set to http://localhost:4200 in playwright.config.ts
    await page.goto('/');

    // Wait until network is mostly idle (all HTTP calls done, including PokéAPI)
    await page.waitForLoadState('networkidle');

    // Select all rendered creature cards
    const cards = page.locator('app-creature-entry');

    // Expect exactly 8 items (limit=8 in your service)
    await expect(cards).toHaveCount(8);

    // Optional: sanity check – first card should contain some name text
    await expect(cards.nth(0)).toContainText(/bulbasaur|ivysaur|charmander|squirtle/i);
  });
});