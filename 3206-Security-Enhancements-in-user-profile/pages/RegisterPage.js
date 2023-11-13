exports.RegisterPage = class RegisterPage {
    constructor(page) {
        this.page = page;
        this.firstName = this.page.locator("xpath=//input[@id='first_name']");
        this.lastName = this.page.locator("xpath=//input[@id='last_name']");
        this.dateOfBirth = this.page.locator('[data-test="dob"]');
        this.address = this.page.locator("xpath=//input[contains(@id,'address')]");
        this.postcode = this.page.locator("xpath=//input[contains(@id,'postcode')]");
        this.city = this.page.locator("xpath=//input[contains(@id,'city')]");
        this.country = this.page.locator("xpath=//input[@id='state']");
        this.state = this. page.locator('[data-test="country"]');
        this.phone = this.page.locator("xpath=//input[contains(@id,'phone')]");
        this.email = this.page.locator("xpath=//input[contains(@id,'email')]");
        this.password = this.page.locator("xpath=//input[contains(@id,'password')]");
        this.registerButton = this.page.locator("xpath=//button[normalize-space()='Register']");
    }

    async open(url) {
        await this.page.goto(url);
    }
    async registerUser(firstName, lastName, dateOfBirth, address, postcode, city, country, state, phone, email, password) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.dateOfBirth.fill(dateOfBirth);
        await this.address.fill(address);
        await this.postcode.fill(postcode);
        await this.city.fill(city);
        await this.country.fill(country);
        await this.state.selectOption(state);
        await this.phone.fill(phone);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.registerButton.click();

    }
    
}
