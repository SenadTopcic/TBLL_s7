
exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailUser = this.page.locator("xpath=//input[contains(@id,'email')]");
        this.password = this.page.locator("xpath=//input[contains(@id,'password')]");
        this.loginButton = this.page.locator("xpath=//input[contains(@type, 'submit')]");
        this.registerLink = this.page.locator("xpath=//a[contains(@href, '#/auth/register')]");
        this.forgotYourPasswordLink = this.page.locator("xpath=//a[contains(@href, '#/auth/forgot-password')]");
    }

    async open(url) {
        await this.page.goto(url= 'https://with-bugs.practicesoftwaretesting.com/#/auth/login');
    }
    async login(email, password) {
        await this.emailUser.fill(email);
        console.log("email: " + email);
        await this.password.fill(password);
        console.log("password: " + password);
        await this.loginButton.click();
    }

    async goToRegisterPage() {
        await this.registerLink.click();
    }

    async goToForgotYourPasswordPage() {
        await this.forgotYourPasswordLink.click();
    }

}