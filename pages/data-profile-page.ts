import { Locator, Page, expect } from "@playwright/test";

export default class DataProfiles {
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

    // async table(): Promise<void> {
    //     const textsFromNthColumn = [];
    //     const rowCount = await this.page.locator('.table-tbody').locator('tr').count();

    //     for (let i = 0; i < rowCount; i++) {
    //         textsFromNthColumn.push(await this.page.locator('.table-tbody').locator('tr').nth(i).locator('td').nth(2).innerText());
    //     }

    //     console.log(textsFromNthColumn)
    // }

    async verifyDataProfileHasSorted(): Promise<void> {
        var textsFromThirdColumn: string[] = [];
        const tableLocation = this.page.locator('xpath = //table[@class="GridView"]/tbody');
        const rowCount = await this.page.locator('xpath = //table[@class="GridView"]/tbody').locator('tr').count();

        for (let i = 1; i < rowCount-1; i++) {
            textsFromThirdColumn.push((await tableLocation.locator('tr').nth(i).locator('td').nth(1).innerText()).trim());
        }
        var textsFromThirdColumnTmp: string[] = textsFromThirdColumn.sort().slice();
        expect(textsFromThirdColumn).toEqual(textsFromThirdColumnTmp);
    }
    // #endregion

    // #region validation methods
    async verifyModelDisplay(): Promise<void> {
        await expect.soft(this.addNewPannelModal).toBeVisible();
        await expect.soft(this.overlaydiv).toBeVisible();
    }
    // #endregion
}
