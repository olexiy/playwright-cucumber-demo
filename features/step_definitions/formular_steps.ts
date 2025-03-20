import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

Given('I navigate to the text-box demo page', async function (this: ICustomWorld) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  await this.formPage.navigate();
});

When('I fill out the form with following details:', async function (this: ICustomWorld, dataTable) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  const data = dataTable.rowsHash();
  await this.formPage.fillForm(
    data['Full Name'],
    data['Email'],
    data['Current Address'],
    data['Permanent Address']
  );
});

When('I fill in {string} as my full name', async function (this: ICustomWorld, name: string) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  await this.formPage.fillFullName(name);
});

When('I fill in {string} as my email', async function (this: ICustomWorld, email: string) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  await this.formPage.fillEmail(email);
});

When('I fill in {string} as my current address', async function (this: ICustomWorld, address: string) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  await this.formPage.fillCurrentAddress(address);
});

When('I fill in {string} as my permanent address', async function (this: ICustomWorld, address: string) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  await this.formPage.fillPermanentAddress(address);
});

When('I submit the form', async function (this: ICustomWorld) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  await this.formPage.submitForm();
});

Then('I should see all my information displayed correctly', async function (this: ICustomWorld) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  const isOutputVisible = await this.formPage.verifyOutputIsVisible();
  expect(isOutputVisible).toBeTruthy();

  // Verify output contains the correct information
  const name = await this.formPage.getOutputName();
  expect(name).toContain('John Doe');

  const email = await this.formPage.getOutputEmail();
  expect(email).toContain('john.doe@example.com');

  const currentAddress = await this.formPage.getOutputCurrentAddress();
  expect(currentAddress).toContain('123 Main Street');

  const permanentAddress = await this.formPage.getOutputPermanentAddress();
  expect(permanentAddress).toContain('456 Second Avenue');
});

Then('I should see my name {string} displayed in the output', async function (this: ICustomWorld, expectedName: string) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  const name = await this.formPage.getOutputName();
  expect(name).toContain(expectedName);
});

Then('I should see my email {string} displayed in the output', async function (this: ICustomWorld, expectedEmail: string) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  const email = await this.formPage.getOutputEmail();
  expect(email).toContain(expectedEmail);
});

Then('I should see email validation errors', async function (this: ICustomWorld) {
  if (!this.formPage) throw new Error('FormPage is not defined');
  const hasError = await this.formPage.hasEmailValidationError();
  expect(hasError).toBeTruthy();
}); 