import { Locator, Page, expect } from "@playwright/test"

export default class LoginPage {
    private readonly repositoryCbx: Locator;
    private readonly usernameTxt: Locator;
    private readonly passwordTxt: Locator;
    private readonly loginBtn: Locator;

    constructor(private readonly page: Page) {
        this.repositoryCbx = page.locator('xpath = //select[@id = "repository"]');
        this.usernameTxt = page.locator('xpath = //input[@id = "username"]');
        this.passwordTxt = page.locator('xpath = //input[@id = "password"]');
        this.loginBtn = page.locator('.btn-login');
    }

    // #region getter
    public getRepositoryCbx(): Locator {
        return this.repositoryCbx;
    }

    public getUsernameTxt(): Locator {
        return this.usernameTxt;
    }

    public getPasswordTxt(): Locator {
        return this.passwordTxt;
    }

    public getLoginBtn(): Locator {
        return this.loginBtn;
    }
    // #endregion

    // #region action methods
    async login(username: string, password: string, repository?: string): Promise<void> {
        if (repository != null && repository != undefined) {
            await this.repositoryCbx.selectOption(repository);
        }
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
        await this.loginBtn.click();
    }
    // #endregion

    // #region validation methods
    async displays(): Promise<void> {
        expect((this.repositoryCbx).and(this.usernameTxt).and(this.passwordTxt).and(this.loginBtn).isVisible());
    }
    // #endregion
}
