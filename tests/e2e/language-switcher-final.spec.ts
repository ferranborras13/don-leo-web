import { test, expect } from '@playwright/test';

/**
 * E2E test for language switcher - Final verification
 * Tests that language switching works correctly without 404 errors
 */
test.describe('Language Switcher - Final Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Start from home page
    await page.goto('/');
  });

  test('should navigate to /en from root', async ({ page }) => {
    // Should redirect to /en
    await expect(page).toHaveURL(/\/en/);
    // Should NOT be a 404 page
    await expect(page.locator('h1:has-text("404")')).not.toBeVisible();
  });

  test('should switch from EN to ES without 404', async ({ page }) => {
    // Start from home (redirects to /en)
    await expect(page).toHaveURL(/\/en/);

    // Click the ES button
    await page.click('button[aria-label="Switch to ES"]');

    // URL should become /es (not /en/es or /es/es)
    await expect(page).toHaveURL(/\/es$/);
    // Should NOT be a 404 page
    await expect(page.locator('h1:has-text("404")')).not.toBeVisible();
    // Page should have content
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('should switch from EN to FR without 404', async ({ page }) => {
    await expect(page).toHaveURL(/\/en/);
    await page.click('button[aria-label="Switch to FR"]');

    await expect(page).toHaveURL(/\/fr$/);
    await expect(page.locator('text=ROOT NOT FOUND')).not.toBeVisible();
    await expect(page.locator('text=LOCALE NOT FOUND')).not.toBeVisible();
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('should switch from EN to IT without 404', async ({ page }) => {
    await expect(page).toHaveURL(/\/en/);
    await page.click('button[aria-label="Switch to IT"]');

    await expect(page).toHaveURL(/\/it$/);
    await expect(page.locator('text=ROOT NOT FOUND')).not.toBeVisible();
    await expect(page.locator('text=LOCALE NOT FOUND')).not.toBeVisible();
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('should switch from EN to DE without 404', async ({ page }) => {
    await expect(page).toHaveURL(/\/en/);
    await page.click('button[aria-label="Switch to DE"]');

    await expect(page).toHaveURL(/\/de$/);
    await expect(page.locator('text=ROOT NOT FOUND')).not.toBeVisible();
    await expect(page.locator('text=LOCALE NOT FOUND')).not.toBeVisible();
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('should preserve route when switching locale', async ({ page }) => {
    // Navigate to signup page
    await page.goto('/en/signup');
    await expect(page).toHaveURL(/\/en\/signup/);

    // Click ES button
    await page.click('button[aria-label="Switch to ES"]');

    // URL should become /es/signup
    await expect(page).toHaveURL(/\/es\/signup/);
    await expect(page.locator('text=ROOT NOT_FOUND')).not.toBeVisible();
    await expect(page.locator('text=LOCALE NOT FOUND')).not.toBeVisible();
  });

  test('should preserve query parameters when switching locale', async ({ page }) => {
    await page.goto('/en?ref=test&utm_source=google');
    await expect(page).toHaveURL(/\/en\?ref=test&utm_source=google/);

    await page.click('button[aria-label="Switch to FR"]');

    // URL should have French locale and preserve query params
    await expect(page).toHaveURL(/\/fr\?ref=test&utm_source=google/);
    await expect(page.locator('text=ROOT NOT FOUND')).not.toBeVisible();
  });

  test('should preserve locale on page reload', async ({ page }) => {
    // Switch to Spanish
    await page.click('button[aria-label="Switch to ES"]');
    await expect(page).toHaveURL(/\/es/);

    // Reload the page
    await page.reload();

    // Should still be on /es (locale persisted via cookie)
    await expect(page).toHaveURL(/\/es/);
    await expect(page.locator('text=ROOT NOT FOUND')).not.toBeVisible();
  });

  test('should have working landing page content', async ({ page }) => {
    await page.goto('/es');

    // Check for landing page content - the DonLeo logo should be visible
    await expect(page.locator('text=/donleo/i')).toBeVisible();

    // Should NOT be a 404 page
    await expect(page.locator('h1:has-text("404")')).not.toBeVisible();
  });
});
