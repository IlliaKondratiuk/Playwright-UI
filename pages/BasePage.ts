import { Page, Locator } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async type(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async waitForSeconds(seconds: number): Promise<void> {
    await this.page.waitForTimeout(seconds * 1000);
  }
}
