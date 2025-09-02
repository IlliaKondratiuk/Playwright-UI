import { Page, Locator } from "@playwright/test";
import { PAGES } from "../config/urls";
import { BasePage } from "./BasePage";

export class ComplicatedPage extends BasePage {
  url = PAGES.COMPLICATED;

  readonly firstSectionButtons: Locator;
  readonly twitterButtons: Locator;
  readonly facebookButtons: Locator;
  readonly formNameInput: Locator;
  readonly formEmailInput: Locator;
  readonly formMessageTextarea: Locator;
  readonly formFakeCaptchaInput: Locator;
  readonly formSubmitButton: Locator;


  constructor(page: Page) {
    super(page);
    this.firstSectionButtons = page.locator("a[class*='et_pb_button']");
    this.twitterButtons = page.locator("li[class*='social_media'] > a[title*='Twitter']");
    this.facebookButtons = page.locator("li[class*='social_media'] > a[title*='Facebook']");
    this.formNameInput = page.locator("input[id='et_pb_contact_name_0']");
    this.formEmailInput = page.locator("input[id='et_pb_contact_email_0']");
    this.formMessageTextarea = page.locator("textarea[id='et_pb_contact_message_0']");
    this.formFakeCaptchaInput = page.locator("input[name='et_pb_contact_captcha_0']");
    this.formSubmitButton = page.locator("button[class*='et_builder_submit_button']");
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

  async fillFakeCaptcha(): Promise<void> { 
    const fakeCaptchaNumber1 = await this.formFakeCaptchaInput.getAttribute("data-first_digit") || "0";
    const fakeCaptchaNumber2 = await this.formFakeCaptchaInput.getAttribute("data-second_digit") || "0";

    await this.formFakeCaptchaInput.fill((parseInt(fakeCaptchaNumber1) + parseInt(fakeCaptchaNumber2)).toString());
  }

  async fillAndSubmitForm(name: string, email: string, message: string): Promise<void> {
    await this.type(this.formNameInput, name);
    await this.type(this.formEmailInput, email);
    await this.type(this.formMessageTextarea, message);
    await this.fillFakeCaptcha();
    await this.click(this.formSubmitButton);
  }
}
