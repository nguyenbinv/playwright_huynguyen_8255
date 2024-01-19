import { test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboard-main-page';
import LoginPage from '../pages/login-page';
import BrowserUlts from '../utilities/browser-ults';
import Dialog from '../elements/dialog';
import AddNewpagePage from '../pages/add-newpage-page';
import Ults from '../utilities/ults';
import { TIMEOUT } from 'dns';

const ult = new Ults();
let pageName: string;

test.beforeEach('Init browser, navigate to TA Dashboard and login', async ({ page }) => {
    pageName = ult.stringGenerator(7);

    const browserUlt = new BrowserUlts(page);
    browserUlt.navigateTo('http://localhost/TADashboard/login.jsp');

    const loginPage = new LoginPage(page);
    await loginPage.login('administrator', '');

    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();
});

test('DA_MP_TC014: Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.clickGlobalSettingActionLink("Add Page");

    const addNewpagePage = new AddNewpagePage(page);
    await addNewpagePage.addNewPage(pageName);

    await dashboardMainPage.verifyPageDisplays(pageName);

    //Delete newly added page
    const alert = new Dialog(page);
    await alert.verifyDialogMessage('Are you sure you want to remove this page?');

    await dashboardMainPage.deletePage(pageName);
})

test('DA_MP_TC017: Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children page under it', async ({ page }) => {
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.clickGlobalSettingActionLink("Add Page");

    const addNewpagePage = new AddNewpagePage(page);
    await addNewpagePage.addNewPage(pageName);

    await dashboardMainPage.clickGlobalSettingActionLink("Add Page");

    const childPageName = ult.stringGenerator(7);
    await addNewpagePage.addNewPage(childPageName, pageName);

    const doubleDialog = new Dialog(page);
    await doubleDialog.verifyDialogMessage('Are you sure you want to remove this page?', 'Cannot delete page \'' + pageName + '\' since it has child page(s).');
    await dashboardMainPage.deletePage(pageName);

    const singleDialog1 = new Dialog(page);
    await singleDialog1.verifyDialogMessage('Are you sure you want to remove this page?');
    await dashboardMainPage.deletePage(pageName, childPageName);

    await dashboardMainPage.verifyPageDoesNotDisplay(childPageName);

    const singleDialog2 = new Dialog(page);
    await singleDialog2.verifyDialogMessage('Are you sure you want to remove this page?');
    await dashboardMainPage.deletePage(pageName);

    await dashboardMainPage.verifyPageDoesNotDisplay(pageName);

    await dashboardMainPage.clickOnPage('Overview');
    await dashboardMainPage.verifyGlobalSettingActionDoesNotDisplay('delete');
})
