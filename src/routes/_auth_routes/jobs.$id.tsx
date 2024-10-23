import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth_routes/jobs/$id")({
  component: () => <div>Hello jobs page</div>,
});
