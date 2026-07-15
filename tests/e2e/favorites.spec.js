import { test, expect } from "@playwright/test";

test.describe("Favorites (unauthenticated)", () => {
  test("favorite column is hidden on the home page when logged out", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("columnheader", { name: "Favorite" })).toHaveCount(0);
  });

  test("favorites link in the sidebar redirects to login when logged out", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Favorites" }).click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
