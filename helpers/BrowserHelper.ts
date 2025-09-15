import { Page } from "@playwright/test";

export class BrowserHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isAtTop(): Promise<boolean> {
    return this.page.evaluate(() => window.scrollY === 0);
  }
}
