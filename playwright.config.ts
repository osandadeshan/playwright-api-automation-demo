import { devices, PlaywrightTestConfig } from "@playwright/test";

interface TestConfig extends PlaywrightTestConfig {
  authApiUrl: string;
  baseApiUrl: string;
  testDataDir: string;
}

const defaultConfig: PlaywrightTestConfig = {
  testDir: "./src/test",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html"]],
  use: {
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
  },
  outputDir: "test-results",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
};

const devConfig: TestConfig = {
  authApiUrl: "https://restful-booker.herokuapp.com/auth",
  baseApiUrl: "https://restful-booker.herokuapp.com",
  testDataDir: "./src/test/resources/dev",
};

const sitConfig: TestConfig = {
  authApiUrl: "https://restful-booker.herokuapp.com/auth",
  baseApiUrl: "https://restful-booker.herokuapp.com",
  testDataDir: "./src/test/resources/sit",
};

const uatConfig: TestConfig = {
  authApiUrl: "https://restful-booker.herokuapp.com/auth",
  baseApiUrl: "https://restful-booker.herokuapp.com",
  testDataDir: "./src/test/resources/uat",
};

// Get the environment from command line. If none, set it to dev
const environment = process.env.TEST_ENV || "dev";

// Config object with default configuration and environment specific configuration
const config: TestConfig = {
  ...defaultConfig,
  ...(environment === "sit"
    ? sitConfig
    : environment === "uat"
    ? uatConfig
    : devConfig),
};

export default config;
