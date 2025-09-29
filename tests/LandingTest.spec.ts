import { expect, test } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { COURSES } from "../test_data/courses";

test("open page, wait 5s, and close", async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Landing Page" });
  testInfo.annotations.push({ type: "severity", description: "normal" });

  const landingPage = new LandingPage(page);
  await landingPage.goto(landingPage.url);
  await landingPage.waitForSeconds(5);
});

test("course blocks contain expected text", async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Landing Page" });
  testInfo.annotations.push({ type: "severity", description: "normal" });
  testInfo.annotations.push({ type: "issue", description: "JIRA-1234" }); // Example issue annotation

  const landingPage = new LandingPage(page);

  await landingPage.goto(landingPage.url);

  expect.soft(await landingPage.getLearningBlocksText()).toEqual(COURSES);
});
