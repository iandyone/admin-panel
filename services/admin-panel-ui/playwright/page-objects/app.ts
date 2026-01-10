import { Locator, Page, test } from '@playwright/test';

const { expect } = test;
export class App {
  private readonly page: Page;

  readonly nextApp: Locator;

  static readonly ROUTES = {
    MAIN: '/',
    ORDERS: '/orders',
    USERS: '/users',
    DASHBOARD: '/dashboard',
    DEACTIVATED: '/deactivated',
  }

  constructor(page: Page) {
    this.page = page
    this.nextApp = page.locator('#admin-panel-app');
  }

  async visitStartPage(url = App.ROUTES.MAIN) {
    await this.page.goto(url)
  }

  async checkTableConfiguration(tableTestId: string, columns: string[], actionColumnsCount = 0) {
    const table = this.nextApp.getByTestId(tableTestId);

    await expect(table).toBeVisible();

    await expect(table.getByRole('columnheader')).toHaveCount(columns.length + actionColumnsCount);
    await expect(table.getByRole('columnheader').locator('button')).toHaveCount(columns.length);

    await Promise.all(
      columns.map(columnName =>
        test.step(`Наличие колонки ${columnName}`, async () => {
          await expect(table.getByRole('columnheader', { name: columnName })).toBeVisible()
        })
      ),
    )

    await expect(table.getByText('Rows per page:')).toBeVisible();
    await expect(table.getByRole('combobox', { name: 'Rows per page:' })).toBeVisible();
    await expect(table.locator('.MuiTablePaginationActions-root')).toBeVisible();

    return true;
  }


  async checkTableFilters(columns: string[]) {
    for (const column of columns) {
      await test.step(`Фильтр для колонки "${column}"`, async () => {
        await this.nextApp.getByRole('columnheader', { name: column }).locator('button').click();

        await expect(this.nextApp.getByTestId('table-filter-input').first()).toBeVisible();
        await expect(this.nextApp.getByRole('button', { name: 'Apply' })).toBeVisible();

        const resetButton = this.nextApp.getByRole('button', { name: 'Reset' });
        await expect(resetButton).toBeVisible();
        await resetButton.click();
      });
    }

    return true;
  }
}
