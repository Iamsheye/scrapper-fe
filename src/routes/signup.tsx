import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { googleLogin, signUp } from "@/network/auth";
import Input from "@/components/input";
import FooterText from "@/components/footer-text";
import GoogleBtn from "@/components/google-btn";
import AuthIcons from "@/components/auth-icons";
import { signupSchema } from "@/schemas";
import { useHookForm } from "@/hooks/useHookForm";

export const SignupPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useHookForm(signupSchema, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitForm = handleSubmit(async ({ name, email, password }) => {
    const toastId = toast.loading("Signing up...");
    try {
      await signUp({
        name,
        email,
        password,
      });

      toast.dismiss(toastId);
      toast.success("Signup Successful");
      navigate({
        to: "/login",
      });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Signup Failed");
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
          navigate({
            to: "/dashboard",
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
            ready to try scrapper out
          </h1>
          <p className="text-center text-[1.25rem] text-form_text">
            your automated help in job search. scrapper brings jobs to you in no
            stress
          </p>
        </section>

        <form onSubmit={submitForm} className="flex flex-col gap-10 md:px-3">
          <div className="flex flex-col gap-4 md:gap-6">
            <Input
              name="name"
              placeholder="Name"
              register={register}
              errors={errors}
            />
            <Input
              name="email"
              placeholder="Email"
              register={register}
              errors={errors}
            />
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
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <button
              type="submit"
              className="h-[56px] w-full rounded-[40px] bg-primary text-[1rem] font-semibold text-[#FAFAFAFA] md:h-[88px] md:text-[1.5rem] md:font-bold"
            >
              get started
            </button>
            <GoogleBtn onClick={() => login()} />
            <Link
              to="/login"
              className="text-[0.875rem] text-primary underline"
            >
              already have an account? log in
            </Link>
          </div>
        </form>

        <FooterText />
      </div>
    </>
  );
};

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});
