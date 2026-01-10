/* eslint-disable playwright/expect-expect */
import path from 'path';

import { test, Page } from '@playwright/test';
import dotenv from 'dotenv';

import { App } from '@pw/objects/app';
import { UserCredentials, UserRole } from '@pw/types';

dotenv.config({ path: path.resolve(__dirname, '..', '.env.playwright'), quiet: true });

const { describe } = test;

const USERS: Record<UserRole, UserCredentials> = {
  admin: { email: process.env.TEST_LOGIN_ADMIN ?? '', password: process.env.TEST_PASS ?? '' },
  manager: { email: process.env.TEST_LOGIN_MANAGER ?? '', password: process.env.TEST_PASS ?? '' },
  delivery: { email: process.env.TEST_LOGIN_DELIVERY ?? '', password: process.env.TEST_PASS ?? '' },
  deactivated: { email: process.env.TEST_LOGIN_DEACTIVATED ?? '', password: process.env.TEST_PASS ?? '' },
};


async function loginAndSaveState(page: Page, role: UserRole) {
  const { email, password } = USERS[role];
  const app = new App(page);

  await app.visitStartPage();

  await app.nextApp.getByLabel('email').fill(email);
  await app.nextApp.getByLabel('password').fill(password);
  await app.nextApp.getByTestId('sign-in-form-button-submit').click();

  await page.waitForURL(App.ROUTES.ORDERS);

  const authFile = path.join(__dirname, `..`, '.auth', `${role}.json`);
  await page.context().storageState({ path: authFile });
}

describe.parallel('Auth setup (all roles)', () => {
  test('admin', async ({ page }) => loginAndSaveState(page, 'admin'));
  test('manager', async ({ page }) => loginAndSaveState(page, 'manager'));
  test('delivery', async ({ page }) => loginAndSaveState(page, 'delivery'));
  test('deactivated', async ({ page }) => loginAndSaveState(page, 'deactivated'));
});
