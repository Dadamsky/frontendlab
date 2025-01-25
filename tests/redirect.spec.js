const { test, expect } = require('@playwright/test');

test.describe('Redirect for Unauthorized Users', () => {
  test('should redirect to login page if user is not authenticated', async ({ page }) => {
    // Przejdź do strony chronionej (np. profil użytkownika)
    await page.goto('http://localhost:3000/protected/user/profile');

    // Sprawdź, czy użytkownik został przekierowany na stronę logowania
    await expect(page).toHaveURL(/\/public\/user\/signin/);

    // Sprawdź, czy strona logowania zawiera nagłówek "Sign In"
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  });
});
