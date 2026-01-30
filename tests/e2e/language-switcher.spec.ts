import { test, expect } from '@playwright/test';

/**
 * E2E tests for language switcher functionality
 * Tests that switching languages preserves routes and doesn't result in 404 errors
 */

test.describe('Language Switcher', () => {
  const locales = ['en', 'es', 'it', 'fr', 'de'];

  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('/');
  });

  test('should switch languages on home page without 404', async ({ page }) => {
    // Should redirect to /en initially
    await expect(page).toHaveURL(/\/en/);

    // Test switching to each locale
    for (const locale of locales) {
      // Click the language button for this locale
      await page.click(`button[aria-label="Switch to ${locale.toUpperCase()}"]`);

      // Should not have a 404 error
      await expect(page).not.toHaveURL(/\/404/);
      await expect(page).not.toHaveURL(/\/not-found/);

      // URL should contain the locale
      await expect(page).toHaveURL(new RegExp(`\\/${locale}`));

      // Page should have content
      const bodyText = await page.textContent('body');
      expect(bodyText).toBeTruthy();
      expect(bodyText?.length).toBeGreaterThan(0);
    }
  });

  test('should preserve route when switching languages', async ({ page }) => {
    // Navigate to signup page first
    await page.goto('/en/signup');
    await expect(page).toHaveURL(/\/en\/signup/);

    // Switch to Spanish
    await page.click('button[aria-label="Switch to ES"]');
    await expect(page).toHaveURL(/\/es\/signup/);
    await expect(page).not.toHaveURL(/\/404|\/not-found/);

    // Switch to Italian
    await page.click('button[aria-label="Switch to IT"]');
    await expect(page).toHaveURL(/\/it\/signup/);
    await expect(page).not.toHaveURL(/\/404|\/not-found/);

    // Switch back to English
    await page.click('button[aria-label="Switch to EN"]');
    await expect(page).toHaveURL(/\/en\/signup/);
    await expect(page).not.toHaveURL(/\/404|\/not-found/);
  });

  test('should preserve query parameters when switching languages', async ({ page }) => {
    // Navigate with query parameters
    await page.goto('/en?ref=test&utm_source=website');
    await expect(page).toHaveURL(/\/en\?ref=test&utm_source=website/);

    // Switch to Spanish
    await page.click('button[aria-label="Switch to ES"]');

    // URL should have Spanish locale and preserve query params
    const url = page.url();
    expect(url).toContain('/es');
    expect(url).toContain('ref=test');
    expect(url).toContain('utm_source=website');

    await expect(page).not.toHaveURL(/\/404|\/not-found/);
  });

  test('should preserve hash when switching languages', async ({ page }) => {
    // Navigate with hash
    await page.goto('/en#features');
    await expect(page).toHaveURL(/\/en#features/);

    // Switch to Spanish
    await page.click('button[aria-label="Switch to ES"]');

    // URL should have Spanish locale and preserve hash
    const url = page.url();
    expect(url).toContain('/es');
    expect(url).toContain('#features');

    await expect(page).not.toHaveURL(/\/404|\/not-found/);
  });

  test('should not navigate when clicking the same locale', async ({ page }) => {
    const initialUrl = page.url();

    // Click the current locale button (EN)
    await page.click('button[aria-label="Switch to EN"]');

    // URL should not change
    await expect(page).toHaveURL(initialUrl);
  });

  test('should persist locale preference and apply on reload', async ({ page }) => {
    // Switch to Spanish
    await page.click('button[aria-label="Switch to ES"]');
    await expect(page).toHaveURL(/\/es/);

    // Reload the page
    await page.reload();

    // Should still be on Spanish locale
    await expect(page).toHaveURL(/\/es/);
    await expect(page).not.toHaveURL(/\/404|\/not-found/);
  });

  test('should handle navigation to nested routes across locales', async ({ page }) => {
    // Test with a nested route that exists
    const testRoutes = ['/app/rizz', '/app/profile', '/login'];

    for (const route of testRoutes) {
      // Navigate to route in English
      await page.goto(`/en${route}`);
      await expect(page).toHaveURL(new RegExp(`/en${route}`));

      // Switch to Spanish
      await page.click('button[aria-label="Switch to ES"]');
      await expect(page).toHaveURL(new RegExp(`/es${route}`));
      await expect(page).not.toHaveURL(/\/404|\/not-found/);

      // Go back to home
      await page.goto('/en');
    }
  });
});

test.describe('404 Error Handling', () => {
  test('should show proper 404 page for genuinely invalid routes', async ({ page }) => {
    // Navigate to a route that doesn't exist
    await page.goto('/en/this-route-does-not-exist');

    // Should show 404 content
    await expect(page.locator('h1:has-text("404")')).toBeVisible();
    await expect(page.locator('text=Page not found')).toBeVisible();
  });

  test('should handle 404 for non-existent locale', async ({ page }) => {
    // Navigate with an invalid locale
    await page.goto('/xx/some-page');

    // Should redirect or show appropriate error
    const url = page.url();
    // Either redirected to default locale or shows 404
    expect(
      url.includes('/en') ||
      await page.locator('h1:has-text("404")').isVisible()
    ).toBeTruthy();
  });
});
