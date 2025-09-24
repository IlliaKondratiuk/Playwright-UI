import { Page, Locator } from "@playwright/test";
import { PAGES } from "../config/urls";
import { BasePage } from "./BasePage";

export class SprintPage extends BasePage {
  url = PAGES.LIFECYCLE;

  readonly firstNameInputs: Locator;
  readonly lastNameInputs: Locator;
  readonly genderSelects: Locator;
  readonly submitButtons: Locator;
  readonly nextSprintButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInputs = page.locator("input[name='firstname']");
    this.lastNameInputs = page.locator("input[name='lastname']");
    this.genderSelects = page.locator("input[name='gender']");
    this.submitButtons = page.locator("form[action] input[type=submit]");
    this.nextSprintButton = page.locator("form a[href *= 'lifecycle']");
  }

  async fillFirstName(name: string): Promise<void> {
    const count = await this.firstNameInputs.count();

    if (count === 1) {
      await this.firstNameInputs.fill(name);
    } else {
      throw new Error(`Expected exactly one first name input, but found ${count}`);
    }
  }

  async fillFirstNameByIndex(name: string, index: number): Promise<void> {
    const count = await this.firstNameInputs.count();
    if (index < 0 || index >= count) {
      throw new Error(`Index ${index} is out of bounds for first name inputs with count ${count}`);
    } else {
      await this.firstNameInputs.nth(index).fill(name);
    }
  }

  async fillLastName(name: string): Promise<void> {
    const count = await this.lastNameInputs.count();
    if (count === 1) {
      await this.lastNameInputs.fill(name);
    } else {
      throw new Error(`Expected exactly one last name input, but found ${count}`);
    }
  }

  async fillLastNameByIndex(name: string, index: number): Promise<void> {
    const count = await this.lastNameInputs.count();
    if (index < 0 || index >= count) {
      throw new Error(`Index ${index} is out of bounds for last name inputs with count ${count}`);
    } else {
      await this.lastNameInputs.nth(index).fill(name);
    }
  }

  async selectGenderByValue(value: string): Promise<void> {
    const selectionQuantity = await this.genderSelects.count();
    if (selectionQuantity === 3) {
      await this.page.locator(`input[name="gender"][value="${value}"]`).click();
    } else {
      throw new Error(`Expected exactly one gender select input, but found ${selectionQuantity}`);
    }
  }

  async selectGenderByValueAndIndex(value: string, index: number): Promise<void> {
    const count = await this.genderSelects.count();
    if (index < 0 || index >= count) {
      throw new Error(`Index ${index} is out of bounds for gender selections with count ${count}`);
    } else {
      await this.page.locator(`input[name="gender"][value="${value}"]`).nth(index).click();
    }
  }

  async clickSubmitByIndex(index: number): Promise<void> {
    const count = await this.submitButtons.count();
    if (index < 0 || index >= count) {
      throw new Error(`Index ${index} is out of bounds for submit buttons with count ${count}`);
    } else {
      await this.submitButtons.nth(index).click();
    }
  }

  async clickNextSprintButton(): Promise<void> {
    await this.click(this.nextSprintButton);
  }

  async isSubmitVisible(): Promise<boolean> {
    const count = await this.submitButtons.count();
    return count > 0;
  }
}
