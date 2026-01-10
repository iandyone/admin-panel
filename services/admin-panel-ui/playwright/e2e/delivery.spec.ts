import { test } from '@playwright/test';

import { ORDERS_TABLE_COLUMNS } from '@pw/constants';
import { App } from '@pw/objects/app';

const { describe, expect } = test;
describe('Страница Orders', () => {
  test('Страница доступна курьеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    await expect(app.nextApp.getByTestId('page-orders')).toBeVisible();
  })
  test('Отображение основных элементов страницы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    const DELIVERY_NAVIGATION_LINKS = ['Orders'];
    const navbar = app.nextApp.getByRole('navigation', { name: 'Desktop' });
    await navbar.waitFor({ state: 'visible' });

    await expect(navbar.getByRole('link')).toHaveCount(DELIVERY_NAVIGATION_LINKS.length)

    await Promise.all(
      DELIVERY_NAVIGATION_LINKS.map(link =>
        test.step(`Страница навигации ${link}`, async () => {
          await expect(navbar.getByRole('link', { name: link })).toBeVisible()
        })
      )
    );

    await expect(app.nextApp.getByTestId('orders-page-header-title')).toHaveText('Orders')
    await expect(app.nextApp.getByTestId('orders-table')).toBeVisible();
  })

  test('Проверка элементов таблицы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    const DELIVERY_ACTIONS_COLUMNS_COUNT = 1;
    const isTableValid = await app.checkTableConfiguration('orders-table', ORDERS_TABLE_COLUMNS, DELIVERY_ACTIONS_COLUMNS_COUNT);

    expect(isTableValid).toBeTruthy();
  })

  test('Добавление заказов НЕ доступно курьеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    await expect(app.nextApp.getByTestId('orders-page-header-add-order-button')).toHaveCount(0);
  })

  test('Редактирование заказов доступно курьеру (статус, доставщик)', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);
    await app.nextApp.getByRole('navigation', { name: 'Desktop' }).waitFor({ state: 'visible' });

    await app.nextApp.getByTestId('table-edit-row-data-button').first().click();

    const TEXT_INPUT_NAMES = ['Customer', 'Location'];
    const AUTOSELECT_NAMES = ['Order', 'Manager',];
    const AVAILABLE_ORDER_FIELDS = ['Deliveryman', 'Status']

    const form = app.nextApp.getByTestId('update-order-form');

    await expect(app.nextApp.getByRole('heading', { name: /Update order/i })).toBeVisible();

    await expect(form.getByRole('textbox')).toHaveCount(TEXT_INPUT_NAMES.length);
    await Promise.all(TEXT_INPUT_NAMES.map(name =>
      test.step(`Поле ${name} НЕ доступно для редактирования`, async () => {
        await expect(form.getByRole('textbox', { name })).toBeDisabled();
      })
    ))

    await expect(form.getByRole('combobox')).toHaveCount(AUTOSELECT_NAMES.length + AVAILABLE_ORDER_FIELDS.length);
    await Promise.all(AUTOSELECT_NAMES.map(name =>
      test.step(`Поле ${name} НЕ доступно для редактирования`, async () => {
        await expect(form.getByRole('combobox', { name })).toBeDisabled();
      })
    ))

    await Promise.all(AVAILABLE_ORDER_FIELDS.map(name =>
      test.step(`Поле ${name} доступно для редактирования`, async () => {
        await expect(form.getByRole('combobox', { name })).toBeEnabled();
      })
    ))

    await expect(form.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(form.getByRole('button', { name: 'Apply' })).toBeVisible();
  })

  test('Удаление заказов НЕ доступно курьеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    const removeButton = app.nextApp.getByTestId('table-remove-row-data-button').first();
    await expect(removeButton).toHaveCount(0);
  })
})

describe('Страница Users', () => {
  test('Страница НЕ доступна курьеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    await expect(app.nextApp.getByTestId('error-placeholder')).toBeVisible();
    await expect(app.nextApp.getByTestId('error-placeholder-title')).toHaveText('Access denied');
    await expect(app.nextApp.getByTestId('error-placeholder-subtitle')).toHaveText('You have no permissions for this page');
  })
})

describe('Страница Dashboard', () => {
  test('Страница НЕ доступна курьеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.DASHBOARD);
    await page.waitForURL(App.ROUTES.DASHBOARD);

    await expect(app.nextApp.getByTestId('error-placeholder')).toBeVisible();
    await expect(app.nextApp.getByTestId('error-placeholder-title')).toHaveText('Access denied');
    await expect(app.nextApp.getByTestId('error-placeholder-subtitle')).toHaveText('You have no permissions for this page');
  })
})

