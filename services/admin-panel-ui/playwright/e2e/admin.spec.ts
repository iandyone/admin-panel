
import { test } from '@playwright/test';

import { ADMIN_NAVIGATION_LINKS, ORDERS_TABLE_COLUMNS, USERS_TABLE_COLUMNS } from '@pw/constants';
import { App } from '@pw/objects/app';

const { describe, expect } = test;

describe('Макет приватных страниц', () => {
  test('Отображение основных элементов макета', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    const navbar = app.nextApp.getByRole('navigation', { name: 'Desktop' });
    await navbar.waitFor({ state: 'visible' });

    await expect(app.nextApp.getByRole('link', { name: 'Admin Panel' })).toBeVisible();
    await expect(app.nextApp.getByRole('button', { name: 'Expand navigation menu' })).toBeVisible();

    await expect(navbar).toBeVisible();
    await expect(navbar.getByTestId('navigation-profile')).toBeVisible();
    await Promise.all(
      ADMIN_NAVIGATION_LINKS.map(link =>
        test.step(`Страница навигации ${link}`, async () => {
          await expect(navbar.getByRole('link', { name: link })).toBeVisible()
        })
      )
    );
  })

  test('Навигация по страницам из бокового меню', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.DASHBOARD);
    await page.waitForURL(App.ROUTES.DASHBOARD);
    await app.nextApp.getByRole('navigation', { name: 'Desktop' }).waitFor({ state: 'visible' });

    app.nextApp.getByRole('link', { name: 'Dashboard' }).click();
    await page.waitForURL(App.ROUTES.DASHBOARD);
    await expect(app.nextApp.getByTestId('page-dashboard')).toBeVisible();

    app.nextApp.getByRole('link', { name: 'Orders' }).click();
    await page.waitForURL(App.ROUTES.ORDERS);
    await expect(app.nextApp.getByTestId('page-orders')).toBeVisible();

    app.nextApp.getByRole('link', { name: 'Users' }).click();
    await page.waitForURL(App.ROUTES.USERS);
    await expect(app.nextApp.getByTestId('page-users')).toBeVisible();
  })

  test('Описание профиля при раскрытии бокового меню', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);

    await app.nextApp.getByRole('navigation', { name: 'Desktop' }).waitFor({ state: 'visible' });
    await app.nextApp.getByRole('button', { name: 'Expand navigation menu' }).click();

    await expect(app.nextApp.getByTestId('profile-username').first()).toBeVisible();
    await expect(app.nextApp.getByTestId('profile-email').first()).toBeVisible();
    await expect(app.nextApp.getByTestId('profile-sign-out-button').first()).toBeVisible();
  })
})

