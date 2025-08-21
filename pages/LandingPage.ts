import { Page } from "@playwright/test";
import { PAGES } from "../config/urls";
import { BasePage } from "./BasePage";

export class LandingPage extends BasePage {

    url = PAGES.LANDING;

    constructor(page: Page) {
        super(page);
    }

}