import path from 'path';

import { defineConfig, devices } from '@playwright/test';

import { EPlaywrightProjects } from '@pw/constants';

const { SETUP, AUTH, ADMIN, MANAGER, DELIVERY, DEACTIVATED } = EPlaywrightProjects;

export default defineConfig({
  testDir: path.join(__dirname, 'playwright', 'e2e'),
  testMatch: '*spec.ts',
  fullyParallel: true,
  forbidOnly: false,
  retries: 1,
  workers: '40%',
  maxFailures: 0,
  reporter: 'list',
  snapshotPathTemplate: path.join(__dirname, 'playwright', 'snapshots', '{testFilePath}/{arg}{ext}'),

  use: {
    baseURL: `http://localhost:${process.env.PORT_UI}`,
    trace: 'on-first-retry',
    testIdAttribute: 'data-test-id',
  },

  projects: [
    {
      name: SETUP,
      testDir: './playwright/setups',
      testMatch: /.*\.setup\.ts/,
      workers: '50%'
    },

    {
      name: AUTH,
      testMatch: /auth\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: ADMIN,
      testMatch: /admin\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: path.join(__dirname, 'playwright', '.auth', 'admin.json')
      },
      dependencies: [SETUP, AUTH],
    },
    {
      name: MANAGER,
      testMatch: /manager\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: path.join(__dirname, 'playwright', '.auth', 'manager.json')
      },
      dependencies: [SETUP, ADMIN],
    },
    {
      name: DELIVERY,
      testMatch: /delivery\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: path.join(__dirname, 'playwright', '.auth', 'delivery.json')
      },
      dependencies: [SETUP, ADMIN],
    },
    {
      name: DEACTIVATED,
      testMatch: /deactivated\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: path.join(__dirname, 'playwright', '.auth', 'deactivated.json')

      },
      workers: 1,
      dependencies: [SETUP],
    },
  ]
});
