import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e/specs",
  outputDir: "./tests/e2e/output",
  use: {
    video: "off",
    browserName: "firefox",
    baseURL: "https://cr.computrabajo.com",
  },
});