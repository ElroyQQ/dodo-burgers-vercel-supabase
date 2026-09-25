const { test, expect } = require("@playwright/test");

// Deliberately does NOT call supabase.auth.signUp/signIn here -- this project's
// preview and production deployments share one real Supabase project (see
// README "Preview deployments"), so an automated test that actually signed up
// would create real accounts on every CI run. This checks the auth UI renders
// and wires up correctly, without touching the live backend.

test("page loads with no console errors", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/index.html");
  await expect(page).toHaveTitle("Dodo Burgers");
  expect(errors).toEqual([]);
});

test("auth widget renders with email, password, and submit controls", async ({ page }) => {
  await page.goto("/index.html");
  const authLabel = page.locator("#authLabel");
  await authLabel.click();

  await expect(page.locator("#authEmail")).toBeVisible();
  await expect(page.locator("#authPassword")).toBeVisible();
  await expect(page.locator('#authForm button[data-mode="login"]')).toBeVisible();
  await expect(page.locator('#authForm button[data-mode="signup"]')).toBeVisible();
});

test("menu and builder panels are present", async ({ page }) => {
  await page.goto("/index.html");
  await expect(page.locator("#menu")).toBeAttached();
  await expect(page.locator("#builder")).toBeAttached();
});
