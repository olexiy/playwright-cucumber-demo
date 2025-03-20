import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage, TodoPage, FormPage } from '../../pages';

export interface ICustomWorld extends World {
    browser?: Browser;
    context?: BrowserContext;
    page?: Page;
    basePage?: BasePage;
    todoPage?: TodoPage;
    formPage?: FormPage;
}

export class CustomWorld extends World implements ICustomWorld {
    browser?: Browser;
    context?: BrowserContext;
    page?: Page;
    basePage?: BasePage;
    todoPage?: TodoPage;
    formPage?: FormPage;

    // Initialize page objects when page is set
    initPageObjects() {
        if (this.page) {
            this.basePage = new BasePage(this.page);
            this.todoPage = new TodoPage(this.page);
            this.formPage = new FormPage(this.page);
        }
    }
}

setWorldConstructor(CustomWorld); 