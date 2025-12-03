import { test, expect } from '@playwright/test';

test.describe('Trainer Hub', () => {
  test('should display 8 pokemon cards on initial load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const cards = page.locator('app-pokemon-item');
    await expect(cards).toHaveCount(8);
    await expect(cards.nth(0)).toContainText(/bulbasaur|ivysaur|charmander|squirtle/i);
  });
});