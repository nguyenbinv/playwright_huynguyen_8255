import { expect, test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboard-main-page';
import LoginPage from '../pages/login-page';
import BrowserUlts from '../utilities/browser-ults';
import PannelPage from '../pages/panels-page';

test.beforeEach('Init browser, navigate to TA Dashboard and login', async ({ page }) => {
    const browserUlt = new BrowserUlts(page);
    browserUlt.navigateTo('/TADashboard/login.jsp');

    const loginPage = new LoginPage(page);
    await loginPage.login('administrator', '');

    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();
});

test('DA_PANEL_TC028: Verify that when "Add New Panel" form is on focused all other control/form is disabled or locked.', async ({ page }) => {
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.clickAdministerActionLink("Panels");

    const pannelPage = new PannelPage(page);
    await pannelPage.clickAddNew();
    await pannelPage.verifyModelDisplay();
})
