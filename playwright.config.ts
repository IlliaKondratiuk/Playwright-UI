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
    video: "retain-on-failure",
  },
    reporter: [
    ['list'], // console output
    ['html', { open: 'never' }], // HTML report
    ['junit', { outputFile: 'test-results/junit-report.xml' }] // JUnit for CI/CD
  ],
   projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
