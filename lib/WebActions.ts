import { test, Page, expect } from '@playwright/test';
import { testConfig } from '../testConfig';
import path from 'path';
const waitForElement = testConfig.waitForElement;

export class WebActions {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateToURL(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async waitForElementAttached(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'attached' });
  }

  async waitForElementVisible(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }

  async verifyElementIsDisplayed(
    selector: string,
    errorMessage: string
  ): Promise<void> {
    await this.page
      .locator(selector)
      .waitFor({ state: 'visible', timeout: waitForElement })
      .catch(() => {
        throw new Error(`${errorMessage}`);
      });
  }

  async clickElement(selector: string): Promise<void>;
  async clickElement(selector: string, options: object): Promise<void>;

  async clickElement(selector: string, options?: object): Promise<void> {
    await this.waitForElementVisible(selector);
    await this.page.click(selector, options ?? {});
  }

  async clickAndHoldElement(selector: string): Promise<void> {
    await this.waitForElementAttached(selector);
    await this.page.click(selector, {
      delay: 5000,
    });
  }

  async downloadFile(selector: string): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent(`download`),
      this.page.click(selector),
    ]);
    await download.saveAs(
      path.join(__dirname, `../Downloads`, download.suggestedFilename())
    );
    return download.suggestedFilename();
  }

  async keyPress(selector: string, key: string): Promise<void> {
    this.page.press(selector, key);
  }

  async getBGColorCode(selector: string): Promise<string> {
    await this.waitForElementAttached(selector);
    const color = await this.page.locator(selector).evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('background-color');
    });
    return color;
  }

  async enterElementText(selector: string, text: string): Promise<void> {
    await this.waitForElementAttached(selector);
    await this.page.fill(selector, '');
    await this.page.fill(selector, text);
  }

  async typeElementText(selector: string, text: string): Promise<void> {
    await this.waitForElementAttached(selector);
    await this.page.type(selector, text);
  }

  async clearInputField(selector: string): Promise<void> {
    await this.waitForElementAttached(selector);
    await this.page.fill(selector, '');
  }

  async selectDropDownByLabel(selector: string, label: string): Promise<void> {
    await this.waitForElementAttached(selector);
    await this.page.selectOption(selector, { label: label });
  }

  async selectDropDownByIndex(selector: string, index: number): Promise<void> {
    await this.waitForElementAttached(selector);
    await this.page.selectOption(selector, { index: index });
  }

  async selectDropDownByValue(selector: string, value: string): Promise<void> {
    await this.waitForElementAttached(selector);
    await this.page.selectOption(selector, { value: value });
  }

  async dragAndDrop(
    dragElementLocator: string,
    dropElementLocator: string
  ): Promise<void> {
    await this.waitForElementAttached(dragElementLocator);
    await this.waitForElementAttached(dropElementLocator);
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }

  async getTextFromWebElement(selector: string): Promise<string> {
    await this.waitForElementAttached(selector);
    return (await this.page.locator(selector).textContent()).trim();
  }

  async getTextFromWebElements(selector: string): Promise<string[]> {
    await this.waitForElementAttached(selector);
    return this.page.$$eval(selector, (elements) =>
      elements.map((item) => item.textContent.trim())
    );
  }

  async checkElement(selector: string): Promise<void> {
    await this.waitForElementAttached(selector);
    return this.page.check(selector);
  }

  async uncheckElement(selector: string): Promise<void> {
    await this.waitForElementAttached(selector);
    return this.page.uncheck(selector);
  }

  async verifyElementAttribute(
    selector: string,
    attribute: string,
    value: string
  ): Promise<void> {
    await this.waitForElementAttached(selector);
    const textValue = await this.page.getAttribute(selector, attribute);
    expect(textValue.trim()).toBe(value);
  }

  async verifyElementText(selector: string, text: string): Promise<void> {
    await this.waitForElementAttached(selector);
    const textValue = await this.page.textContent(selector);
    expect(textValue.trim()).toBe(text);
  }

  async verifyElementContainsText(
    selector: string,
    text: string
  ): Promise<void> {
    await this.waitForElementAttached(selector);
    await expect(this.page.locator(selector)).toContainText(text);
  }

  async verifyByUrl(url: string): Promise<void> {
    let currentUrl = this.page.url();
    expect(currentUrl).toMatch(new RegExp(url));
  }

  async uploadFile(selector: string, imagePath: string): Promise<any> {
    this.page.on('filechooser', async (filechooser) => {
      await filechooser.setFiles([imagePath]);
    });
    await this.clickElement(selector);
  }

  async hoverElement(selector: string): Promise<void> {
    await this.waitForElementAttached(selector);
    await this.waitForElementVisible(selector);
    await this.page.hover(selector);
  }
}