describe('Страница Orders', () => {
  test('Страница доступна администратору', async ({ page }) => {
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

    const ACTIONS_COLUMNS_COUNT = 2;
    const isTableValid = await app.checkTableConfiguration('orders-table', ORDERS_TABLE_COLUMNS, ACTIONS_COLUMNS_COUNT);

    expect(isTableValid).toBeTruthy();
  })

  test('Фильтры в заголовках столбцов таблицы заказов', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    const isTableFiltersValid = await app.checkTableFilters(ORDERS_TABLE_COLUMNS);
    expect(isTableFiltersValid).toBeTruthy();
  })

  test('Отображение формы "Добавить заказ" в модальном окне по клику на кнопку', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    await app.nextApp.getByTestId('orders-page-header-add-order-button').click();

    await expect(app.nextApp.getByTestId('create-order-form')).toBeVisible();
  })

  test('Структура формы "Добавить заказ"', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage()
    await page.waitForURL('/orders');

    const TEXT_INPUT_NAMES = ['Customer', 'Location'];
    const AUTOSELECT_NAMES = ['Order', 'Deliveryman', 'Manager', 'Status'];

    const form = app.nextApp.getByTestId('create-order-form');

    await app.nextApp.getByTestId('orders-page-header-add-order-button').click();
    await expect(app.nextApp.getByRole('heading', { name: 'New order' })).toBeVisible();

    await expect(form.getByRole('textbox')).toHaveCount(TEXT_INPUT_NAMES.length);
    await Promise.all(TEXT_INPUT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(form.getByRole('textbox', { name })).toBeVisible()
      })
    ))

    await expect(form.getByRole('combobox')).toHaveCount(AUTOSELECT_NAMES.length);
    await Promise.all(AUTOSELECT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(form.getByRole('combobox', { name })).toBeVisible()
      })
    ))

    await expect(form.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(form.getByRole('button', { name: 'Apply' })).toBeVisible();
  })

  test('Обязательные поля формы создания заказа', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    const addOrdersButton = app.nextApp.getByTestId('orders-page-header-add-order-button')
    const form = app.nextApp.getByTestId('create-order-form');

    await addOrdersButton.click();
    await form.getByRole('button', { name: 'Apply' }).click();

    // TODO: баг с отображением лейбла обязательного поля для списков
    expect(await app.nextApp.getByText('This field is required').count()).toBeGreaterThanOrEqual(3);
  })

  test('Редактирование заказа доступно администратору. Проверка формы "Обновить заказ" по клику на кнопку', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    await app.nextApp.getByTestId('table-edit-row-data-button').first().click();

    const TEXT_INPUT_NAMES = ['Customer', 'Location'];
    const AUTOSELECT_NAMES = ['Order', 'Deliveryman', 'Manager', 'Status'];

    const form = app.nextApp.getByTestId('update-order-form');

    await expect(app.nextApp.getByRole('heading', { name: /Update order/i })).toBeVisible();

    await expect(form.getByRole('textbox')).toHaveCount(TEXT_INPUT_NAMES.length);
    await Promise.all(TEXT_INPUT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(form.getByRole('textbox', { name })).toBeVisible()
      })
    ))

    await expect(form.getByRole('combobox')).toHaveCount(AUTOSELECT_NAMES.length);
    await Promise.all(AUTOSELECT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(form.getByRole('combobox', { name })).toBeVisible()
      })
    ))

    await expect(form.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(form.getByRole('button', { name: 'Apply' })).toBeVisible();
  })

  test('Удаление заказа доступно администратору. Проверка окна подтверждения удаления', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.ORDERS);
    await page.waitForURL(App.ROUTES.ORDERS);

    const removeButton = app.nextApp.getByTestId('table-remove-row-data-button').first();
    await removeButton.waitFor({ state: 'visible' });
    await removeButton.click();

    const modal = app.nextApp.getByTestId('confirm-remove-modal');
    await expect(modal).toBeVisible();
    await expect(app.nextApp.getByRole('heading', { name: 'Confirm to remove' })).toBeVisible();
    await expect(modal.getByTestId('confirm-remove-modal-title')).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Confirm' })).toBeVisible();
  })
})

