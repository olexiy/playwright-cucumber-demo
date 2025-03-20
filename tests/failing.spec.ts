import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages';

test.describe('Failing Tests for Report Demo', () => {
    test('should fail with screenshot', async ({ page }) => {
        // Initialize the TodoPage
        const todoPage = new TodoPage(page);

        // Step 1: Navigate to the TodoMVC app
        await todoPage.goto();

        // Step 2: Add a todo item
        await todoPage.addTodo('Failing Test Item');

        // Step 3: Verify the todo item was added
        await expect(todoPage.getTodoItems()).toHaveCount(1);

        // Step 4: This step will fail - looking for a non-existent element
        await expect(page.locator('#non-existent-element')).toBeVisible({ timeout: 2000 });
    });

    test('should fail with wrong text', async ({ page }) => {
        // Initialize the TodoPage
        const todoPage = new TodoPage(page);

        // Step 1: Navigate to the TodoMVC app
        await todoPage.goto();

        // Step 2: Add a todo item
        await todoPage.addTodo('Another Test Item');

        // Step 3: Verify the todo item was added
        await expect(todoPage.getTodoItems()).toHaveCount(1);

        // Step 4: This step will fail - expecting the wrong text
        await expect(todoPage.getTodoItem(0)).toHaveText('This text does not match');
    });
}); 