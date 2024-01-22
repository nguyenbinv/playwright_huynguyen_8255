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

    async verifyDataProfilesHasSorted(headerName: string): Promise<void> {
        var textsFromThirdColumn: string[] = [];
        const tableLocation = this.page.locator('xpath = //table[@class="GridView"]/tbody');
        const rowCount = await tableLocation.locator('tr').count();

        for (let i = 2; i < rowCount; i++) {
            textsFromThirdColumn.push(await this.page.locator('xpath = //table[@class="GridView"]/tbody/tr[%rowNumber]/td[count(//th[text()="%headerName"]/preceding-sibling::*)+1]'
                .replace("%rowNumber", i.toString())
                .replace("%headerName", headerName))
                .innerText());
        }
        var textsFromThirdColumnTmp: string[] = textsFromThirdColumn.sort().slice();
        console.log(textsFromThirdColumnTmp);
        console.log(textsFromThirdColumn);
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