describe('Страница Users', () => {
  test('Страница доступна администратору', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    await expect(app.nextApp.getByTestId('page-users')).toBeVisible();
  })

  test('Отображение основных элементов страницы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    await expect(app.nextApp.getByTestId('users-page-header-title')).toHaveText('Users')
    await expect(app.nextApp.getByTestId('users-page-header-add-user-button')).toHaveText('Add User', { ignoreCase: true });
    await expect(app.nextApp.getByTestId('users-table')).toBeVisible();
  })

  test('Проверка элементов таблицы', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    const ACTIONS_COLUMNS_COUNT = 1;
    const isTableValid = await app.checkTableConfiguration('users-table', USERS_TABLE_COLUMNS, ACTIONS_COLUMNS_COUNT);

    expect(isTableValid).toBeTruthy();
  })

  test('Фильтры в заголовках столбцов таблицы заказов', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    const isTableFiltersValid = await app.checkTableFilters(USERS_TABLE_COLUMNS);
    expect(isTableFiltersValid).toBeTruthy();
  })

  test('Отображение формы "Добавить пользователя" в модальном окне по клику на кнопку', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    await app.nextApp.getByTestId('users-page-header-add-user-button').click();

    await expect(app.nextApp.getByTestId('create-user-form')).toBeVisible();
  })

  test('Структура формы "Добавить пользователя"', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS)
    await page.waitForURL(App.ROUTES.USERS);

    const TEXT_INPUT_NAMES = ['First Name', 'Last Name', 'Email', 'Phone'];
    const AUTOSELECT_NAMES = ['Role'];

    const addUsersButton = app.nextApp.getByTestId('users-page-header-add-user-button');
    const usersForm = app.nextApp.getByTestId('create-user-form');

    await addUsersButton.waitFor({ state: 'visible' })
    await addUsersButton.click();

    await expect(app.nextApp.getByRole('heading', { name: 'New user' })).toBeVisible();

    await expect(usersForm.getByRole('textbox')).toHaveCount(TEXT_INPUT_NAMES.length);
    await expect(usersForm.getByRole('combobox')).toHaveCount(AUTOSELECT_NAMES.length);

    await Promise.all(TEXT_INPUT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(usersForm.getByRole('textbox', { name })).toBeVisible()
      })
    ))

    await Promise.all(AUTOSELECT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(usersForm.getByRole('combobox', { name })).toBeVisible()
      })
    ))

    await expect(usersForm.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(usersForm.getByRole('button', { name: 'Apply' })).toBeVisible();
  })

  test('Обязательные поля формы создания пользователя', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    const addUsersButton = app.nextApp.getByTestId('users-page-header-add-user-button');
    const form = app.nextApp.getByTestId('create-user-form');

    await addUsersButton.waitFor({ state: 'visible' })
    await addUsersButton.click();
    await form.getByRole('button', { name: 'Apply' }).click();

    // TODO: баг с отображением лейбла обязательного поля для списков
    expect(await app.nextApp.getByText('This field is required').count()).toBeGreaterThanOrEqual(3);
  })

  test('Редактирование пользователей администратору. Проверка формы "Обновить пользователя" по клику на кнопку', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.USERS);
    await page.waitForURL(App.ROUTES.USERS);

    await app.nextApp.getByTestId('table-edit-row-data-button').first().click();

    const TEXT_INPUT_NAMES = ['First Name', 'Last Name', 'Phone'];
    const AUTOSELECT_NAMES = ['Role', 'Status'];

    const form = app.nextApp.getByTestId('update-user-form');

    await expect(app.nextApp.getByRole('heading', { name: /Update user/i })).toBeVisible();

    await expect(form.getByRole('textbox')).toHaveCount(TEXT_INPUT_NAMES.length);
    await Promise.all(TEXT_INPUT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(form.getByRole('textbox', { name })).toBeVisible()
      })
    ))

    await expect(form.getByRole('combobox')).toHaveCount(AUTOSELECT_NAMES.length);
    await Promise.all(AUTOSELECT_NAMES.map(name =>
      test.step(`Проверка наличия поля ${name}`, async () => {
        await expect(form.getByRole('combobox', { name })).toBeVisible()
      })
    ))

    await expect(form.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(form.getByRole('button', { name: 'Apply' })).toBeVisible();
  })
})

describe('Страница Dashboard', () => {
  test('Страница доступна администратору', async ({ page }) => {
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

  test('Содержимое карточек статистики', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.DASHBOARD);
    await page.waitForURL(App.ROUTES.DASHBOARD);

    const statisticsCards = app.nextApp.getByTestId('dashboard-page-statistics-card');
    const STATISTICS_CARD_TITLES = ['Total orders', 'Completed', 'Canceled', 'Benefits'];
    await expect(statisticsCards).toHaveCount(STATISTICS_CARD_TITLES.length);

    await Promise.all(STATISTICS_CARD_TITLES.map(async (title, index) => {
      await test.step(`Карточка статистики "${title}"`, async () => {
        const currentCard = statisticsCards.nth(index);
        await expect(currentCard.getByTestId('dashboard-page-statistics-card-title')).toHaveText(title);
        await expect(currentCard.getByTestId('dashboard-page-statistics-card-value')).toBeVisible();
        await expect(currentCard.getByTestId('dashboard-page-statistics-card-chip')).toBeVisible();
        await expect(currentCard.getByTestId('dashboard-page-statistics-card-period-label')).toBeVisible();
        await expect(currentCard.getByTestId('dashboard-page-statistics-card-chart')).toBeVisible();
      })
    }))
  })
  test('Содержимое таблицы популярных продуктов', async ({ page }) => {
    const app = new App(page);
    await app.visitStartPage(App.ROUTES.DASHBOARD);
    await page.waitForURL(App.ROUTES.DASHBOARD);

    const trendingBar = app.nextApp.getByTestId('dashboard-page-trending-bar');
    await expect(trendingBar).toBeVisible();
    await expect(trendingBar.getByTestId('dashboard-page-trending-bar-title')).toHaveText('Trending Products');

    const trendingRow = trendingBar.getByTestId('dashboard-page-trending-bar-row').first();
    await expect(trendingRow).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-index')).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-product-name')).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-product-amount')).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-chip')).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-orders-count-value')).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-orders-count-value-description')).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-product-total-amount-value')).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-product-total-amount-value-description')).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-product-total-quality-value')).toBeVisible();
    await expect(trendingRow.getByTestId('dashboard-page-trending-bar-row-product-total-quality-value-description')).toBeVisible();
  })
})

