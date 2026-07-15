import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 15000,
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "npm start",
      cwd: "./server",
      port: 3001,
      reuseExistingServer: true,
      timeout: 20000,
    },
    {
      command: "npm run dev",
      cwd: "./client",
      port: 5173,
      reuseExistingServer: true,
      timeout: 20000,
    },
  ],
});
