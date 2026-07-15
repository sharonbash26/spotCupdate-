import { test, expect } from "@playwright/test";

test.describe("Auth", () => {
  test("unauthenticated user visiting /favorites is redirected to /login", async ({ page }) => {
    await page.goto("/favorites");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("login page renders the expected form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Log in" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("register page rejects a short password", async ({ page }) => {
    await page.goto("/register");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("123");
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.getByRole("alert")).toContainText("at least 6 characters");
  });

  test("navigation between login and register works", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("main").getByRole("link", { name: "Sign up" }).click();
    await expect(page).toHaveURL(/\/register$/);

    await page.getByRole("main").getByRole("link", { name: "Log in" }).click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
