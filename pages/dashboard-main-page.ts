import { Locator, Page, expect } from "@playwright/test"

export default class DashboardMainPage {
    constructor(private readonly page: Page) { }

    // update xpath
    readonly logoutBtn: Locator = this.page.locator('xpath = //input[@id = "username"]');

    async logout(): Promise<void> {
        await this.logoutBtn.click();
    }

    async displays(): Promise<void> {
        await expect(this.page.getByText('Execution Dashboard')).toBeVisible();
    }
}
