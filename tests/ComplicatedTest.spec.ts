//This class contains tests for the "Complicated" page
import { expect, test } from "@playwright/test";
import { ComplicatedPage } from "../pages/ComplicatedPage";

test("click every second button in first section", async ({ page }) => {
  const complicatedPage = new ComplicatedPage(page);
  await complicatedPage.goto(complicatedPage.url);

  await complicatedPage.clickEverySecondButton();
});

test("check social media links", async ({ page }) => {
  const complicatedPage = new ComplicatedPage(page);
  await complicatedPage.goto(complicatedPage.url);

  await complicatedPage.clickFirstTwitterButton();
  await expect(page).toHaveURL(/x.com/, { timeout: 5000 });

  await page.goBack();
  await complicatedPage.clickFirstFacebookButton();
  await expect(page).toHaveURL(/facebook.com/, { timeout: 5000 });
});
