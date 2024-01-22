import { expect, test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboard-main-page';
import LoginPage from '../pages/login-page';
import BrowserUlts from '../utilities/browser-ults';
import DataProfiles from '../pages/data-profile-page';

test.beforeEach('Init browser, navigate to TA Dashboard and login', async ({ page }) => {
    const browserUlt = new BrowserUlts(page);
    browserUlt.navigateTo('http://localhost/TADashboard/login.jsp');

    const loginPage = new LoginPage(page);
    await loginPage.login('administrator', '');

    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();
});

test('DA_DP_TC065: Verify that all Pre-set Data Profiles are populated correctly', async ({ page }) => {
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.clickAdministerActionLink("Data Profiles");

    const dataProfiles = new DataProfiles(page);
    await dataProfiles.verifyDataProfilesHasSorted("Data Profile");
})
