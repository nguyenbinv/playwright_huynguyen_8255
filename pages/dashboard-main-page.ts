import { Locator, Page, expect } from "@playwright/test"

export default class DashboardMainPage {
    constructor(private readonly page: Page) { }

    readonly profileLabel: Locator = this.page.locator('//a[@href="#Welcome"]');
    readonly logoutBtn: Locator = this.page.locator('//a[@href="logout.do"]');

    async logout(): Promise<void> {
        await this.profileLabel.hover();
        await this.logoutBtn.click();
    }

    async displays(): Promise<void> {
        await expect(this.page.getByText('Execution Dashboard')).toBeVisible();
    }
}
