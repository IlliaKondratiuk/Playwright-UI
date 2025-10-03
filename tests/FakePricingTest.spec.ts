import { test, expect } from './fixtures'
import { FakePricingPage } from "../pages/FakePricingPage";
import testData from "../test_data/general_data.json" assert { type: "json" };

test("verify prices on fake pricing page", async ({ pages }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Pricing" });
  testInfo.annotations.push({ type: "severity", description: "normal" });
  testInfo.annotations.push({ type: "issue", description: "JIRA-1234" }); // Example issue annotation

  const fakePricingPage = pages.fakePricing();
  const expectedPrices = testData.fake_pricing.expectedPrices;

  await fakePricingPage.goto(fakePricingPage.url);

  const prices = await fakePricingPage.getPricesText();
  expect(prices).toEqual(expectedPrices);
});

test("verify price buttons scroll to top", async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: "feature", description: "Pricing" });
  testInfo.annotations.push({ type: "severity", description: "normal" });
  testInfo.annotations.push({ type: "issue", description: "JIRA-1234" }); // Example issue annotation

  const fakePricingPage = new FakePricingPage(page);
  await fakePricingPage.goto(fakePricingPage.url);
  const buttonCount = await fakePricingPage.getPriceButtonCount();

  for (let i = 0; i < buttonCount; i++) {
    await fakePricingPage.clickPriceButton(i);
    await page.waitForTimeout(1000); // Pause to observe the scroll effect
    expect(await fakePricingPage.browserHelper.isAtTop()).toBeTruthy();
  }
});
