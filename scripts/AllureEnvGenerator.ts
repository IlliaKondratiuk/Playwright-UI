import { BrowserType, chromium, firefox, webkit } from "playwright";
import fs from "fs";
import path from "path";

async function AllureEnvGenerator() {
  // Detect browser & version based on environment variable PW_BROWSER
  const browserName = process.env.PLAYWRIGHT_BROWSER || "chromium"; // fallback
  const launchers: Record<string, BrowserType> = {
    chromium,
    firefox,
    webkit,
  };

  const browser = await launchers[browserName].launch();
  const version = browser.version();
  await browser.close();

  // System details
  const os = `${process.platform} ${process.arch}`;
  const baseUrl = process.env.BASE_URL || "http://localhost";

  const envContent = `
BROWSER=${browserName} ${version}
OS=${os}
BASE_URL=${baseUrl}
`;

  const resultsDir = path.join("allure-results");
  if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);

  fs.writeFileSync(path.join(resultsDir, "environment.properties"), envContent.trim());
  console.log("✅ Allure environment.properties generated:\n", envContent);
}

AllureEnvGenerator();
