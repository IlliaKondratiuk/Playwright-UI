import { expect, test } from "@playwright/test";
import { FakePricingPage } from "../pages/FakePricingPage";
import testData from "../test_data/general_data.json" assert { type: "json" };

test("verify prices on fake pricing page", async ({ page }) => {
  const fakePricingPage = new FakePricingPage(page);
  const expectedPrices = testData.fake_pricing.expectedPrices;

  await fakePricingPage.goto(fakePricingPage.url);

  const prices = await fakePricingPage.getPricesText();
  await expect(prices).toEqual(expectedPrices);
});

test("verify price buttons scroll to top", async ({ page }) => {
  const fakePricingPage = new FakePricingPage(page);
  await fakePricingPage.goto(fakePricingPage.url);
  const buttonCount = await fakePricingPage.getPriceButtonCount();

  for (let i = 0; i < buttonCount; i++) {
    await fakePricingPage.clickPriceButton(i);
    await page.waitForTimeout(1000); // Pause to observe the scroll effect
    expect(await fakePricingPage.browserHelper.isAtTop()).toBeTruthy();
  }
});
