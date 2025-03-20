import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class FormPage extends BasePage {
  // URL
  readonly baseUrl = '/form/';

  // Locators
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly resultMessage: Locator;
  readonly form: Locator;
  readonly valueButton: Locator;
  readonly sumButton: Locator;
  readonly firstNumberInput: Locator;
  readonly secondNumberInput: Locator;
  readonly resultValue: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators
    this.form = page.locator('form');
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.messageInput = page.locator('#message');
    this.submitButton = page.locator('button[type="submit"]');
    this.resultMessage = page.locator('.result-message');
    this.valueButton = page.locator('button:text("Wert abrufen")');
    this.sumButton = page.locator('button:text("Summe berechnen")');
    this.firstNumberInput = page.locator('#first-number');
    this.secondNumberInput = page.locator('#second-number');
    this.resultValue = page.locator('#result');
  }

  /**
     * Navigate to the form page
     */
  async navigate(url = this.baseUrl): Promise<void> {
    await super.navigate(url);
    await this.waitForPageLoad();
  }

  /**
     * Wait for page to load
     */
  async waitForPageLoad(): Promise<void> {
    await this.form.waitFor({ state: 'visible' });
  }

  /**
     * Fill the form with the provided data
     * @param name The name to fill in
     * @param email The email to fill in
     * @param message The message to fill in
     */
  async fillForm(name: string, email: string, message: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }

  /**
     * Fill only the message input
     * @param message The message to fill in
     */
  async fillMessage(message: string): Promise<void> {
    await this.messageInput.fill(message);
  }

  /**
     * Submit the form
     */
  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  /**
     * Click a button by its name
     * @param buttonName The name of the button to click
     */
  async clickButton(buttonName: string): Promise<void> {
    switch (buttonName) {
      case 'Wert abrufen':
        await this.valueButton.click();
        break;
      case 'Summe berechnen':
        await this.sumButton.click();
        break;
      default:
        await this.page.locator(`button:text("${buttonName}")`).click();
    }
  }

  /**
     * Verify that a message is displayed
     */
  async verifyMessage(): Promise<string> {
    await this.resultMessage.waitFor({ state: 'visible' });
    return await this.resultMessage.textContent() || '';
  }

  /**
     * Fill number inputs for calculation
     * @param first The first number
     * @param second The second number
     */
  async fillNumbers(first: number, second: number): Promise<void> {
    await this.firstNumberInput.fill(String(first));
    await this.secondNumberInput.fill(String(second));
  }

  /**
     * Verify the calculation result
     */
  async verifyResult(): Promise<string> {
    await this.resultValue.waitFor({ state: 'visible' });
    return await this.resultValue.textContent() || '';
  }

  /**
       * Check if form validation error is displayed for a specific field
       * @param fieldName The name of the field to check
       * @returns True if validation error is displayed, false otherwise
       */
  async hasValidationError(fieldName: string): Promise<boolean> {
    const field = this.page.locator(`#${fieldName}`);
    return await field.evaluate((el: HTMLInputElement) => el.validity.valid === false);
  }

  /**
       * Get validation message for a field
       * @param fieldName The name of the field
       * @returns The validation message
       */
  async getValidationMessage(fieldName: string): Promise<string> {
    const field = this.page.locator(`#${fieldName}`);
    return await field.evaluate((el: HTMLInputElement) => el.validationMessage);
  }
} 