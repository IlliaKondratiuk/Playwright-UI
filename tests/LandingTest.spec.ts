import { expect, test } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { COURSES } from "../test_data/courses";

test("open page, wait 5s, and close", async ({ page }) => {
  const landingPage = new LandingPage(page);
    await landingPage.goto(landingPage.url);
    await landingPage.waitForSeconds(5);
  
});

test("course blocks contain expected text", async ({ page }) => { 

  const landingPage = new LandingPage(page);

  await landingPage.goto(landingPage.url);

  expect.soft(await landingPage.getLearningBlocksText()).toEqual(COURSES);

});