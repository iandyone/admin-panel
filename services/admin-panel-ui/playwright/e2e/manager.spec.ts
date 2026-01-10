import { test } from '@playwright/test';

import { ORDERS_TABLE_COLUMNS, USERS_TABLE_COLUMNS } from '@pw/constants';
import { App } from '@pw/objects/app';

const { describe, expect } = test;

describe('Страница Orders', () => {
  test('Страница доступна менеджеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    await expect(app.nextApp.getByTestId('page-orders')).toBeVisible();
  })
  test('Отображение основных элементов страницы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    await expect(app.nextApp.getByTestId('orders-page-header-title')).toHaveText('Orders')
    await expect(app.nextApp.getByTestId('orders-page-header-add-order-button')).toHaveText('Add Order', { ignoreCase: true });
    await expect(app.nextApp.getByTestId('orders-table')).toBeVisible();
  })

  test('Проверка элементов таблицы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    const MANAGER_ACTIONS_COLUMNS_COUNT = 2;
    const isTableValid = await app.checkTableConfiguration('orders-table', ORDERS_TABLE_COLUMNS, MANAGER_ACTIONS_COLUMNS_COUNT);

    expect(isTableValid).toBeTruthy();
  })

  test('Отображение формы "Добавить заказ" в модальном окне по клику на кнопку', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    await app.nextApp.getByTestId('orders-page-header-add-order-button').click();

    await expect(app.nextApp.getByTestId('create-order-form')).toBeVisible();
  })

  test('Редактирование заказов доступно менеджеру. Проверка формы "Обновить заказ" по клику на кнопку', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);
    await app.nextApp.getByRole('navigation', { name: 'Desktop' }).waitFor({ state: 'visible' });


    await app.nextApp.getByTestId('table-edit-row-data-button').first().click();

    const TEXT_INPUT_NAMES = ['Customer', 'Location'];
    const AUTOSELECT_NAMES = ['Order', 'Deliveryman', 'Manager', 'Status'];

    const form = app.nextApp.getByTestId('update-order-form');

    await expect(app.nextApp.getByRole('heading', { name: /Update order/i })).toBeVisible();

    await expect(form.getByRole('textbox')).toHaveCount(TEXT_INPUT_NAMES.length);
    await Promise.all(TEXT_INPUT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(form.getByRole('textbox', { name })).toBeEnabled();
      })
    ))

    await expect(form.getByRole('combobox')).toHaveCount(AUTOSELECT_NAMES.length);
    await Promise.all(AUTOSELECT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(form.getByRole('combobox', { name })).toBeEnabled();
      })
    ))

    await expect(form.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(form.getByRole('button', { name: 'Apply' })).toBeVisible();
  })

  test('Удаление заказов доступно менеджеру. Проверка окна подтверждения удаления', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    const removeButton = app.nextApp.getByTestId('table-remove-row-data-button').first();
    await removeButton.waitFor({ state: 'visible' });
    await removeButton.click();

    const modal = app.nextApp.getByTestId('confirm-remove-modal');
    await expect(modal).toBeVisible();
    await expect(app.nextApp.getByRole('heading', { name: 'Confirm to remove' })).toBeVisible();
    await expect(app.nextApp.getByTestId('confirm-remove-modal-title')).toBeVisible();
    await expect(app.nextApp.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(app.nextApp.getByRole('button', { name: 'Confirm' })).toBeVisible();
  })
})

