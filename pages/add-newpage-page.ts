import { Locator, Page, expect } from "@playwright/test"

export default class AddNewpagePage {
    readonly pageNameTxt: Locator;
    readonly parentPageCbx: Locator;
    readonly numberOfCollumnsCbx: Locator;
    readonly displayAfterCbx: Locator;
    readonly publicCb: Locator;
    readonly okBtn: Locator;
    readonly cancelBtn: Locator;

    constructor(private readonly page: Page) {
        this.pageNameTxt = page.locator('xpath = //input[@id="name"]');
        this.parentPageCbx = page.locator('xpath = //select[@id="parent"]');
        this.numberOfCollumnsCbx = page.locator('xpath = //select[@id="columnnumber"]');
        this.displayAfterCbx = page.locator('xpath = //select[@id="afterpage"]');
        this.publicCb = page.locator('xpath = //input[@id="ispublic"]');
        this.okBtn = page.locator('xpath = //input[@id="OK"]');
        this.cancelBtn = page.locator('xpath = //input[@id="Cancel"]');
    }

    // #region getter
    public getPageNameTxt(): Locator {
        return this.pageNameTxt;
    }

    public getParentPageCbx(): Locator {
        return this.parentPageCbx;
    }

    public getNumberOfCollumnsCbx(): Locator {
        return this.numberOfCollumnsCbx;
    }

    public getDisplayAfterCbx(): Locator {
        return this.displayAfterCbx;
    }

    public getPublicCb(): Locator {
        return this.publicCb;
    }

    public getOkBtn(): Locator {
        return this.okBtn;
    }

    public getCancelBtn(): Locator {
        return this.cancelBtn;
    }
    // #endregion

    async addNewPage(...dataString: any[]): Promise<void> {
        this.pageNameTxt.fill(dataString[0]);
        if (dataString[1] != null && dataString[1] != undefined) {
            this.parentPageCbx.selectOption(dataString[1]);
        }
        if (dataString[2] != null && dataString[2] != undefined) {
            this.parentPageCbx.selectOption(dataString[2]);
        }
        if (dataString[3] != null && dataString[3] != undefined) {
            this.parentPageCbx.selectOption(dataString[3]);
        }
        if (dataString[4] != null && dataString[4] != undefined && dataString[4] == 'True') {
            this.publicCb.setChecked(true);
        }
        await this.okBtn.click();
    }
    // #endregion

    // #region validation methods
    async displays(): Promise<void> {
        await expect(this.page.getByText('Execution Dashboard')).toBeVisible();
    }
    // #endregion
}
