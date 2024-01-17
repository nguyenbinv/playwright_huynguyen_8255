import { Locator, Page, expect } from "@playwright/test"
import Alerts from "../elements/dialog";

export default class DashboardMainPage {
    readonly profileLabel: Locator;
    readonly logoutBtn: Locator;
    readonly globalSettingBtn: Locator;
    readonly addPageBtn: Locator;
    readonly deletePageBtn: Locator;

    constructor(private readonly page: Page) {
        this.profileLabel = page.locator('//a[@href="#Welcome"]');
        this.logoutBtn = page.locator('//a[@href="logout.do"]');
        this.globalSettingBtn = page.locator('li').filter({ hasText: 'Global Setting Add Page' }).getByRole('link').first();
        this.addPageBtn = page.getByRole('link', { name: 'Add Page' });
        this.deletePageBtn = page.getByRole('link', { name: 'Delete' });
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

    async clickAddNewpageButton(): Promise<void> {
        await this.globalSettingBtn.hover();
        await this.addPageBtn.click();
    }

    async deletePage1(pageName: string): Promise<void> {
        await (this.page.locator('xpath = //div[@id="main-menu"]//a[text()="%s"]'.replace("%s", pageName))).click();
        await this.globalSettingBtn.hover();
        await this.deletePageBtn.click();
    }

    async deletePage(...dataString: string[]): Promise<void> {
        for (let index = 0; index < dataString.length; index++) {
            if (dataString[index] != dataString[dataString.length - 1]) {
                await (this.page.locator('xpath = //div[@id="main-menu"]//a[text()="%s"]'.replace("%s", dataString[index]))).hover();
            } else {
                await (this.page.locator('xpath = //div[@id="main-menu"]//a[text()="%s"]'.replace("%s", dataString[index]))).click();
                await this.globalSettingBtn.hover();
                await this.deletePageBtn.click();
            }
        }
    }
    // #endregion

    // #region validation methods
    async displays(): Promise<void> {
        await expect(this.page.getByText('Execution Dashboard')).toBeVisible();
    }

    async verifyPageDisplays(pageName: string): Promise<void> {
        await expect(this.page.getByRole('link', { name: pageName })).toBeVisible();
    }
    // #endregion
}
