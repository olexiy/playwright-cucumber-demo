import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, chromium } from '@playwright/test';
import { ICustomWorld } from './custom-world';
import * as fs from 'fs';
import * as path from 'path';

let browser: Browser;
const BASE_URL = 'https://demo.playwright.dev';

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

AfterAll(async function () {
    await browser.close();
});

Before(async function (this: ICustomWorld) {
    this.browser = browser;
    this.context = await browser.newContext({
        baseURL: BASE_URL
    });
    this.page = await this.context.newPage();
});

After(async function (this: ICustomWorld, scenario) {
    if (scenario.result?.status === Status.FAILED && this.page) {
        // Take screenshot if test fails
        const screenshotBuffer = await this.page.screenshot({
            fullPage: true,
            type: 'png'
        });

        // Attach screenshot to Cucumber report
        this.attach(screenshotBuffer, 'image/png');

        // Also save to disk for Allure reporting
        const screenshotPath = path.join('allure-results', `${scenario.pickle.id}-screenshot.png`);
        fs.writeFileSync(screenshotPath, screenshotBuffer);

        // Save page HTML for debugging
        const html = await this.page.content();
        this.attach(html, 'text/html');
    }

    await this.page?.close();
    await this.context?.close();
}); 