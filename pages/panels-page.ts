import { Locator, Page, expect } from "@playwright/test";

export default class PannelPage {
    private readonly addNewPannelModal: Locator;
    private readonly overlaydiv: Locator;
    private readonly addNewPannelLink: Locator;

    constructor(private readonly page: Page) {
        this.addNewPannelModal = page.locator('xpath=//div[@class="ui-dialog editpanelDlg"]');
        this.overlaydiv = page.locator('xpath=//div[@class="ui-dialog-overlay custom-overlay"]');
        this.addNewPannelLink = page.locator('xpath=//div[@class="panel_tag2"]//a').first();

    }

    // #region getter
    public getAddNewPannelModal(): Locator {
        return this.addNewPannelModal;
    }

    public getOverlaydiv(): Locator {
        return this.overlaydiv;
    }
    // #endregion

    // #region action methods
    async clickAddNew(): Promise<void> {
        await this.addNewPannelLink.click();
    }
    // #endregion

    // #region validation methods
    async verifyModelDisplay(): Promise<void> {
        await expect.soft(this.addNewPannelModal).toBeVisible();
        await expect.soft(this.overlaydiv).toBeVisible();
    }
    // #endregion
}
