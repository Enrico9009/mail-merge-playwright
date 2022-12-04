import { Page, expect } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import { LoginPageObjects } from "@objects/LoginPageObjects"

let webActions: WebActions
let loginPageObjects: LoginPageObjects

export class LoginPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
        webActions = new WebActions(this.page)
        loginPageObjects = new LoginPageObjects()
    }

    async navigateToUrl(): Promise<void> {
        await webActions.delay(2000)
        await webActions.navigateToURL("https://docs.google.com/spreadsheets")
    }

    async enterEmail(email: string):Promise<void> {
        await webActions.enterElementText(loginPageObjects.EmailInput, email)
    }

    async clickNextButton():Promise<void> {
        await webActions.clickElement(loginPageObjects.NextBtn)
    }

    async enterPassword(password: string):Promise<void> {
        await webActions.enterElementText(loginPageObjects.PasswordInput, password)
    }

    async loginWithValidCredentials(email:string, pass:string) :Promise<any>{
        await this.enterEmail(email);
        await this.clickNextButton();
        await this.enterPassword(pass);
        await this.clickNextButton();
    }
}