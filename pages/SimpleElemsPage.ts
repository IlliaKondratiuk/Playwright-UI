import { Page, Locator } from "@playwright/test";
import { PAGES } from "../config/urls";
import { BasePage } from "./BasePage";

export class SimpleElemsPage extends BasePage {
  url = PAGES.SIMPLE_ELEMENTS;

  readonly emailMeNameInput: Locator;
  readonly emailMeEmailInput: Locator;
  readonly emailMeButton: Locator;
  readonly emailMeSuccessMessage: Locator;
  readonly transportCheckboxes: Locator;
  readonly manufacturerDropdown: Locator;
  readonly contentTabs: Locator;
  readonly contentTabsText: Locator;
  readonly tableWithIdRows: Locator;
  readonly reableWithoutIdRows: Locator;

  constructor(page: Page) {
    super(page);
    this.emailMeNameInput = page.locator("input[id='et_pb_contact_name_0']");
    this.emailMeEmailInput = page.locator("input[id='et_pb_contact_email_0']");
    this.emailMeButton = page.locator("button[name='et_builder_submit_button']");
    this.emailMeSuccessMessage = page.locator("div[id='et_pb_contact_form_0'] div[class='et-pb-contact-message'] p");
    this.transportCheckboxes = page.locator("input[name='vehicle']");
    this.manufacturerDropdown = page.locator("select[id='carselect']");
    this.contentTabs = page.locator("ul.et_pb_tabs_controls li");
    this.contentTabsText = page.locator("div[class='et_pb_tab_content']");
    this.tableWithIdRows = page.locator("#htmlTableId tbody tr");
    this.reableWithoutIdRows = page.locator("div[class = et_pb_text_inner] table:not([id]) tbody tr");
  }

  async fillEmailMeForm(name: string, email: string): Promise<void> {
    await this.type(this.emailMeNameInput, name);
    await this.type(this.emailMeEmailInput, email);
    await this.click(this.emailMeButton);
  }

  async clickEmailMeButton(): Promise<void> {
    await this.click(this.emailMeButton);
  }

  async getEmailMeSuccessMessage(): Promise<string> {
    return this.emailMeSuccessMessage.innerText();
  }

  async selectRadioButtonByValue(value: string): Promise<void> {
    await this.page.locator(`input[name="gender"][value="${value}"]`).click();;
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

  async isContentTabTextVisible(index: number): Promise<boolean> {
    return this.contentTabsText.nth(index).isVisible();
  }

  async getTableWithIdRows(): Promise<string[][]> {
    const rows = await this.tableWithIdRows.all();
    return Promise.all(rows.map((r) => r.locator("td").allInnerTexts()));
  }

  async getTableWithoutIdRows(): Promise<string[][]> {
    const rows = await this.tableWithIdRows.all();
    return Promise.all(rows.map((r) => r.locator("td").allInnerTexts()));
  }
}
