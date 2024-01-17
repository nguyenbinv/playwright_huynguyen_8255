import { Locator, Page, expect } from "@playwright/test"

export default class DashboardMainPage {
    readonly profileLabel: Locator;
    readonly logoutBtn: Locator;

    constructor(private readonly page: Page) {
        this.profileLabel = page.locator('//a[@href="#Welcome"]');
        this.logoutBtn = page.locator('//a[@href="logout.do"]');
    }

    // #region getter
    public getProfileLabel(): Locator {
        return this.profileLabel;
    }

    public getLogoutBtn(): Locator {
        return this.logoutBtn;
    }
    // #endregion

    // #region action methods
    async logout(): Promise<void> {
        await this.profileLabel.hover();
        await this.logoutBtn.click();
    }
    // #endregion

    // #region validation methods
    async displays(): Promise<void> {
        await expect(this.page.getByText('Execution Dashboard')).toBeVisible();
    }
    // #endregion
}
