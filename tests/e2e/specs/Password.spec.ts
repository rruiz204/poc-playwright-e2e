import { expect, test } from "@playwright/test";

test("recover password", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Login").click();
  await page.getByText("Ingresar").click();

  await page.locator("#Email").fill("example email");
  await page.locator("#continueWithMailButton").click();

  await page.locator("#showRememberPasswordButton").click();
  await page.locator("#sbRemember").click();

  await page.waitForTimeout(3000);
  const visible = await page.getByText("Revisa tu correo").isVisible();
  expect(visible).toBeTruthy();
});