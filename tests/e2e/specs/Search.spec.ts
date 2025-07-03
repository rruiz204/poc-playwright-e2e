import { expect, test } from "@playwright/test";

test("search jobs by role and place", async ({ page }) => {
  await page.goto("/");

  await page.locator("#prof-cat-search-input").fill("desarrollador de software");
  await page.locator("#place-search-input").fill("san jose");

  await page.locator("#search-button").click();
  await page.waitForTimeout(1500)

  const jobs = await page.locator(".box_offer").count();
  expect(jobs).toBeGreaterThan(0);

  const places = await page.getByText("San José").count();
  expect(places).toBeGreaterThan(0);
});

test("filter jobs by jornada, salary, experience", async ({ page }) => {
  await page.goto("/");

  await page.locator("#prof-cat-search-input").fill("ventas");
  await page.locator("#place-search-input").fill("alajuela");

  await page.locator("#search-button").click();
  await page.waitForTimeout(3000);
  await page.getByText("Ahora no").click();

  await page.locator(".field_select_links").nth(3).click();
  await page.locator(".buildLink").getByText("1 año").click();

  await page.locator(".field_select_links").nth(3).click();
  await page.locator(".buildLink").getByText("Más de 300.000").click();

  await page.locator(".field_select_links").nth(3).click();
  await page.locator(".buildLink").getByText("Tiempo Completo").click();

  const jobs = await page.locator(".box_offer").count();
  expect(jobs).toBeGreaterThan(0);

  const places = await page.getByText("Alajuela").count();
  expect(places).toBeGreaterThan(0);
});