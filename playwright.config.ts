import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: "https://example.com",
    browserName: "chromium",
    headless: true,
    screenshot: "only-on-failure",
  },
  reporter: [
    ["list"], // console output
    ["html", { open: "never" }], // HTML report
    ["junit", { outputFile: "test-results/junit-report.xml" }], // JUnit for CI/CD
    ["allure-playwright"], // Allure report
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], video: "retain-on-failure", trace: "retain-on-failure" }, //only one browser not to overload the storage with tons of videos and traces
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
