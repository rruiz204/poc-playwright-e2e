import { expect, test } from "@playwright/test";

test("apply for a job with cv", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Login").click();
  await page.getByText("Ingresar").click();

  await page.locator("#Email").fill("example email");
  await page.locator("#continueWithMailButton").click();

  await page.locator("#password").fill("example password");
  await page.locator("#btnSubmitPass").click();

  await page.waitForSelector(".info_user", { timeout: 5000 });

  await page.locator("#prof-cat-search-input").fill("tienda");
  await page.locator("#place-search-input").fill("alajuela");

  await page.locator("#search-button").click();
  await page.waitForTimeout(3000);
  await page.getByText("Ahora no").click();

  const applyBtn = page.locator("span").getByText("Postularme").nth(1);

  await applyBtn.click();
  await page.waitForTimeout(3000);

  const visible = await applyBtn.isVisible();
  expect(visible).toBeFalsy();
});