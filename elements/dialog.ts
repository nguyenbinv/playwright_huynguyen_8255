
import { Locator, Page, expect } from "@playwright/test"

export default class Dialog {
    constructor(private readonly page: Page) { }

    async verifyDialogMessage1(dialogMessage: string): Promise<void> {
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(dialogMessage);
            await dialog.accept('OK');
        });
    }

    async verifyDialogMessage(...dialogMessage: string[]): Promise<void> {
        for (let index = 0; index < dialogMessage.length; index++) {
            this.page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(dialogMessage[index]);
                await dialog.accept();
            });
        }
    }
}