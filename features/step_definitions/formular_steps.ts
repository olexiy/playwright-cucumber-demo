import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

// Mark test as pending (skipped) since the form page doesn't exist in the demo site
Given('ich bin auf der Formular-Demo-Seite', async function (this: ICustomWorld) {
    // Skip this test as the page doesn't exist
    return 'pending';
});

When('ich {string} als Nachricht eingebe', async function (this: ICustomWorld, message: string) {
    // Skip this test as the page doesn't exist
    return 'pending';
});

Then('sollte die Nachricht {string} angezeigt werden', async function (this: ICustomWorld, message: string) {
    // Skip this test as the page doesn't exist
    return 'pending';
});

When('ich folgende Zahlen eingebe:', async function (this: ICustomWorld, dataTable: DataTable) {
    // Skip this test as the page doesn't exist
    return 'pending';
});

Then('sollte das Ergebnis {string} sein', async function (this: ICustomWorld, result: string) {
    // Skip this test as the page doesn't exist
    return 'pending';
}); 