import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/browse-herbs")({
  component: () => <Outlet />,
});