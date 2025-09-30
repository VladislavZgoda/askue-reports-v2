/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";

import Layout from "~/components/Layout";

import appCss from "~/styles.css?url";

import type { ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { getCookieByName } from "~/utils/cookie";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  loader: async () =>
    await getCookieByName({ data: { name: "sidebar_state" } }),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Отчеты АСКУЭ",
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
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
          {children}
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}
