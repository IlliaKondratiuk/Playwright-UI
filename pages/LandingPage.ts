import { Page } from "@playwright/test";
import { PAGES } from "../config/urls";

export class LandingPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(PAGES.LANDING);
  }

}