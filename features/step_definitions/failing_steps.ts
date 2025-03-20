import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

Then('sollte ein nicht vorhandenes Element sichtbar sein', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');

    // This will fail because the element doesn't exist
    await expect(this.page.locator('#non-existent-element')).toBeVisible({
        timeout: 2000 // Short timeout to make the test fail faster
    });
});

Then('die Aufgabe sollte einen falschen Text haben', async function (this: ICustomWorld) {
    if (!this.page) throw new Error('Page is not defined');

    // This will fail because we're expecting the wrong text
    await expect(this.page.locator('.todo-list li')).toHaveText('This text does not match');
}); 