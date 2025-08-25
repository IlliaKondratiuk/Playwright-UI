import { Page, Locator } from "@playwright/test";
import { PAGES } from "../config/urls";
import { BasePage } from "./BasePage";

export class ComplicatedPage extends BasePage {
  url = PAGES.COMPLICATED;

  readonly firstSectionButtons: Locator;
  readonly twitterButtons: Locator;
  readonly facebookButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.firstSectionButtons = page.locator("a[class*='et_pb_button']");
    this.twitterButtons = page.locator("li[class*='social_media'] > a[title*='Twitter']");
    this.facebookButtons = page.locator("li[class*='social_media'] > a[title*='Facebook']");
  }

  async clickEverySecondButton(): Promise<void> {
    const count = await this.firstSectionButtons.count();
    for (let i = 1; i < count; i += 2) {
      await this.click(this.firstSectionButtons.nth(i));
    }
  }

  async clickFirstTwitterButton(): Promise<void> {
    await this.click(this.twitterButtons.first());
  }

  async clickFirstFacebookButton(): Promise<void> {
    await this.click(this.facebookButtons.first());
  }
}
