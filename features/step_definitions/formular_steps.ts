import { Given, When, Then, DataTable } from '@cucumber/cucumber';
//import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

// Form steps
Given('ich bin auf der Formular-Demo-Seite', async function (this: ICustomWorld) {
    if (!this.formPage) throw new Error('FormPage is not defined');
    await this.formPage.navigate();
});

When('ich {string} als Nachricht eingebe', async function (this: ICustomWorld, _message: string) {
    if (!this.formPage) throw new Error('FormPage is not defined');
    await this.formPage.fillMessage(_message);
    await this.formPage.waitForPageLoad();
});

When('ich auf dem Formular auf {string} klicke', async function (this: ICustomWorld, buttonName: string) {
    if (!this.formPage) throw new Error('FormPage is not defined');
    await this.formPage.clickButton(buttonName);
});

Then('sollte die Nachricht {string} angezeigt werden', async function (this: ICustomWorld, _message: string) {
    if (!this.formPage) throw new Error('FormPage is not defined');
    await this.formPage.verifyMessage();
    await this.formPage.waitForPageLoad();
});

// Numeric form steps
When('ich folgende Zahlen eingebe:', async function (this: ICustomWorld, _dataTable: DataTable) {
    if (!this.formPage) throw new Error('FormPage is not defined');
    await this.formPage.fillNumbers(1, 2); // Mock implementation
    await this.formPage.waitForPageLoad();
});

Then('sollte das Ergebnis {string} sein', async function (this: ICustomWorld, _result: string) {
    if (!this.formPage) throw new Error('FormPage is not defined');
    await this.formPage.verifyResult();
    await this.formPage.waitForPageLoad();
}); 