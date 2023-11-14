const { test, expect } = require("@playwright/test");
const fetchApi = require("../API/fetchApi");
const { assert } = require("console");

test("Password registered user is stored in database", async ({ page }) => {
  const apiEndpoint = "https://api-with-bugs.practicesoftwaretesting.com/users";
  const apiToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS13aXRoLWJ1Z3MucHJhY3RpY2Vzb2Z0d2FyZXRlc3RpbmcuY29tL3VzZXJzL2xvZ2luIiwiaWF0IjoxNjk5ODg3NDQwLCJleHAiOjE3MTU0ODc0NDAsIm5iZiI6MTY5OTg4NzQ0MCwianRpIjoiR0cyaTJIVzV0eG9sc0tBZCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6ImFkbWluIn0.GLi6Tr_QWoyVXtiFQHrB-LJpDMo8b-zaXaILwrBCP2k";

  const users = await fetchApi.fetchDataFromApi(apiEndpoint, apiToken);
  console.log(users);
  const plainPasswords = [
    { email: "customer@practicesoftwaretesting.com", password: "welcome01" },
    { email: "customer2@practicesoftwaretesting.com", password: "welcome01" },
    { email: "annie@test.com", password: "welcome01" },
    { email: "marko.bre@testmail.com", password: "welcome01" },
    { email: "johnchleese@mail.com", password: "Password123!" },
  ];
  for (let index = 0; index < 5; index++) {
    await expect(users[index].password).not.toEqual(plainPasswords[index].password);
  }
  page.close();
});
