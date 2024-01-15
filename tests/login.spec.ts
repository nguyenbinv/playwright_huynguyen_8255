import { test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboard-main-page';
import LoginPage from '../pages/login-page';
import Utilities from '../utilities/utilities';

test.beforeEach('Init browser and navigate to TA Dashboard', async ({ page }) => {
  const utility = new Utilities(page);
  await utility.navigateTo('http://localhost/TADashboard/login.jsp');
});

test.afterEach('Close browser', async ({ page }) => {
  page.close();
});

test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('administrator', '');

  const dashboardMainPage = new DashboardMainPage(page);
  await dashboardMainPage.displays();
})
