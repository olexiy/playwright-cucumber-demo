import { Page } from '@playwright/test';

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param url The URL to navigate to
     */
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Wait for page to be in a ready state
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get page title
     * @returns The page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Take a screenshot
     * @param name Name of the screenshot
     */
    async takeScreenshot(name: string): Promise<Buffer> {
        return await this.page.screenshot({ path: `./screenshots/${name}.png`, fullPage: true });
    }
} 