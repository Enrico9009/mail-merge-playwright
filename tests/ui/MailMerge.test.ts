import test from '@lib/BaseTest';
import LoginData from '@data/loginData.json';

test.describe(`Mail Merge Test`, async () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToUrl();
  });
  test(`@UI Mail Merge Test`, async ({ loginPage }) => {
    await test.step(`Login with ${LoginData.email} / ${LoginData.password}`, async () => {
      await loginPage.loginWithValidCredentials(LoginData.email, LoginData.password);
    });
  });
});
