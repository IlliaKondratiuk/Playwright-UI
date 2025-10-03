import { test, expect } from './fixtures'
import { COURSES } from "../test_data/courses";

test("open page, wait 5s, and close", async ({ pages }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Landing Page" });
  testInfo.annotations.push({ type: "severity", description: "normal" });

  const landingPage = pages.landing();
  await landingPage.goto();
  await landingPage.waitForSeconds(5);
});

test("course blocks contain expected text", async ({ pages }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Landing Page" });
  testInfo.annotations.push({ type: "severity", description: "normal" });
  testInfo.annotations.push({ type: "issue", description: "JIRA-1234" }); // Example issue annotation

  const landingPage = pages.landing();
  await landingPage.goto();

  expect.soft(await landingPage.getLearningBlocksText()).toEqual(COURSES);
});
