const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './app/tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
    viewport: { width: 1280, height: 720 },
    outputDir: 'C:/Temp/playwright-results', // Przenosimy wyniki testów poza projekt
  },
});
