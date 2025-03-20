import { test, expect } from '@playwright/test';

test.describe('Failing Tests for Report Demo', () => {
    test('should fail with screenshot', async ({ page }) => {
        // Step 1: Navigate to the TodoMVC app
        await page.goto('/todomvc/');

        // Step 2: Add a todo item
        await page.getByPlaceholder('What needs to be done?').fill('Failing Test Item');
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        // Step 3: Verify the todo item was added
        await expect(page.locator('.todo-list li')).toHaveCount(1);

        // Step 4: This step will fail - looking for a non-existent element
        await expect(page.locator('#non-existent-element')).toBeVisible({ timeout: 2000 });
    });

    test('should fail with wrong text', async ({ page }) => {
        // Step 1: Navigate to the TodoMVC app
        await page.goto('/todomvc/');

        // Step 2: Add a todo item
        await page.getByPlaceholder('What needs to be done?').fill('Another Test Item');
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        // Step 3: Verify the todo item was added
        await expect(page.locator('.todo-list li')).toHaveCount(1);

        // Step 4: This step will fail - expecting the wrong text
        await expect(page.locator('.todo-list li')).toHaveText('This text does not match');
    });
}); 