import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

Given('ich bin auf der TodoMVC Seite', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');
    await this.page.goto('/todomvc/');
});

When('ich {string} als neue Aufgabe eingebe', async function (this: ICustomWorld, task: string) {
    if (!this.page) throw new Error('Page is not defined');
    await this.page.getByPlaceholder('What needs to be done?').fill(task);
    await this.page.getByPlaceholder('What needs to be done?').press('Enter');
});

Then('sollte die Aufgabe in der Liste erscheinen', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');
    await expect(this.page.locator('.todo-list li')).toHaveCount(1);
});

When('ich die Aufgabe als erledigt markiere', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');
    await this.page.locator('.todo-list li').getByRole('checkbox').click();
});

Then('sollte die Aufgabe als erledigt angezeigt werden', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');
    await expect(this.page.locator('.todo-list li')).toHaveClass(/completed/);
});

Given('ich habe folgende Aufgaben eingegeben:', async function (this: ICustomWorld, dataTable: DataTable) {
    if (!this.page) throw new Error('Page is not defined');
    const tasks = dataTable.hashes().map((row: { [key: string]: string }) => row['Aufgabe']);
    for (const task of tasks) {
        await this.page.getByPlaceholder('What needs to be done?').fill(task);
        await this.page.getByPlaceholder('What needs to be done?').press('Enter');
    }
});

When('ich {string} als erledigt markiere', async function (this: ICustomWorld, task: string) {
    if (!this.page) throw new Error('Page is not defined');
    await this.page.locator('.todo-list li').filter({ hasText: task }).getByRole('checkbox').click();
});

When('ich auf {string} klicke', async function (this: ICustomWorld, buttonText: string) {
    if (!this.page) throw new Error('Page is not defined');

    const buttonMap: { [key: string]: string } = {
        // Todo buttons/links
        'Aktiv': 'Active',
        'Erledigt': 'Completed',
        'Alle': 'All',
        'Erledigte löschen': 'Clear completed',

        // Form buttons
        'Wert abrufen': 'Get Value',
        'Summe berechnen': 'Calculate',
        'Senden': 'Submit'
    };

    const translatedText = buttonMap[buttonText] || buttonText;

    try {
        // Special case for TodoMVC filters
        if (['Active', 'Completed', 'All'].includes(translatedText)) {
            await this.page.locator(`a[href="#/${translatedText.toLowerCase()}"]`).click();
        }
        // Special case for Clear completed button
        else if (translatedText === 'Clear completed') {
            await this.page.locator('button.clear-completed').click();
        }
        // Default button handling
        else {
            await this.page.getByRole('button', { name: translatedText }).click();
        }
    } catch (error) {
        // If specific selectors fail, try generic role selectors
        try {
            await this.page.getByRole('button', { name: translatedText }).click();
        } catch (buttonError) {
            await this.page.getByRole('link', { name: translatedText }).click();
        }
    }
});

Then('sollte ich {int} Aufgabe(n) sehen', async function (this: ICustomWorld, count: number) {
    if (!this.page) throw new Error('Page is not defined');
    await expect(this.page.locator('.todo-list li')).toHaveCount(count);
});

Then('{string} sollte (nicht )?sichtbar sein', async function (this: ICustomWorld, task: string, notVisible?: string) {
    if (!this.page) throw new Error('Page is not defined');
    if (notVisible) {
        await expect(this.page.locator('.todo-list li').filter({ hasText: task })).not.toBeVisible();
    } else {
        await expect(this.page.locator('.todo-list li').filter({ hasText: task })).toBeVisible();
    }
});

When('ich die Aufgabe doppelklicke', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');
    await this.page.locator('.todo-list li label').dblclick();
});

When('ich den Text zu {string} ändere', async function (this: ICustomWorld, newText: string) {
    if (!this.page) throw new Error('Page is not defined');
    await this.page.locator('.todo-list li .edit').fill(newText);
    await this.page.locator('.todo-list li .edit').press('Enter');
});

Then('sollte die Aufgabe als {string} angezeigt werden', async function (this: ICustomWorld, text: string) {
    if (!this.page) throw new Error('Page is not defined');
    await expect(this.page.locator('.todo-list li')).toHaveText(text);
});

When('ich alle Aufgaben als erledigt markiere', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');
    await this.page.locator('#toggle-all').click();
});

Then('sollten alle Aufgaben als erledigt angezeigt werden', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');
    await expect(this.page.locator('.todo-list li.completed')).toHaveCount(3);
});

Then('sollte die Liste leer sein', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');
    await expect(this.page.locator('.todo-list li')).toHaveCount(0);
});

Given('ich habe {string} als Aufgabe eingegeben', async function (this: ICustomWorld, task: string) {
    if (!this.page) throw new Error('Page is not defined');
    await this.page.getByPlaceholder('What needs to be done?').fill(task);
    await this.page.getByPlaceholder('What needs to be done?').press('Enter');
});

Then('{string} sollte sichtbar sein', async function (this: ICustomWorld, task: string) {
    if (!this.page) throw new Error('Page is not defined');
    await expect(this.page.locator('.todo-list li').filter({ hasText: task })).toBeVisible();
});

Then('{string} sollte nicht sichtbar sein', async function (this: ICustomWorld, task: string) {
    if (!this.page) throw new Error('Page is not defined');
    await expect(this.page.locator('.todo-list li').filter({ hasText: task })).not.toBeVisible();
}); 