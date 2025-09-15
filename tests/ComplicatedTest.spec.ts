//This class contains tests for the "Complicated" page
import { expect, test } from "@playwright/test";
import { ComplicatedPage } from "../pages/ComplicatedPage";
import testData from "../test_data/general_data.json" assert { type: "json" };

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

test("fill and submit form", async ({ page }) => {
  const complicatedPage = new ComplicatedPage(page);

  const formName = testData.complicated_form.formName;
  const formEmail = testData.complicated_form.formEmail;
  const formMessage = testData.complicated_form.formMessage;

  await complicatedPage.goto(complicatedPage.url);

  await complicatedPage.fillAndSubmitForm(formName, formEmail, formMessage);
});

test("submit empty form and check error message", async ({ page }) => {
  const complicatedPage = new ComplicatedPage(page);
  await complicatedPage.goto(complicatedPage.url);

  await complicatedPage.click(complicatedPage.formSubmitButton);
  expect(await complicatedPage.getFailedSubmitMessageText()).toContain(
    testData.complicated_form.emptyFormSubmitMessage
  );
  expect(await complicatedPage.getFailedSubmitMissingFieldsText()).toEqual(
    [testData.complicated_form.emptyFormMissingFields].flat()
  );
});
