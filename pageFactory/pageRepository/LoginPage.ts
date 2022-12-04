import { Page } from "@playwright/test"
import { LoginPageObjects } from "@objects/LoginPageObjects"
import { BasePage } from "./BasePage"

let loginPageObjects: LoginPageObjects

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page)

        loginPageObjects = new LoginPageObjects()
    }

    async enterEmail(email: string):Promise<void> {
        await this.webActions.enterElementText(loginPageObjects.EmailInput, email)
    }

    async clickNextButtonEmail():Promise<void> {
        await this.webActions.clickElement(loginPageObjects.NextBtnEmail)
    }

    async enterPassword(password: string):Promise<void> {
        await this.webActions.enterElementText(loginPageObjects.PasswordInput, password)
    }

    async clickNextButtonPassword():Promise<void> {
        await this.webActions.clickElement(loginPageObjects.NextBtnPassword)
    }

    async loginWithValidCredentials(email:string, pass:string) :Promise<any>{
        await this.enterEmail(email);
        await this.clickNextButtonEmail();
        await this.enterPassword(pass);
        await this.clickNextButtonPassword();
    }
}