import { expect, test } from "@playwright/test";
import { SimpleElemsPage } from "../pages/SimpleElemsPage";
import testData from "../test_data/general_data.json" assert { type: "json" };;

test("interact with simple elements in first column", async ({ page }) => {

    const simpleElemsPage = new SimpleElemsPage(page);
    const formName = testData.complicated_form.formName;
    const formEmail = testData.complicated_form.formEmail;
    const genderButtonValues = testData.simple_elements.genderButtonValues;
    const manufacturerValues = testData.simple_elements.manufacturers;

    await simpleElemsPage.goto(simpleElemsPage.url);

    await simpleElemsPage.fillEmailMeForm(formName, formEmail);
    await simpleElemsPage.clickEmailMeButton();

    expect.soft(await simpleElemsPage.getEmailMeSuccessMessage()).toContain(testData.simple_elements.formSuccessMessage);

    for(let i = 0; i < genderButtonValues.length; i++) {
        await simpleElemsPage.selectRadioButtonByValue(genderButtonValues[i]);
    }

    await simpleElemsPage.toggleAllTransportCheckboxes();
    for(let i = 0; i < manufacturerValues.length; i++) {
        await simpleElemsPage.selectManufacturerByValue(manufacturerValues[i]);
    }
    
    await simpleElemsPage.selectManufacturerByValue("audi");

    await simpleElemsPage.clickTabByIndex(1);
    expect.soft(await simpleElemsPage.isContentTabTextVisible(1)).toBeTruthy();
    await simpleElemsPage.clickTabByIndex(0);
    expect.soft(await simpleElemsPage.isContentTabTextVisible(0)).toBeTruthy();

});