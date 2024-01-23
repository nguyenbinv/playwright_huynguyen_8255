import { Page } from "@playwright/test"

export default class BrowserUlts {
    constructor(private readonly page: Page) { }

    navigateTo(url: string): void {
        this.page.goto(url);
    }
}
