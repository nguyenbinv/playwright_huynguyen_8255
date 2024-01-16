
import { Page, expect } from "@playwright/test"

export default class Alerts {
    constructor(private readonly page: Page) { }

    async verifyDialogMessage(dialogMessage: string): Promise<void> {
        this.page.on('dialog', async dialog => {
            let myPromise = new Promise(function () { expect(dialog.message()).toEqual(dialogMessage) });
            await myPromise;
            await dialog.accept('OK');
        });
    }
}
