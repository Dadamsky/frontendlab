const { test, expect } = require('@playwright/test');

test.describe('Login and Profile Access', () => {
  test('should log in and access profile page', async ({ page }) => {
    // Przejdź do strony logowania
    await page.goto('http://localhost:3000/public/user/signin');

    // Wypełnij formularz logowania
    await page.fill('input[type="email"]', 'damiankrito@gmail.com'); // Użyj poprawnych danych logowania
    await page.fill('input[type="password"]', 'haslodofirebase');

    // Zatwierdź formularz
    await page.click('button:has-text("Log In")');

    // Sprawdź, czy użytkownik został przekierowany na stronę profilu
    await expect(page).toHaveURL('http://localhost:3000/protected/user/profile');

    // Sprawdź, czy strona profilu zawiera poprawny nagłówek
    await expect(page.getByRole('heading', { name: 'Edit Profile' })).toBeVisible();
  });
});
