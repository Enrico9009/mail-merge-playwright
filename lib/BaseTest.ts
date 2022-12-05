import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SpreadSheetsPage } from '@pages/SpreadSheetsPage';

const test = baseTest.extend<{
  loginPage: LoginPage;
  spreadSheetsPage: SpreadSheetsPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  spreadSheetsPage: async ({ page }, use) => {
    await use(new SpreadSheetsPage(page));
  },
});

export default test;
