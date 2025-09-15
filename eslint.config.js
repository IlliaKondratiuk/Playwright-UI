// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores([
    // Playwright Specific
    "node_modules/",
    "test-results/",
    "playwright-report/",
    "summary.json",

    // IDE - VSCode
    ".vscode/*",

    // System Files
    ".DS_Store",
    "Thumbs.db",

    // Docs files
    "*_spec3.json",
  ]),

  tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, prettier, {
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
  }),
]);
