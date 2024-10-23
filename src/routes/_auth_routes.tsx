import { createContext } from "react";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import Wrapper from "@/components/wrapper";
import { getUserDetails } from "@/network/jobs";
import { User } from "@/types";

export const UserContext = createContext<User | null>(null);

export const Route = createFileRoute("/_auth_routes")({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem("SCRAPPER_TOKEN");
    if (!token) {
      throw redirect({
        to: "/login",
        replace: true,
        search: {
          next: location.pathname,
        },
      });
    }
  },
  pendingComponent: () => {
    return (
      <div className="flex h-[75vh] items-center justify-center">
        <p className="text-center text-[1rem] font-semibold text-form_text md:text-[1.5rem]">
          loading...
        </p>
      </div>
    );
  },
  errorComponent: () => {
    const router = useRouter();

    return (
      <div className="flex h-[75vh] items-center justify-center">
        <p className="text-center text-[1rem] font-semibold text-form_text md:text-[1.5rem]">
          <span>An error occured😞, please</span>{" "}
          <button
            className="text-primary underline"
            onClick={() => {
              router.invalidate();
            }}
          >
            retry
          </button>
        </p>
      </div>
    );
  },
  gcTime: 0,
  shouldReload: false,
  loader: async () => {
    const user = await getUserDetails();

    return {
      user,
    };
  },
  component: () => {
    const { user } = Route.useLoaderData();

    return (
      <UserContext.Provider value={user}>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </UserContext.Provider>
    );
  },
});
