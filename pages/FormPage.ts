import { Locator } from '@playwright/test';
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

    constructor(page) {
        super(page);

        // Initialize locators
        this.form = page.locator('form');
        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#email');
        this.messageInput = page.locator('#message');
        this.submitButton = page.locator('button[type="submit"]');
        this.resultMessage = page.locator('.result-message');
    }

    /**
     * Navigate to the form page
     */
    async goto(): Promise<void> {
        await this.navigate(this.baseUrl);
        await this.waitForPageLoad();
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
     * Submit the form
     */
    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

    /**
     * Fill and submit the form in one action
     * @param name The name to fill in
     * @param email The email to fill in
     * @param message The message to fill in
     */
    async fillAndSubmitForm(name: string, email: string, message: string): Promise<void> {
        await this.fillForm(name, email, message);
        await this.submitForm();
    }

    /**
     * Get the result message after form submission
     * @returns The text content of the result message
     */
    async getResultMessage(): Promise<string> {
        await this.resultMessage.waitFor({ state: 'visible' });
        return await this.resultMessage.textContent() || '';
    }

    /**
     * Check if form validation error is displayed for a specific field
     * @param fieldName The name of the field to check
     * @returns True if validation error is displayed, false otherwise
     */
    async hasValidationError(fieldName: string): Promise<boolean> {
        const field = this.page.locator(`#${fieldName}`);
        return await field.evaluate(el => el.validity.valid === false);
    }

    /**
     * Get validation message for a field
     * @param fieldName The name of the field
     * @returns The validation message
     */
    async getValidationMessage(fieldName: string): Promise<string> {
        const field = this.page.locator(`#${fieldName}`);
        return await field.evaluate(el => el.validationMessage);
    }
} 