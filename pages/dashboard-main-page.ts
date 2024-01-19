import { Locator, Page, expect } from "@playwright/test"
import Alerts from "../elements/dialog";

export default class DashboardMainPage {
    private readonly profileLabel: Locator;
    private readonly globalSettingBtn: Locator;
    private readonly deletePageBtn: Locator;
    private readonly administerlnk: Locator;

    constructor(private readonly page: Page) {
        this.profileLabel = page.locator('//a[@href="#Welcome"]');

        this.globalSettingBtn = page.locator('li').filter({ hasText: 'Global Setting Add Page' }).getByRole('link').first();
        this.deletePageBtn = page.getByRole('link', { name: 'Delete' });

        this.administerlnk = page.locator('xpath = //a[@href="#Administer"]');
    }

    // #region getter
    public getProfileLabel(): Locator {
        return this.profileLabel;
    }

    public get getAdministerlnk(): Locator {
        return this.administerlnk;
    }

    public get getDeletePageBtn(): Locator {
        return this.deletePageBtn;
    }

    public get getGlobalSettingBtn(): Locator {
        return this.globalSettingBtn;
    }
    // #endregion

    // #region action methods
    async clickAdministratorActionLink(action: string): Promise<void> {
        await this.profileLabel.hover();
        await this.page.locator('xpath = //a[@href="#Welcome"]/..//a[text() = "%action"]'.replace("%action", action)).click();
    }

    async clickGlobalSettingActionLink(action: string): Promise<void> {
        await this.globalSettingBtn.hover();
        await this.page.locator('xpath = //li[@class="mn-setting"]//a[text() = "%action"]'.replace("%action", action)).click();
    }

    async clickAdministerActionLink(action: string): Promise<void> {
        await this.administerlnk.hover();
        await this.page.locator('xpath = //a[@href="#Administer"]/..//a[text() = "%action"]'.replace("%action", action)).click();
    }

    async clickOnPage(pageName: string): Promise<void> {
        await (this.page.locator('xpath = //div[@id="main-menu"]//a[text()="%s"]'.replace("%s", pageName))).click();
    }

    async hoverOnPage(pageName: string): Promise<void> {
        await (this.page.locator('xpath = //div[@id="main-menu"]//a[text()="%s"]'.replace("%s", pageName))).hover();
    }

    async deletePage(...dataString: string[]): Promise<void> {
        for (let index = 0; index < dataString.length; index++) {
            if (dataString[index] != dataString[dataString.length - 1]) {
                await this.hoverOnPage(dataString[index]);
            } else {
                await this.clickOnPage(dataString[index]);
                await this.clickGlobalSettingActionLink("Delete");
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

    async verifyPageDoesNotDisplay(pageName: string): Promise<void> {
        await expect(this.page.getByRole('link', { name: pageName })).not.toBeVisible();
    }

    async verifyGlobalSettingActionDoesNotDisplay(action: string): Promise<void> {
        await this.globalSettingBtn.hover();
        await expect(this.page.locator('xpath = //a[@class="%s"]'.replace("%s", action))).not.toBeVisible();
    }
    // #endregion
}
