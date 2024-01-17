
import { Locator, Page, expect } from "@playwright/test"

export default class Alerts {
    constructor(private readonly page: Page) { }

    readonly PROMPT_ALERT_BUTTON: Locator = this.page.locator('#promtButton');

    async verifyDialogMessage(dialogMessage: string): Promise<void> {
        this.page.on('dialog', async dialog => {
            dialog.accept();
            expect(dialog.message()).toEqual(dialogMessage);
            await this.PROMPT_ALERT_BUTTON.click();
        });
    }
}
