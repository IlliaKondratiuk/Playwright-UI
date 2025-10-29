# 🧪 Playwright UI Automation Framework

This project is a **UI test automation framework** built with **Playwright** and **TypeScript**.  
It was created as a **learning and showcase project** to demonstrate modern automation design practices — including structured test organization, fixtures, and Allure reporting.

---

## 🚀 Tech Stack

- **Playwright** – browser automation for Chromium, Firefox, and WebKit  
- **TypeScript** – strong typing and maintainability  
- **Allure** – advanced test reporting  
- **Node.js & npm** – dependency and script management  

---

## 🧰 Project Structure

```
Playwright-UI/
├── playwright.config.ts
├── tests/
│ ├── LandingTest.spec.ts
│ └── fixtures.ts 
│ └── ...
├── pages/
│ ├── HomePage.ts
│ ├── LoginPage.ts
│ └── ...
├── scripts/
│ └── AllureEnvGenerator.ts # Automatically generates Allure environment details
├── allure-results/
├── package.json
├── .prettierrc
├── eslint.config.js
└── README.md
```

---

## 🧩 Fixtures

The framework uses a **custom fixture setup** (`testBase.ts`) that injects reusable objects (such as Page Objects) into every test.  
This avoids repeated instantiation in each test file and ensures cleaner test code.

```ts
// Example usage
import { test } from "../fixtures/testBase";

test("User can log in", async ({ pages }) => {
  await pages.loginPage.open();
  await pages.loginPage.login("user", "password");
});

```
---

## 📊 Reporting with Allure

Allure provides clear insights into test execution through a visual dashboard with test steps, attachments, and environment info.

To include environment data (like browser and OS versions), a script generates environment.properties automatically:

``` npm run pretest ```

Then run tests and view reports:

```
npx playwright test
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## ⚙️ Setup & Run

1. Install dependencies
```npm install```

2. Run the environment generator
```npm run pretest```

3. Run tests
```npx playwright test```

4. View Allure report
```npx allure open```

## 🔧 Framework Status & Planned Improvements

✅ Already Implemented

- Soft Assertions — integrated for more flexible verification within tests.

- Parallel Test Execution — configured for multi-browser and concurrent runs.

- Enhanced Allure Reporting — includes step annotations and environment details.

- ESLint + Prettier — ensures code consistency and quality across the project.

- Reusable Page Object Structure — modular and scalable page modeling approach.

🚀 Planned Enhancements

- Add structured logging (e.g., Winston or Pino) for detailed runtime insights.

- Introduce config-driven test data management for flexible test parameterization.

- Expand fixture usage to streamline Page Object and session setup.

- Add GitHub Actions / CI integration for automated test execution and report publishing.