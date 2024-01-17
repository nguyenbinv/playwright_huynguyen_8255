import { Page } from "@playwright/test"

export default class BrowserUlts {
    constructor(private readonly page: Page) { }

    navigateTo(url: string): void {
        this.page.goto(url);
    }

    stringGenerator(numberOfChar: number): string {
        var randomString = require("randomstring");
        const randomStringConst = randomString.generate(numberOfChar);

        return randomStringConst;
    }
}
