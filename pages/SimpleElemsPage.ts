import { Page, Locator } from "@playwright/test";
import { PAGES } from "../config/urls";
import { BasePage } from "./BasePage";

export class SimpleElemsPage extends BasePage {
    url = PAGES.SIMPLE_ELEMENTS;

    readonly emailMeNameInput: Locator;
    readonly emailMeEmailInput: Locator;
    readonly emailMeButton: Locator;
    readonly genderRadioButtons: Locator;
    readonly transportCheckboxes: Locator;
    readonly manufacturerDropdown: Locator;
    readonly contentTabs: Locator;

    constructor(page: Page) {
        super(page);
        this.emailMeNameInput = page.locator("input[id='et_pb_contact_name_0']");
        this.emailMeEmailInput = page.locator("input[id='et_pb_contact_email_0']");
        this.emailMeButton = page.locator("button[name='et_builder_submit_button']");
        this.genderRadioButtons = page.locator("input[name='gender']");
        this.transportCheckboxes = page.locator("input[name='vehicle']");
        this.manufacturerDropdown = page.locator("select[id='carselect']");
        this.contentTabs = page.locator("ul.et_pb_tabs_controls li");
    }

    async fillEmailMeForm(name: string, email: string): Promise<void> {
        await this.type(this.emailMeNameInput, name);
        await this.type(this.emailMeEmailInput, email);
        await this.click(this.emailMeButton);
    }

    async clickEmailMeButton(): Promise<void> {
        await this.click(this.emailMeButton);
    }

    async selectRadioButtonByValue(value: string): Promise<void> {
        const radioButton = this.genderRadioButtons.filter({ has: this.page.locator(`input[value='${value}']`) });
        await this.click(radioButton);
    }

    async toggleAllTransportCheckboxes(): Promise<void> {
        const count = await this.transportCheckboxes.count();   
        for (let i = 0; i < count; i++) {
            await this.click(this.transportCheckboxes.nth(i));
        }
    }

    async selectManufacturerByValue(value: string): Promise<void> {
        await this.manufacturerDropdown.selectOption(value);
    }

    async clickTabByIndex(index: number): Promise<void> {
        await this.click(this.contentTabs.nth(index));
    }      
}