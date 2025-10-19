import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import Layout from "~/components/Layout";

import { cookieByNameQueryOptions } from "~/server/utils/cookie";
import { substationsQueryOptions } from "~/server/services/transformer-substation";

export const Route = createFileRoute("/_mainLayout")({
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(substationsQueryOptions());
    void context.queryClient.ensureQueryData(
      cookieByNameQueryOptions("sidebar_state"),
    );
  },
  component: MainLayout,
});

function MainLayout() {
  return (
    <Layout>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>{" "}
        <Link
          // @ts-expect-error: This is for testing.
          to="/this-route-does-not-exist"
          activeProps={{
            className: "font-bold",
          }}
        >
          This Route Does Not Exist
        </Link>
      </div>
      <hr />
      <Outlet />
    </Layout>
  );
}
