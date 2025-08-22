import { Page, Locator } from "@playwright/test";
import { PAGES } from "../config/urls";
import { BasePage } from "./BasePage";

export class LandingPage extends BasePage {

    url = PAGES.LANDING;

    readonly learningBlocks: Locator;

    constructor(page: Page) {
        super(page);
        this.learningBlocks = page.locator("div[class='et_pb_row'] h4.et_pb_module_header");
    }

    async getLearningBlocksText(): Promise<string[]> {
        const blocks = await this.learningBlocks.allTextContents();
        return blocks.map(block => block.trim());
    }

}