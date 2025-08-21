import { test } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";

test("open page, wait 5s, and close", async ({ page }) => {
  const landingPage = new LandingPage(page);
    await landingPage.goto(landingPage.url);
    await landingPage.waitForSeconds(5);
  // Browser will close automatically after test ends
});