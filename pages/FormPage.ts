import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class FormPage extends BasePage {
    // URL
    readonly baseUrl = 'https://demoqa.com/text-box';

    // Locators
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly currentAddressInput: Locator;
    readonly permanentAddressInput: Locator;
    readonly submitButton: Locator;
    readonly form: Locator;
    readonly outputName: Locator;
    readonly outputEmail: Locator;
    readonly outputCurrentAddress: Locator;
    readonly outputPermanentAddress: Locator;
    readonly outputBox: Locator;

    constructor(page: Page) {
        super(page);

        // Initialize locators
        this.form = page.locator('#userForm');
        this.fullNameInput = page.locator('#userName');
        this.emailInput = page.locator('#userEmail');
        this.currentAddressInput = page.locator('#currentAddress');
        this.permanentAddressInput = page.locator('#permanentAddress');
        this.submitButton = page.locator('#submit');
        this.outputBox = page.locator('#output');
        this.outputName = page.locator('#output #name');
        this.outputEmail = page.locator('#output #email');
        this.outputCurrentAddress = page.locator('#output #currentAddress');
        this.outputPermanentAddress = page.locator('#output #permanentAddress');
    }

    /**
     * Navigate to the form page
     */
    async navigate(url = this.baseUrl): Promise<void> {
        await this.page.goto(url);
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
     */
    async fillForm(fullName: string, email: string, currentAddress: string, permanentAddress: string): Promise<void> {
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.currentAddressInput.fill(currentAddress);
        await this.permanentAddressInput.fill(permanentAddress);
    }

    /**
     * Fill only the name input
     */
    async fillFullName(name: string): Promise<void> {
        await this.fullNameInput.fill(name);
    }

    /**
     * Fill only the email input
     */
    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    /**
     * Fill only the current address input
     */
    async fillCurrentAddress(address: string): Promise<void> {
        await this.currentAddressInput.fill(address);
    }

    /**
     * Fill only the permanent address input
     */
    async fillPermanentAddress(address: string): Promise<void> {
        await this.permanentAddressInput.fill(address);
    }

    /**
     * Submit the form
     */
    async submitForm(): Promise<void> {
        await this.submitButton.click();
        // Small delay to allow the output to render
        await this.page.waitForTimeout(500);
    }

    /**
     * Verify that output is displayed
     */
    async verifyOutputIsVisible(): Promise<boolean> {
        return await this.outputBox.isVisible();
    }

    /**
     * Get the output name text
     */
    async getOutputName(): Promise<string> {
        const content = await this.outputName.textContent();
        return content ? content.replace('Name:', '').trim() : '';
    }

    /**
     * Get the output email text
     */
    async getOutputEmail(): Promise<string> {
        const content = await this.outputEmail.textContent();
        return content ? content.replace('Email:', '').trim() : '';
    }

    /**
     * Get the output current address text
     */
    async getOutputCurrentAddress(): Promise<string> {
        const content = await this.outputCurrentAddress.textContent();
        return content ? content.replace('Current Address :', '').trim() : '';
    }

    /**
     * Get the output permanent address text
     */
    async getOutputPermanentAddress(): Promise<string> {
        const content = await this.outputPermanentAddress.textContent();
        return content ? content.replace('Permananet Address :', '').trim() : '';
    }

    /**
     * Check if email input has validation error
     */
    async hasEmailValidationError(): Promise<boolean> {
        const className = await this.emailInput.getAttribute('class');
        return className ? className.includes('field-error') : false;
    }
} 