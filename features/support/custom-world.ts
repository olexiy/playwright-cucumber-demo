import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

export interface ICustomWorld extends World {
    browser?: Browser;
    context?: BrowserContext;
    page?: Page;
}

export class CustomWorld extends World implements ICustomWorld {
    browser?: Browser;
    context?: BrowserContext;
    page?: Page;
}

setWorldConstructor(CustomWorld); 