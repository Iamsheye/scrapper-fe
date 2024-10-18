import { createFileRoute, Link } from "@tanstack/react-router";
import Input from "@/components/input";
import FooterText from "@/components/footer-text";
import AuthIcons from "@/components/auth-icons";
import { forgotPasswordSchema } from "@/schemas";
import { useHookForm } from "@/hooks/useHookForm";

export const ForgotPasswordPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useHookForm(forgotPasswordSchema, {
    email: "",
  });

  const submitForm = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <AuthIcons />

      <div className="wrapper">
        <section className="mx-auto mb-10 max-w-[324px] md:mb-12 md:max-w-max">
          <h1 className="mb-2 text-center text-[2rem] font-bold text-primary md:mb-4 md:text-[3rem]">
            it happens to everyone
          </h1>
          <p className="text-center text-[1.25rem] text-form_text">
            provide your registered email to reset your password
          </p>
        </section>

        <form onSubmit={submitForm} className="flex flex-col gap-10 md:px-3">
          <Input
            name="email"
            placeholder="Email"
            register={register}
            errors={errors}
          />

          <button
            type="submit"
            className="h-[56px] w-full rounded-[40px] bg-primary text-[1rem] font-semibold text-[#FAFAFAFA] md:h-[88px] md:text-[1.5rem] md:font-bold"
          >
            send mail
          </button>

          <div className="flex justify-center">
            <Link to="/login">
              <button
                type="button"
                className="flex items-center gap-2 rounded-[40px] border border-primary p-4 text-[1rem] font-semibold"
              >
                continue to log in
              </button>
            </Link>
          </div>

          <FooterText />
        </form>
      </div>
    </>
  );
};

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});
