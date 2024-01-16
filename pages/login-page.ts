import { Locator, Page, expect } from "@playwright/test"

export default class LoginPage {
    constructor(private readonly page: Page) { }

    readonly repositoryCbx: Locator = this.page.locator('xpath = //select[@id = "repository"]');
    readonly usernameTxt: Locator = this.page.locator('xpath = //input[@id = "username"]');
    readonly passwordTxt: Locator = this.page.locator('xpath = //input[@id = "password"]');
    readonly loginBtn: Locator = this.page.locator('xpath = //div[@class = "btn-login"]');

    async login(username: string, password: string, repository?: string): Promise<void> {
        if (repository != null && repository != undefined) {
            await this.repositoryCbx.selectOption(repository);
        }
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
        await this.loginBtn.click();
    }

    async displays(): Promise<void> {
        expect((this.repositoryCbx).and(this.usernameTxt).and(this.passwordTxt).and(this.loginBtn).isVisible());
    }
}
