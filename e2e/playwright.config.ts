import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:4200',
  },
  webServer: {
    command: 'ng serve',
    url: 'http://localhost:4200',
    timeout: 120_000,
  },
   projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    ],
});