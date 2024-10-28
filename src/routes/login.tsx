import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { googleLogin, signIn } from "@/network/auth";
import Input from "@/components/input";
import GoogleBtn from "@/components/google-btn";
import FooterText from "@/components/footer-text";
import AuthIcons from "@/components/auth-icons";
import { useHookForm } from "@/hooks/useHookForm";
import { loginSchema } from "@/schemas";
import { toastError } from "@/utils";

export const LoginPage = () => {
  const { next } = Route.useSearch<{ next?: string }>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useHookForm(loginSchema, {
    email: "",
    password: "",
  });

  const submitForm = handleSubmit(async ({ email, password }) => {
    const toastId = toast.loading("Logging in...");
    try {
      const data = await signIn({
        email,
        password,
      });

      toast.dismiss(toastId);
      localStorage.setItem("SCRAPPER_TOKEN", data.token);
      localStorage.setItem("SCRAPPER_REFRESH_TOKEN", data.refreshToken);
      toast.success("Login Successful");

      navigate({
        to: next || "/dashboard",
      });
    } catch (error) {
      toast.dismiss(toastId);
      toastError(error);
    }
  });

  const login = useGoogleLogin({
    onSuccess: (response) => {
      (async () => {
        const toastId = toast.loading("Logging in...");
        try {
          const user = await googleLogin(response.code);

          toast.dismiss(toastId);
          toast.success("Login Successful");
          localStorage.setItem("SCRAPPER_TOKEN", user.data.token);
          localStorage.setItem(
            "SCRAPPER_REFRESH_TOKEN",
            user.data.refreshToken,
          );
          navigate({
            to: next || "/dashboard",
          });
        } catch (error) {
          toast.dismiss(toastId);
          toast.error("Google Login Failed");
        }
      })();
    },
    onError: (err) => {
      toast.error(err.error_description || "Google Login Failed");
    },
    flow: "auth-code",
  });

  return (
    <>
      <AuthIcons />
      <div className="wrapper">
        <section className="mx-auto mb-10 max-w-[324px] md:mb-12 md:max-w-max">
          <h1 className="mb-2 text-center text-[2rem] font-bold text-primary md:mb-4 md:text-[3rem]">
            log in
          </h1>
          <p className="text-center text-[1.25rem] text-form_text">
            your automated help in job search. scrapper brings jobs to you in no
            stress
          </p>
        </section>

        <form onSubmit={submitForm} className="flex flex-col gap-10 md:px-3">
          <div className="flex flex-col gap-4 md:gap-6">
            <Input
              name="email"
              placeholder="Email"
              register={register}
              errors={errors}
            />
            <div>
              <div className="mb-2 md:mb-3">
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
              <Link
                to="/forgot-password"
                className="text-[0.875rem] text-primary underline"
              >
                forgot password?
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 md:gap-8">
            <button
              disabled={isSubmitting}
              type="submit"
              className="h-[56px] w-full rounded-[40px] bg-primary text-[1rem] font-semibold text-[#FAFAFAFA] md:h-[88px] md:text-[1.5rem] md:font-bold"
            >
              continue
            </button>
            <GoogleBtn onClick={() => login()} />
            <Link
              to="/signup"
              className="text-[0.875rem] text-primary underline"
            >
              don’t have an account? sign up
            </Link>
          </div>
        </form>

        <FooterText />
      </div>
    </>
  );
};

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
