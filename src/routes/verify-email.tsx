import { verifyUserEmail } from "@/network/auth";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";

const VerifyEmail = () => {
  const { hasError, message } = Route.useLoaderData();

  return (
    <div className="flex h-[80dvh] items-center justify-center text-center text-[3rem] font-bold text-primary">
      {hasError ? (
        <h1>{message}</h1>
      ) : (
        <div>
          <h1>Email verified</h1>
          <Link
            to="/login"
            className="text-[0.875rem] text-form_text underline md:text-[1.25rem]"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmail,
  validateSearch: z.object({
    id: z.string(),
  }),
  beforeLoad: ({ search: { id } }) => {
    if (!id) {
      throw redirect({
        to: "/",
        replace: true,
      });
    }
  },
  loaderDeps: ({ search: { id } }) => ({ id }),
  loader: async ({ deps: { id } }) => {
    try {
      await verifyUserEmail(id);

      return { hasError: false };
    } catch (err) {
      // @ts-ignore
      const msg = err.response.data.message || "An error occured";
      console.log({ hasError: true, message: msg });
      return { hasError: true, message: msg };
    }
  },
});
