import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/,
        "Password can only contain alphanumeric characters and special characters",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ISignUp = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/,
      "Password can only contain alphanumeric characters and special characters",
    ),
});

export type ILogin = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/,
        "Password can only contain alphanumeric characters and special characters",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
