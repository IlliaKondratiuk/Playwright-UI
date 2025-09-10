import { Page, Locator } from "@playwright/test";
import { PAGES } from "../config/urls";
import { BasePage } from "./BasePage";
import { BrowserHelper } from "../helpers/BrowserHelper";

export class FakePricingPage extends BasePage {
    url = PAGES.PRICING;

    readonly prices: Locator;
    readonly priceButtons: Locator;
    readonly browserHelper: BrowserHelper;
  
    constructor(page: Page) {
        super(page);
        this.browserHelper = new BrowserHelper(page);
        this.prices = page.locator("span[class=et_pb_et_price] > span[class=et_pb_sum]");
        this.priceButtons = page.locator("a[class*=et_pb_pricing_table_button]");
    }

    async getPricesText(): Promise<string[]> {
        const priceTexts = await this.prices.allTextContents();
        return priceTexts.map((price) => price.trim());
    }

    async getPriceButtonCount(): Promise<number> {
        return this.priceButtons.count();
    }

    async clickPriceButton(index: number): Promise<void> {
        await this.click(this.priceButtons.nth(index));
    }

}