import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
const username = process.env.LOGIN_USERNAME as string;
const password = process.env.LOGIN_PASSWORD as string;

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login page correctly", async ({ page }) => {
    // Check main elements are visible
    await expect(page.getByRole("heading", { name: "log in" })).toBeVisible();
    await expect(page.getByPlaceholder("Email")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "continue", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /continue with google/i }),
    ).toBeVisible();
  });

  test("should show validation errors for empty form submission", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "continue", exact: true }).click();

    await expect(page.getByText("Invalid email")).toBeVisible();
    await expect(
      page.getByText("Password must be at least 8 characters"),
    ).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    await page.getByPlaceholder("Email").fill("invalid-email");
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByRole("button", { name: "continue", exact: true }).click();

    await expect(page.getByText("Invalid email")).toBeVisible();
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    // Mock successful login API response
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          token: "fake-token",
          refreshToken: "fake-refresh-token",
        }),
      });
    });

    await page.getByPlaceholder("Email").fill(username);

    await page.getByPlaceholder("Password").fill(password);

    await page.getByRole("button", { name: "continue", exact: true }).click();

    // Check for success toast
    const toast = page.getByText("Login Successful");
    await expect(toast).toBeVisible();
    await expect(toast).toBeHidden();

    // Verify localStorage items
    const token = await page.evaluate(() =>
      localStorage.getItem("SCRAPPER_TOKEN"),
    );
    const refreshToken = await page.evaluate(() =>
      localStorage.getItem("SCRAPPER_REFRESH_TOKEN"),
    );
    expect(token).toBeTruthy();
    expect(refreshToken).toBeTruthy();

    // Verify navigation to dashboard
    await expect(page).toHaveURL("/dashboard");
  });

  test("should handle login failure", async ({ page }) => {
    // Mock failed login API response
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 401,
        body: JSON.stringify({
          message: "Invalid credentials",
        }),
      });
    });

    await page.getByPlaceholder("Email").fill("test@example.com");
    await page.getByPlaceholder("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "continue", exact: true }).click();

    await expect(page.getByText("Invalid credentials")).toBeVisible();
  });

  test("should toggle password visibility", async ({ page }) => {
    const passwordInput = page.getByPlaceholder("Password");

    // Initially password should be hidden
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Click toggle button and check if password is visible
    await page.getByRole("button", { name: /show/i }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide password
    await page.getByRole("button", { name: /hide/i }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("navigation links should work correctly", async ({ page }) => {
    await page.getByText("forgot password?").click();
    await expect(page).toHaveURL("/forgot-password");

    await page.goto("/login");
    await page.getByText("don’t have an account? sign up").click();
    await expect(page).toHaveURL("/signup");
  });

  test("should redirect to next parameter URL after successful login", async ({
    page,
  }) => {
    // Mock successful login API response
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          token: "fake-token",
          refreshToken: "fake-refresh-token",
        }),
      });
    });

    // Navigate to login with next parameter
    await page.goto("/login?next=/settings");

    await page.getByPlaceholder("Email").fill(username);

    await page.getByPlaceholder("Password").fill(password);

    await page.getByRole("button", { name: "continue", exact: true }).click();

    // Verify navigation to settings page
    await expect(page).toHaveURL("/settings");
  });

  test.describe("Responsive Design", () => {
    test("should display correctly on mobile viewport", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size

      await expect(page.getByRole("heading", { name: "log in" })).toHaveCSS(
        "font-size",
        "32px",
      );

      // Check button height on mobile
      const continueButton = page.getByRole("button", {
        name: "continue",
        exact: true,
      });
      await expect(continueButton).toHaveCSS("height", "56px");
    });

    test("should display correctly on desktop viewport", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      await expect(page.getByRole("heading", { name: "log in" })).toHaveCSS(
        "font-size",
        "48px",
      );

      // Check button height on desktop
      const continueButton = page.getByRole("button", {
        name: "continue",
        exact: true,
      });
      await expect(continueButton).toHaveCSS("height", "88px");
    });
  });
});
