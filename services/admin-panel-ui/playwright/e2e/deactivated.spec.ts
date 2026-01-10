import { test } from '@playwright/test';

import { App } from '@pw/objects/app';

const { describe, expect } = test;

const PRIVATE_PAGES = [
  { title: 'Orders', route: App.ROUTES.ORDERS },
  { title: 'Dashboard', route: App.ROUTES.DASHBOARD },
  { title: 'Users', route: App.ROUTES.USERS },
] as const;

for (const { title, route } of PRIVATE_PAGES) {
  describe(`Страница ${title}`, () => {
    test('Страница НЕ доступна деактивированному пользователю', async ({ page }) => {
      const app = new App(page);
      await app.visitStartPage(route);
      await page.waitForURL(route);
      await page.waitForURL(App.ROUTES.DEACTIVATED);

      const errorPlaceholder = app.nextApp.getByTestId('error-placeholder');
      await errorPlaceholder.waitFor({ state: 'visible' })

      await expect(errorPlaceholder).toBeVisible();
      await expect(errorPlaceholder.getByTestId('error-placeholder-title')).toHaveText('Deactivated');
      await expect(errorPlaceholder.getByTestId('error-placeholder-subtitle')).toHaveText('Your account has been deactivated. Contact your manager or administrator');
      await expect(errorPlaceholder.getByTestId('redirect-button')).toHaveText('Sign out', { ignoreCase: true });
    })
  })
}
