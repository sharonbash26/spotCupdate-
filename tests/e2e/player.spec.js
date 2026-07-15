import { test, expect } from "@playwright/test";

test.describe("Player", () => {
  test("home page lists songs from the API", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Good afternoon" })).toBeVisible();
    const rows = page.getByRole("button", { name: /^Play / });
    await expect(rows).toHaveCount(6);
  });

  test("clicking a song starts playback and shows it in the player bar", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Play Midnight Drive/ }).click();

    await expect(page.getByRole("region", { name: "Player controls" })).toContainText("Midnight Drive");
    await expect(page.getByRole("button", { name: "Pause" })).toBeVisible();
  });

  test("pause button toggles playback state", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Play Midnight Drive/ }).click();
    await expect(page.getByRole("button", { name: "Pause" })).toBeVisible();

    await page.getByRole("button", { name: "Pause" }).click();
    await expect(page.getByRole("button", { name: "Play", exact: true })).toBeVisible();
  });

  test("song rows are keyboard accessible", async ({ page }) => {
    await page.goto("/");
    const firstRow = page.getByRole("button", { name: /Play Midnight Drive/ });
    await firstRow.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("region", { name: "Player controls" })).toContainText("Midnight Drive");
  });
});
