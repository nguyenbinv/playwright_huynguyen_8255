import { test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboard-main-page';
import LoginPage from '../pages/login-page';
import BrowserUlts from '../utilities/browser-ults';
import Dialog from '../elements/dialog';

test.beforeEach('Init browser and navigate to TA Dashboard', async ({ page }) => {
  const browserUlt = new BrowserUlts(page);
  browserUlt.navigateTo('/TADashboard/login.jsp');
});

test('DA_LOGIN_TC001: Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  loginPage.login('administrator', '');

  const dashboardMainPage = new DashboardMainPage(page);
  await dashboardMainPage.displays();
})

test('DA_LOGIN_TC002: Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('abc', 'abc');

  const alert = new Dialog(page);
  await alert.verifyDialogMessage('Username or password is invalid');
})
