import { Page, expect } from "@playwright/test"

export default class DashboardMainPage {
    constructor(private readonly page: Page) { }

    async displays(): Promise<void> {
        await expect(this.page.getByText('Execution Dashboard')).toBeVisible();
    }
}
