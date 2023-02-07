import { Page } from "@playwright/test"
import { WebActions } from "@lib/WebActions"

export class BasePage {

    page: Page
    webActions: WebActions

    constructor(page: Page) {
        this.page = page
        this.webActions = new WebActions(this.page)
    }

    async navigateToUrl(): Promise<void> {
        await this.webActions.delay(2000)
        await this.webActions.navigateToURL("https://docs.google.com/spreadsheets")
    }
}