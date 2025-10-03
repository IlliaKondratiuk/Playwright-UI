import { test, expect } from './fixtures'
import testData from "../test_data/general_data.json" assert { type: "json" };

test("cycle all sprints on the page", async ({ pages }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Sprint Lifecycle" });
  testInfo.annotations.push({ type: "severity", description: "critical" });
  testInfo.annotations.push({ type: "issue", description: "JIRA-1234" }); // Example issue annotation

  const sprintPage = pages.sprint();

  const formFirstNames = testData.sprint_lifecycle.firstNames;
  const formLastNames = testData.sprint_lifecycle.lastNames;
  const genderButtonValues = testData.sprint_lifecycle.genderButtonValues;

  await sprintPage.goto(sprintPage.url);

  await sprintPage.fillFirstName(formFirstNames[0]);
  expect.soft(await sprintPage.isSubmitVisible()).toBeTruthy();
  await sprintPage.clickNextSprintButton();
  await sprintPage.expectUrl(/sprint-2/);

  await sprintPage.fillFirstName(formFirstNames[0]);
  await sprintPage.fillLastName(formLastNames[0]);
  expect.soft(await sprintPage.isSubmitVisible()).toBeTruthy();
  await sprintPage.clickNextSprintButton();
  await sprintPage.expectUrl(/sprint-3/);

  await sprintPage.fillFirstName(formFirstNames[0]);
  await sprintPage.fillLastName(formLastNames[0]);
  await sprintPage.selectGenderByValue(genderButtonValues[0]);
  expect.soft(await sprintPage.isSubmitVisible()).toBeTruthy();
  await sprintPage.clickNextSprintButton();
  await sprintPage.expectUrl(/sprint-4/);

  await sprintPage.fillFirstNameByIndex(formFirstNames[0], 0);
  await sprintPage.fillLastNameByIndex(formLastNames[0], 0);
  await sprintPage.selectGenderByValueAndIndex(genderButtonValues[0], 0);
  await sprintPage.fillFirstNameByIndex(formFirstNames[1], 1);
  await sprintPage.fillLastNameByIndex(formLastNames[1], 1);
  await sprintPage.selectGenderByValueAndIndex(genderButtonValues[1], 1);
  expect.soft(await sprintPage.isSubmitVisible()).toBeTruthy();
  await sprintPage.clickNextSprintButton();
  await sprintPage.expectUrl(/sprint-5/);

  await sprintPage.fillFirstNameByIndex(formFirstNames[0], 0);
  await sprintPage.fillLastNameByIndex(formLastNames[0], 0);
  await sprintPage.selectGenderByValueAndIndex(genderButtonValues[0], 0);
  await sprintPage.fillFirstNameByIndex(formFirstNames[1], 1);
  await sprintPage.fillLastNameByIndex(formLastNames[1], 1);
  await sprintPage.selectGenderByValueAndIndex(genderButtonValues[1], 1);
  expect.soft(await sprintPage.isSubmitVisible()).toBeTruthy();
  await sprintPage.clickSubmitByIndex(0);

  await sprintPage.expectUrl(new RegExp(genderButtonValues[0])); //because the gender value that we used in the form should be in the URL
});
