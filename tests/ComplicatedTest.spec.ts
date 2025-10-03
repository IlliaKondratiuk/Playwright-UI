//This class contains tests for the "Complicated" page
import { test, expect } from './fixtures'
import testData from "../test_data/general_data.json" assert { type: "json" };

test("click every second button in first section", async ({ pages }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "First Section" });
  testInfo.annotations.push({ type: "severity", description: "critical" });
  testInfo.annotations.push({ type: "issue", description: "JIRA-1234" }); // Example issue annotation

  const complicatedPage = pages.complicated();
  await complicatedPage.goto(complicatedPage.url);

  await complicatedPage.clickEverySecondButton();
});

test("check social media links", async ({ pages }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Social Media" });
  testInfo.annotations.push({ type: "severity", description: "critical" });
  testInfo.annotations.push({ type: "issue", description: "JIRA-1234" }); // Example issue annotation

  const complicatedPage = pages.complicated();
  await complicatedPage.goto(complicatedPage.url);

  await complicatedPage.clickFirstTwitterButton();
  await complicatedPage.expectUrl(/twitter.com/);

  await complicatedPage.goBack();
  await complicatedPage.clickFirstFacebookButton();
  await complicatedPage.expectUrl(/facebook.com/);
});

test("fill and submit form", async ({ pages }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Form Submission" });
  testInfo.annotations.push({ type: "severity", description: "high" });
  testInfo.annotations.push({ type: "issue", description: "JIRA-1234" }); // Example issue annotation

  const complicatedPage = pages.complicated();

  const formName = testData.complicated_form.formName;
  const formEmail = testData.complicated_form.formEmail;
  const formMessage = testData.complicated_form.formMessage;

  await complicatedPage.goto(complicatedPage.url);

  await complicatedPage.fillAndSubmitForm(formName, formEmail, formMessage);
});

test("submit empty form and check error message", async ({ pages }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Form Validation" });
  testInfo.annotations.push({ type: "severity", description: "critical" });
  testInfo.annotations.push({ type: "issue", description: "JIRA-1234" }); // Example issue annotation

  const complicatedPage = pages.complicated();
  await complicatedPage.goto(complicatedPage.url);

  await complicatedPage.click(complicatedPage.formSubmitButton);
  expect(await complicatedPage.getFailedSubmitMessageText()).toContain(
    testData.complicated_form.emptyFormSubmitMessage
  );
  expect(await complicatedPage.getFailedSubmitMissingFieldsText()).toEqual(
    [testData.complicated_form.emptyFormMissingFields].flat()
  );
});
