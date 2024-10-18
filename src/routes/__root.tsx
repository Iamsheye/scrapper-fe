import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import RainbowBanner from "@/components/rainbow-banner";

export const Route = createRootRoute({
  component: () => (
    <>
      <RainbowBanner />
      <ScrollRestoration />
      <Outlet />
    </>
  ),
});
