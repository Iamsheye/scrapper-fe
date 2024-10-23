import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth_routes/profile")({
  component: () => <div>Hello /_auth_routes/profile!</div>,
});
