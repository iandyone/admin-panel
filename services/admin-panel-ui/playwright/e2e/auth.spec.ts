import { test } from '@playwright/test';

import { PROTECTED_ROUTES } from '@pw/constants';
import { App } from '@pw/objects/app';

const { describe, expect } = test;

describe('Страница авторизации', () => {
  test('Отображение основных элементов страницы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage();

    await expect(page).toHaveTitle('Admin panel');
    await expect(app.nextApp.getByTestId('sign-in-title')).toHaveText('Sign In');
    await expect(app.nextApp.getByTestId('sign-in-form-input-email')).toBeVisible();
    await expect(app.nextApp.getByTestId('sign-in-form-input-password')).toBeVisible();
    await expect(app.nextApp.getByTestId('sign-in-form-button-submit')).toBeVisible();
  })

  test('Отображение лейбла о пропущенном обязательном поле', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage();

    await app.nextApp.getByTestId('sign-in-form-button-submit').click();
    await expect(app.nextApp.getByText('This field is required')).toHaveCount(2);
  })

  for (const key of PROTECTED_ROUTES) {
    test(`Страница ${key} доступна только после авторизации`, async ({ page }) => {
      const app = new App(page);
      const route = App.ROUTES[key];

      await app.visitStartPage(route);
      await expect(app.nextApp.getByTestId('error-placeholder-title')).toHaveText('Not authorized');
      await expect(app.nextApp.getByTestId('error-placeholder-subtitle')).toHaveText('You are not authorized. Please, sign in and try again');
      await expect(app.nextApp.getByTestId('redirect-button')).toBeVisible()
    });
  }

  test('Проверка верстки', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage();

    await expect(app.nextApp.getByTestId('sign-in')).toHaveScreenshot();
  })
})

