import { expect, test } from "@playwright/test";

test("successful login", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Login").click();
  await page.getByText("Ingresar").click();

  await page.locator("#Email").fill("example email");
  await page.locator("#continueWithMailButton").click();

  await page.locator("#password").fill("example password");
  await page.locator("#btnSubmitPass").click();

  await page.waitForSelector(".info_user", { timeout: 10000 });
  const user = await page.getByText("example user").textContent();
  expect(user).toEqual("example user");
});

test("failed login", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Login").click();
  await page.getByText("Ingresar").click();

  await page.locator("#Email").fill("example email");
  await page.locator("#continueWithMailButton").click();

  await page.locator("#password").fill("WR0NG P4SSW0RD");
  await page.locator("#btnSubmitPass").click();

  await page.waitForTimeout(2000);
  const visible = await page.getByText("Contraseña incorrecta").isVisible();
  expect(visible).toBeTruthy();
});