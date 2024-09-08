import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { googleLogin, signIn, signUp } from "@/network/auth";

export const LoginPage = () => {
  const navigate = useNavigate();

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
      console.log(err);
    },
    flow: "auth-code",
  });

  return (
    <div>
      <button onClick={() => login()}>Login</button>

      <button
        onClick={async () => {
          const toastId = toast.loading("Logging in...");
          try {
            const user = await signIn({
              email: "seyepelumi@gmail.com",
              password: "password",
            });

            toast.dismiss(toastId);
            toast.success("Login Successful");
            localStorage.setItem("SCRAPPER_TOKEN", user.data.token);
            navigate({
              to: "/dashboard",
            });
          } catch (error) {
            toast.dismiss(toastId);
            toast.error("Login Failed");
          }
        }}>
        Login Email
      </button>

      <button
        onClick={async () => {
          const toastId = toast.loading("Signing up...");
          try {
            const user = await signUp({
              name: "Oluwaseye Majekodunmi",
              email: "seyepelumi@gmail.com",
              password: "password",
            });

            console.log(user);
            toast.dismiss(toastId);
            toast.success("Signup Successful");
          } catch (error) {
            toast.dismiss(toastId);
            toast.error("Signup Failed");
          }
        }}>
        Signup Email
      </button>
    </div>
  );
};

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
