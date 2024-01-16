import { test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboard-main-page';
import LoginPage from '../pages/login-page';
import Utilities from '../utilities/utilities';
import Alerts from '../utilities/alerts';

test.beforeEach('Init browser and navigate to TA Dashboard', async ({ page }) => {
  const utility = new Utilities(page);
  await utility.navigateTo('http://localhost/TADashboard/login.jsp');
});

// test.afterEach('Logout', async ({ page }) => {
//   const dashboardMainPage = new DashboardMainPage(page);
//   await dashboardMainPage.logout();

//   const loginPage = new LoginPage(page);
//   await loginPage.displays();
// });

// test.afterAll('Close browser', async ({ page }) => {
//   page.close();
// });

// test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await loginPage.login('administrator', '');

//   const dashboardMainPage = new DashboardMainPage(page);
//   await dashboardMainPage.displays();
// })

test('Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('abc', 'abc');

  const alert = new Alerts(page);
  alert.verifyDialogMessage('Username or password is invalid');
})
