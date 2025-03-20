import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

Given('ich bin auf der TodoMVC Seite', async function (this: ICustomWorld) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await this.todoPage.goto();
});

When('ich {string} als neue Aufgabe eingebe', async function (this: ICustomWorld, task: string) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await this.todoPage.addTodo(task);
});

Then('sollte die Aufgabe in der Liste erscheinen', async function (this: ICustomWorld) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await expect(this.todoPage.getTodoItems()).toHaveCount(1);
});

When('ich die Aufgabe als erledigt markiere', async function (this: ICustomWorld) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await this.todoPage.markAsCompleted(0);
});

Then('sollte die Aufgabe als erledigt angezeigt werden', async function (this: ICustomWorld) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await expect(this.todoPage.getTodoItem(0)).toHaveClass(/completed/);
});

Given('ich habe folgende Aufgaben eingegeben:', async function (this: ICustomWorld, dataTable: DataTable) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  const tasks = dataTable.hashes().map((row: { [key: string]: string }) => row['Aufgabe']);
  for (const task of tasks) {
    await this.todoPage.addTodo(task);
  }
});

When('ich {string} als erledigt markiere', async function (this: ICustomWorld, task: string) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  if (!this.page) throw new Error('Page is not defined');
  // Find the index of the task with the given text
  const count = await this.todoPage.getTodoItems().count();
  for (let i = 0; i < count; i++) {
    const itemText = await this.todoPage.getTodoItem(i).textContent();
    if (itemText?.includes(task)) {
      await this.todoPage.markAsCompleted(i);
      break;
    }
  }
});

When('ich auf {string} klicke', async function (this: ICustomWorld, buttonText: string) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  if (!this.page) throw new Error('Page is not defined');

  const buttonMap: { [key: string]: string } = {
    'Aktiv': 'active',
    'Erledigt': 'completed',
    'Alle': 'all',
    'Erledigte löschen': 'Clear completed'
  };

  const translatedText = buttonMap[buttonText] || buttonText;

  // Handle special cases for TodoMVC filters
  if (['all', 'active', 'completed'].includes(translatedText)) {
    await this.todoPage.filterByStatus(translatedText as 'all' | 'active' | 'completed');
  }
  // Handle clear completed button
  else if (translatedText === 'Clear completed') {
    await this.todoPage.clearCompleted();
  }
  // Default button handling for form or other pages
  else {
    try {
      await this.page.getByRole('button', { name: translatedText }).click();
    } catch (buttonError) {
      await this.page.getByRole('link', { name: translatedText }).click();
    }
  }
});

Then('sollte ich {int} Aufgabe(n) sehen', async function (this: ICustomWorld, count: number) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await expect(this.todoPage.getTodoItems()).toHaveCount(count);
});

Then('{string} sollte (nicht )?sichtbar sein', async function (this: ICustomWorld, task: string, notVisible?: string) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  const todoItem = this.todoPage.getTodoItemByText(task);

  if (notVisible) {
    await expect(todoItem).not.toBeVisible();
  } else {
    await expect(todoItem).toBeVisible();
  }
});

When('ich die Aufgabe doppelklicke', async function (this: ICustomWorld) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  // Since we're not specifying which task, we'll use the first one
  await this.todoPage.getTodoItem(0).locator('label').dblclick();
});

When('ich den Text zu {string} ändere', async function (this: ICustomWorld, newText: string) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  if (!this.page) throw new Error('Page is not defined');

  // Editing the currently active task
  await this.page.locator('.todo-list li .edit').fill(newText);
  await this.page.locator('.todo-list li .edit').press('Enter');
});

Then('sollte die Aufgabe als {string} angezeigt werden', async function (this: ICustomWorld, text: string) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await expect(this.todoPage.getTodoItem(0)).toHaveText(text);
});

When('ich alle Aufgaben als erledigt markiere', async function (this: ICustomWorld) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await this.todoPage.toggleAll();
});

Then('sollten alle Aufgaben als erledigt angezeigt werden', async function (this: ICustomWorld) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  if (!this.page) throw new Error('Page is not defined');

  // Check that all todo items have the completed class
  await expect(this.page.locator('.todo-list li.completed')).toHaveCount(3);
});

Then('sollte die Liste leer sein', async function (this: ICustomWorld) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await expect(this.todoPage.getTodoItems()).toHaveCount(0);
});

Given('ich habe {string} als Aufgabe eingegeben', async function (this: ICustomWorld, task: string) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await this.todoPage.addTodo(task);
});

Then('{string} sollte sichtbar sein', async function (this: ICustomWorld, task: string) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await expect(this.todoPage.getTodoItemByText(task)).toBeVisible();
});

Then('{string} sollte nicht sichtbar sein', async function (this: ICustomWorld, task: string) {
  if (!this.todoPage) throw new Error('TodoPage is not defined');
  await expect(this.todoPage.getTodoItemByText(task)).not.toBeVisible();
}); 