import { test, expect } from '@playwright/test';

test.describe('Demo Tests', () => {
    test.describe('UI Tests', () => {
        test('should navigate to todo app and add a new todo', async ({ page }) => {
            await page.goto('/todomvc');

            // Add a new todo
            await page.getByPlaceholder('What needs to be done?').fill('Learn Playwright');
            await page.getByPlaceholder('What needs to be done?').press('Enter');

            // Verify todo was added
            await expect(page.getByText('Learn Playwright')).toBeVisible();

            // Mark todo as completed
            await page.locator('.todo-list li').getByRole('checkbox').click();

            // Verify todo is marked as completed
            await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
        });

        test('should filter todos by status', async ({ page }) => {
            await page.goto('/todomvc');

            // Add multiple todos
            const todos = ['Learn Playwright', 'Write Tests', 'Be Awesome'];
            for (const todo of todos) {
                await page.getByPlaceholder('What needs to be done?').fill(todo);
                await page.getByPlaceholder('What needs to be done?').press('Enter');
            }

            // Mark one todo as completed
            await page.locator('.todo-list li').filter({ hasText: 'Write Tests' }).getByRole('checkbox').click();

            // Filter by active
            await page.getByRole('link', { name: 'Active' }).click();
            await expect(page.locator('.todo-list li')).toHaveCount(2);
            await expect(page.locator('.todo-list li').filter({ hasText: 'Write Tests' })).not.toBeVisible();

            // Filter by completed
            await page.getByRole('link', { name: 'Completed' }).click();
            await expect(page.locator('.todo-list li')).toHaveCount(1);
            await expect(page.locator('.todo-list li').filter({ hasText: 'Write Tests' })).toBeVisible();

            // Filter by all
            await page.getByRole('link', { name: 'All' }).click();
            await expect(page.locator('.todo-list li')).toHaveCount(3);
        });

        test('should edit existing todo', async ({ page }) => {
            await page.goto('/todomvc');

            // Add a todo
            await page.getByPlaceholder('What needs to be done?').fill('Learn Playwright');
            await page.getByPlaceholder('What needs to be done?').press('Enter');

            // Double click to edit
            await page.locator('.todo-list li label').dblclick();

            // Edit the todo
            await page.locator('.todo-list li .edit').fill('Master Playwright');
            await page.locator('.todo-list li .edit').press('Enter');

            // Verify the edit
            await expect(page.locator('.todo-list li')).toHaveText('Master Playwright');
        });

        test('should mark all todos as completed and clear completed', async ({ page }) => {
            await page.goto('/todomvc');

            // Add multiple todos
            const todos = ['Task 1', 'Task 2', 'Task 3'];
            for (const todo of todos) {
                await page.getByPlaceholder('What needs to be done?').fill(todo);
                await page.getByPlaceholder('What needs to be done?').press('Enter');
            }

            // Verify initial count
            await expect(page.locator('.todo-count')).toContainText('3');

            // Mark all as completed
            await page.locator('#toggle-all').click();

            // Verify all are completed
            await expect(page.locator('.todo-list li.completed')).toHaveCount(3);

            // Clear completed
            await page.getByRole('button', { name: 'Clear completed' }).click();

            // Verify all todos are removed
            await expect(page.locator('.todo-list li')).toHaveCount(0);
        });

        test('should handle form submission', async ({ page }) => {
            await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');

            // Fill out the form
            const messageInput = page.getByRole('textbox', { name: 'Please enter your Message' });
            await messageInput.fill('Hello Playwright!');
            await page.getByRole('button', { name: 'Get Checked Value' }).click();

            // Verify message is displayed
            await expect(page.locator('#message')).toHaveText('Hello Playwright!');

            // Test two input fields
            await page.locator('input#sum1').fill('5');
            await page.locator('input#sum2').fill('7');

            await page.locator("//button[text()='Get Sum']").click();

            // Verify sum is correct
            await expect(page.locator('#addmessage')).toHaveText('12');
        });
    });

    test.describe('API Tests', () => {
        test('should fetch and verify posts', async ({ request }) => {
            // Get all posts
            const response = await request.get('https://jsonplaceholder.typicode.com/posts');
            expect(response.ok()).toBeTruthy();

            const posts = await response.json();
            expect(Array.isArray(posts)).toBeTruthy();
            expect(posts.length).toBeGreaterThan(0);

            // Verify post structure
            const firstPost = posts[0];
            expect(firstPost).toHaveProperty('id');
            expect(firstPost).toHaveProperty('title');
            expect(firstPost).toHaveProperty('body');
            expect(firstPost).toHaveProperty('userId');
        });

        test('should create a new post', async ({ request }) => {
            const newPost = {
                title: 'Test Post',
                body: 'This is a test post created by Playwright',
                userId: 1
            };

            const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
                data: newPost
            });

            expect(response.ok()).toBeTruthy();
            const createdPost = await response.json();

            expect(createdPost).toHaveProperty('id');
            expect(createdPost.title).toBe(newPost.title);
            expect(createdPost.body).toBe(newPost.body);
            expect(createdPost.userId).toBe(newPost.userId);
        });
    });
}); 