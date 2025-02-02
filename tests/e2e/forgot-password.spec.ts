import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
const username = process.env.LOGIN_USERNAME as string;

test.describe("Forgot Password Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/forgot-password");
  });

  test("should display correct page title and headings", async ({ page }) => {
    await expect(page).toHaveTitle("Forgot Password | Scrapper");

    const heading = page.getByRole("heading", {
      name: "it happens to everyone",
    });
    await expect(heading).toBeVisible();

    const subheading = page.getByText(
      "provide your registered email to reset your password",
    );
    await expect(subheading).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    const emailInput = page.getByPlaceholder("Email");

    await emailInput.fill("invalid-email");
    await page.getByRole("button", { name: "send mail" }).click();

    await expect(page.getByText(/invalid email/i)).toBeVisible();
  });

  test("should handle successful password reset request", async ({ page }) => {
    await page.route("**/auth/forgot-password", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: {
            message:
              "If the email exists, a password reset link has been sent.",
          },
          statusCode: 201,
          message: "Password reset link sent successfully",
        }),
      });
    });

    const emailInput = page.getByPlaceholder("Email");

    await emailInput.fill(username);
    await page.getByRole("button", { name: "send mail" }).click();

    await expect(page.getByText("Password reset email sent")).toBeVisible();
  });

  test("should navigate to login page when clicking continue to login", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "continue to log in" }).click();

    await expect(page).toHaveURL("/login");
  });

  test("should show loading state during submission", async ({ page }) => {
    const emailInput = page.getByPlaceholder("Email");
    const submitButton = page.getByRole("button", { name: "send mail" });

    await emailInput.fill(username);

    await submitButton.click();
    await expect(page.getByText("submitting...")).toBeVisible();
  });
});
