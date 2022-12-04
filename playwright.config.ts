// @ts-check
import { PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from './testConfig';
const ENV = process.env.ENV;

const config: PlaywrightTestConfig = {
  expect: {
    timeout: 10000,
  },
  globalSetup: `./global-setup`,
  globalTeardown: `./global-teardown`,
  timeout: 100000,
  retries: 0,

  reporter: [
    ['list'],
    [`allure-playwright`, { outputFolder: 'allure-results' }],
    [`html`, { outputFolder: 'html-report', open: 'never' }],
  ],

  projects: [
    {
      name: `MailMerge`,
      use: {
        browserName: `chromium`,
        channel: `chrome`,
        baseURL: testConfig.baseurl,
        headless: false,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
          args: ['--start-maximized'],
        },
      },
    },
  ],
};
export default config;
