import { Page, Locator, expect } from "@playwright/test";

export abstract class BasePage {
  constructor(protected page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
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

  async expectUrl(pattern: RegExp | string, timeout = 5000) {
    await expect(this.page).toHaveURL(pattern, { timeout });
  }
}
