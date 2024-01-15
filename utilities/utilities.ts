import { Page } from "@playwright/test"

export default class Utilities {
    constructor(private readonly page: Page) { }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }
}
