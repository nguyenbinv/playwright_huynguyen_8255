
import { Locator, Page, expect } from "@playwright/test"

export default class Dialog {
    constructor(private readonly page: Page) { }

    async verifyDialogMessage(dialogMessage: string, secondDialogMessage?: string): Promise<void> {
        if(secondDialogMessage != null && secondDialogMessage != undefined){
            this.page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(dialogMessage);
                this.page.once('dialog', async dialog2 => {
                    expect(dialog2.message()).toContain(secondDialogMessage);
                    await dialog2.accept();
                });
                await dialog.accept();
            });
        }else{
            this.page.on('dialog', async dialog3 => {
                await dialog3.accept();
                expect(dialog3.message()).toContain(dialogMessage);
            });
        }
    }

    // async verifyDoubleDialogMessage(firstDialogMessage: string, secondDialogMessage: string): Promise<void> {
    //     this.page.once('dialog', async dialog => {
    //         expect(dialog.message()).toEqual(firstDialogMessage);
    //         this.page.once('dialog', async dialog2 => {
    //             expect(dialog2.message()).toContain(secondDialogMessage);
    //             await dialog2.accept();
    //         });
    //         await dialog.accept();
    //     });
    // }
}
