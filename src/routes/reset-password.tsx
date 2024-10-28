import { useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { z } from "zod";
import AuthIcons from "@/components/auth-icons";
import Input from "@/components/input";
import { useHookForm } from "@/hooks/useHookForm";
import { resetPasswordSchema } from "@/schemas";
import { resetPassword } from "@/network/auth";
import { toastError } from "@/utils";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  validateSearch: z.object({
    resetToken: z.string(),
  }),
  beforeLoad: ({ search: { resetToken } }) => {
    if (!resetToken) {
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
});

function ResetPassword() {
  const { resetToken } = Route.useSearch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useHookForm(resetPasswordSchema, {
    password: "",
    confirmPassword: "",
  });

  const submitForm = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const toastId = toast.loading("resetting password...");

    try {
      await resetPassword({
        password: data.password,
        token: resetToken,
      });

      toast.dismiss(toastId);
      toast.success("Password reset successful");

      setTimeout(() => {
        navigate({
          to: "/login",
        });
      }, 1200);
    } catch (error) {
      toast.dismiss(toastId);
      toastError(error);
    }
  });

  return (
    <>
      <AuthIcons />

      <div className="wrapper">
        <section className="mx-auto mb-10 max-w-[324px] md:mb-12 md:max-w-max">
          <h1 className="mb-2 text-center text-[2rem] font-bold text-primary md:mb-4 md:text-[3rem]">
            reset password
          </h1>
          <p className="text-center text-[1.25rem] text-form_text">
            provide your new password
          </p>
        </section>

        <form onSubmit={submitForm} className="flex flex-col gap-10 md:px-3">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="relative">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                register={register}
                errors={errors}
                showPassword={showPassword}
                onToggleClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="relative">
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                register={register}
                errors={errors}
                showPassword={showConfirmPassword}
                onToggleClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="h-[56px] w-full rounded-[40px] bg-primary text-[1rem] font-semibold text-[#FAFAFAFA] md:h-[88px] md:text-[1.5rem] md:font-bold"
          >
            reset
          </button>
        </form>
      </div>
    </>
  );
}
