import Wrapper from "@/components/wrapper";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

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
  component: () => (
    <Wrapper>
      <Outlet />
    </Wrapper>
  ),
});
