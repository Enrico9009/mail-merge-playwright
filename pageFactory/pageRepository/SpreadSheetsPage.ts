import { SpreadSheetsPageObjects } from '@objects/SpreadSheetsPageObjects';
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import gSheetData from '@data/gSheetData.json'
import { GoogleSheetUtils } from '@lib/GoogleSheetUtils';

let spreadSheetsPageObject: SpreadSheetsPageObjects;
let gSheetUtil: GoogleSheetUtils

export class SpreadSheetsPage extends BasePage {
  constructor(page: Page) {
    super(page);

    spreadSheetsPageObject = new SpreadSheetsPageObjects();
    gSheetUtil = new GoogleSheetUtils();
  }

  async verifySpreadSheetPageIsDisplayed(): Promise<void> {
    let headerText = await this.webActions.getTextFromWebElement(spreadSheetsPageObject.Header);

    expect(headerText, "Start a new spreadsheet");
  }

  async openGSheetByName(name:string) {
    await this.webActions.clickElement(`//div[@title="${name}"]`)
  }

  async openExtensionMenu() {
    await this.webActions.delay(6000);
    await this.webActions.clickElement(spreadSheetsPageObject.ExtensionMenu);
  }

  async clickStartMailMerge() {
    await this.webActions.delay(4000);
    await this.webActions.waitForElementAttached(spreadSheetsPageObject.YammExtension);
    await this.webActions.hoverElement(spreadSheetsPageObject.YammExtension);
    await this.webActions.clickElement(spreadSheetsPageObject.StartMailMerge);

    await this.webActions.delay(8000)
  }

  async sendMergedEmail() {
    const firstFrame = this.page.frameLocator("//iframe[contains(@src,'M2AdHvdLTmzKIrz5sjtXqguVJ5jnXUK_T')]");
    const secondFrame = firstFrame.frameLocator("#sandboxFrame")
    const mainFrame = secondFrame.frameLocator("#userHtmlFrame")

    await mainFrame.locator(spreadSheetsPageObject.SendEmail).click();
  }

  async verifyEmailSentSuccessfully() {

    const firstFrame = this.page.frameLocator("//iframe[contains(@src,'M2AdHvdLTmzKIrz5sjtXqguVJ5jnXUK_T')]");
    const secondFrame = firstFrame.frameLocator("#sandboxFrame")
    const mainFrame = secondFrame.frameLocator("#userHtmlFrame")

    let messageLocator = mainFrame.locator(spreadSheetsPageObject.SuccessMessage)

    expect(messageLocator).toHaveText(gSheetData.successMessage, {timeout: 20000})
  }

  async verifyExcelSheetUpdated() {
    let data = await gSheetUtil.readExcel();
    let mergeStatus = data[1][8];

    let retryTime = 0;
    while(mergeStatus == undefined) {
      console.log("Got undefined, retrying getting data..")
      data = await gSheetUtil.readExcel();
      mergeStatus = data[1][8];

      retryTime++;
      console.log("Retried: " + retryTime)

      if(retryTime >= 1000) {
        console.log("Exceeded retries limit: " + retryTime)
        break;
      }
    }

    console.log("mergeStatus: " + mergeStatus)

    expect(mergeStatus).toBe("EMAIL_SENT");
  }

  async resetMergeStatus() {
    await gSheetUtil.writeExcel();
  }
}
