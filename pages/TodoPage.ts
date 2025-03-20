import { Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class TodoPage extends BasePage {
  // URL
  readonly baseUrl = '/todomvc/';

  // Locators
  readonly newTodoInput: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;
  readonly toggleAllButton: Locator;

  constructor(page) {
    super(page);
    
    // Initialize locators
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoList = page.locator('.todo-list');
    this.todoItems = page.locator('.todo-list li');
    this.todoCount = page.locator('.todo-count');
    this.clearCompletedButton = page.locator('.clear-completed');
    this.filterAll = page.getByRole('link', { name: 'All' });
    this.filterActive = page.getByRole('link', { name: 'Active' });
    this.filterCompleted = page.getByRole('link', { name: 'Completed' });
    this.toggleAllButton = page.locator('.toggle-all');
  }

  /**
   * Navigate to the TodoMVC app
   */
  async goto(): Promise<void> {
    await this.navigate(this.baseUrl);
    await this.waitForPageLoad();
  }

  /**
   * Add a new todo item
   * @param text The text for the new todo
   */
  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /**
   * Get all todo items
   * @returns Locator for all todo items
   */
  getTodoItems(): Locator {
    return this.todoItems;
  }

  /**
   * Get a specific todo item by index
   * @param index The index of the todo item
   * @returns Locator for the specific todo item
   */
  getTodoItem(index: number): Locator {
    return this.todoItems.nth(index);
  }

  /**
   * Get a todo item by text content
   * @param text The text of the todo item
   * @returns Locator for the todo item with the specified text
   */
  getTodoItemByText(text: string): Locator {
    return this.todoList.getByText(text);
  }

  /**
   * Get the checkbox for a specific todo item
   * @param index The index of the todo item
   * @returns Locator for the checkbox
   */
  getTodoItemCheckbox(index: number): Locator {
    return this.getTodoItem(index).getByRole('checkbox');
  }

  /**
   * Mark a todo item as completed
   * @param index The index of the todo item
   */
  async markAsCompleted(index: number): Promise<void> {
    await this.getTodoItemCheckbox(index).check();
  }

  /**
   * Edit a todo item
   * @param index The index of the todo item
   * @param newText The new text for the todo item
   */
  async editTodo(index: number, newText: string): Promise<void> {
    const todoItem = this.getTodoItem(index);
    // Double click to enter edit mode
    await todoItem.dblclick();
    // Clear existing text and enter new text
    await this.page.locator('.todo-list li.editing input').fill('');
    await this.page.locator('.todo-list li.editing input').fill(newText);
    // Press Enter to save
    await this.page.locator('.todo-list li.editing input').press('Enter');
  }

  /**
   * Delete a todo item
   * @param index The index of the todo item
   */
  async deleteTodo(index: number): Promise<void> {
    const todoItem = this.getTodoItem(index);
    // Hover to show the destroy button
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
  }

  /**
   * Filter todos by status
   * @param status The status to filter by (all, active, completed)
   */
  async filterByStatus(status: 'all' | 'active' | 'completed'): Promise<void> {
    switch(status) {
      case 'all':
        await this.filterAll.click();
        break;
      case 'active':
        await this.filterActive.click();
        break;
      case 'completed':
        await this.filterCompleted.click();
        break;
    }
  }

  /**
   * Toggle all todos (mark all as completed or active)
   */
  async toggleAll(): Promise<void> {
    await this.toggleAllButton.click();
  }

  /**
   * Clear all completed todos
   */
  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  /**
   * Get the count of remaining todos
   * @returns The count text
   */
  async getRemainingCount(): Promise<string> {
    return await this.todoCount.textContent() || '';
  }
} 