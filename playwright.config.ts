// @ts-check
import { PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from './testConfig';
const ENV = process.env.ENV;

// if (!ENV || ![`UI`].includes(ENV)) {
//   console.log(
//     `Please provide a correct environment value like "npx cross-env ENV=UI"`
//   );
//   process.exit();
// }

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
      // grepInvert: /@UI/,
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
