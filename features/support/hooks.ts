import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, chromium } from '@playwright/test';
import { ICustomWorld, CustomWorld } from './custom-world';
import * as fs from 'fs';
import * as path from 'path';

let browser: Browser;
const PLAYWRIGHT_DEMO_URL = 'https://demo.playwright.dev';
const DEMOQA_URL = 'https://demoqa.com';

BeforeAll(async function () {
  // Use headless mode in CI environments
  browser = await chromium.launch({
    headless: process.env.CI === 'true' || false
  });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: CustomWorld, { pickle }) {
  // Determine baseURL based on test tags
  const tags = pickle.tags.map(tag => tag.name);
  let baseURL = PLAYWRIGHT_DEMO_URL;

  // If it's a form test, use the DemoQA URL
  if (tags.includes('@form')) {
    baseURL = DEMOQA_URL;
  }

  this.browser = browser;
  this.context = await browser.newContext({
    baseURL: baseURL
  });
  this.page = await this.context.newPage();

  // Initialize page objects
  this.initPageObjects();
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