describe('Страница Users', () => {
  test('Страница доступна менеджеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    await expect(app.nextApp.getByTestId('page-users')).toBeVisible();
  })

  test('Отображение основных элементов страницы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    const MANAGER_NAVIGATION_LINKS = ['Dashboard', 'Orders', 'Users'];
    const navbar = app.nextApp.getByRole('navigation', { name: 'Desktop' });
    await navbar.waitFor({ state: 'visible' });

    await expect(navbar.getByRole('link')).toHaveCount(MANAGER_NAVIGATION_LINKS.length)

    await Promise.all(
      MANAGER_NAVIGATION_LINKS.map(link =>
        test.step(`Страница навигации ${link}`, async () => {
          await expect(navbar.getByRole('link', { name: link })).toBeVisible()
        })
      )
    );

    await expect(app.nextApp.getByTestId('users-page-header-title')).toHaveText('Users')
    await expect(app.nextApp.getByTestId('users-table')).toBeVisible();
  })

  test('Проверка элементов таблицы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    const MANAGER_ACTIONS_COLUMNS_COUNT = 1;
    const isTableValid = await app.checkTableConfiguration('users-table', USERS_TABLE_COLUMNS, MANAGER_ACTIONS_COLUMNS_COUNT);

    expect(isTableValid).toBeTruthy();
  })

  test('Добавление пользователей НЕ доступно менеджеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    await expect(app.nextApp.getByTestId('users-page-header-add-user-button')).toHaveCount(0);
  })

  test('Редактирование пользователей доступно менеджеру (кроме администраторов)', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);
    await app.nextApp.getByTestId('table-edit-row-data-button').first().waitFor({ state: 'visible' });

    const form = app.nextApp.getByTestId('update-user-form');

    const userRow = app.nextApp
      .getByTestId('data-grid-row')
      .filter({ has: page.getByRole('cell', { name: /^(manager|delivery)$/i }) }).first();

    await userRow.getByTestId('table-edit-row-data-button').click();


    await expect(app.nextApp.getByRole('heading', { name: /Update user/i })).toBeVisible();
    await expect(form).toBeVisible();

    const cancelButton = form.getByRole('button', { name: 'Cancel' });
    await expect(cancelButton).toBeVisible();
    await expect(form.getByRole('button', { name: 'Apply' })).toBeVisible();
    await cancelButton.click();


    const adminRow = app.nextApp
      .getByTestId('data-grid-row')
      .filter({ has: page.getByRole('cell', { name: /admin/i }) }).first();

    await expect(adminRow.getByTestId('table-edit-row-data-button')).toBeDisabled();
  })

  test('Деактивация пользователей НЕ доступна менеджеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);
    await app.nextApp.getByTestId('table-edit-row-data-button').first().waitFor({ state: 'visible' });

    const form = app.nextApp.getByTestId('update-user-form');

    const userRow = app.nextApp
      .getByTestId('data-grid-row')
      .filter({ has: page.getByRole('cell', { name: /^(manager|delivery)$/i }) }).first();

    await userRow.getByTestId('table-edit-row-data-button').click();
    await expect(form.getByRole('combobox', { name: 'Status' })).toBeDisabled();
  })
})

describe('Страница Dashboard', () => {
  test('Страница доступна менеджеру', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.DASHBOARD);
    await page.waitForURL(App.ROUTES.DASHBOARD);

    await expect(app.nextApp.getByTestId('page-dashboard')).toBeVisible();
  })

  test('Отображение основных элементов страницы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.DASHBOARD);
    await page.waitForURL(App.ROUTES.DASHBOARD);

    await expect(app.nextApp.getByTestId('dashboard-page-header-title')).toHaveText('Dashboard');

    const dashboardFilter = app.nextApp.getByTestId('dashboard-page-filter');
    await expect(dashboardFilter).toBeVisible();
    await expect(dashboardFilter.getByTestId('dashboard-page-table-date-filter-from')).toBeVisible();
    await expect(dashboardFilter.getByTestId('dashboard-page-table-date-filter-to')).toBeVisible();
    await expect(dashboardFilter.getByRole('button', { name: 'Apply' })).toBeVisible();

    await expect(app.nextApp.getByTestId('dashboard-page-statistics-bar')).toBeVisible();

    const chartsBar = app.nextApp.getByTestId('page-dashboard-charts-bar');
    await expect(chartsBar).toBeVisible();
    await expect(chartsBar.getByTestId('dashboard-page-orders-chart')).toBeVisible();
    await expect(chartsBar.getByTestId('dashboard-page-products-chart')).toBeVisible();

    await expect(app.nextApp.getByTestId('dashboard-page-trending-bar')).toBeVisible();
  })
})

