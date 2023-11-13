// @ts-check
const { test, expect } = require("@playwright/test");
const fetchApi = require("../API/fetchApi");
const { LoginPage } = require("../pages/LoginPage");
const { RegisterPage } = require("../pages/RegisterPage");

test("Register user and login to site ", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open(
    "https://with-bugs.practicesoftwaretesting.com/#/auth/login"
  );
  await loginPage.registerLink.click();

  const registerPage = new RegisterPage(page);
  await registerPage.registerUser(
    "John",
    "Cleese",
    "1939-10-27",
    "123 Cambridge St",
    "12345",
    "London",
    "england",
    "GB",
    "1234567890",
    "johnchleese@mail.com",
    "Password123!"
  );

  await loginPage.open();
  await loginPage.login("johnchleese@mail.com", "Password123!");
  await expect(page).toHaveURL(
    "https://with-bugs.practicesoftwaretesting.com/#/account"
  );
  await page.close();
});

test("Password registered user is stored in database", async ({ page }) => {
  const apiEndpoint = "https://api-with-bugs.practicesoftwaretesting.com/users";
  const apiToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS13aXRoLWJ1Z3MucHJhY3RpY2Vzb2Z0d2FyZXRlc3RpbmcuY29tL3VzZXJzL2xvZ2luIiwiaWF0IjoxNjk5ODg3NDQwLCJleHAiOjE3MTU0ODc0NDAsIm5iZiI6MTY5OTg4NzQ0MCwianRpIjoiR0cyaTJIVzV0eG9sc0tBZCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6ImFkbWluIn0.GLi6Tr_QWoyVXtiFQHrB-LJpDMo8b-zaXaILwrBCP2k";

  const userToFind = "johnchleese@mail.com";
  const expectedPassword =
    "$2y$10$.HbRS9AN3Ur/L0GK3z7gYeBlJJ8nlovbf7lk0e0CwSa30S0dQaFsO";

  const actualPassword = fetchApi.findUserPassword(
    apiEndpoint,
    apiToken,
    userToFind
  );
  await expect(actualPassword).resolves.toEqual(expectedPassword);
  console.log("actual" + (await actualPassword));
  console.log(expectedPassword);
});
