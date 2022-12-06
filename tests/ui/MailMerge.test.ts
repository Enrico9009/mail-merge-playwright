import test from '@lib/BaseTest';
import LoginData from '@data/loginData.json';
import GSheetData from '@data/gSheetData.json';

test.describe(`Mail Merge Test`, async () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToUrl();
  });

  test(`@UI Mail Merge Test`, async ({ loginPage, spreadSheetsPage }) => {
    await test.step(`Login with ${LoginData.email} / ${LoginData.password}`, async () => {
      await loginPage.loginWithValidCredentials(
        LoginData.email,
        LoginData.password
      );
    });

    await test.step(`Verify user on the SpreadSheets Page`, async () => {
      await spreadSheetsPage.verifySpreadSheetPageIsDisplayed();
    });

    await test.step(`Open the Spreadsheet`, async () => {
      await spreadSheetsPage.openGSheetByName(GSheetData.gSheetName);
    });

    await test.step(`Open Yamm Add-on and start mail merge`, async () => {
      await spreadSheetsPage.openExtensionMenu();
      await spreadSheetsPage.clickStartMailMerge();
    });

    await test.step(`Send and verify mail is sent successfully`, async () => {
      await spreadSheetsPage.sendMergedEmail();
      await spreadSheetsPage.verifyEmailSentSuccessfully();
      await spreadSheetsPage.verifyExcelSheetUpdated();
    });
  });
});
