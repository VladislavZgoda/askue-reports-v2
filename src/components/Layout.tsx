import { useSuspenseQuery } from "@tanstack/react-query";
import { cookieByNameQueryOptions } from "~/server/utils/cookie";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data } = useSuspenseQuery(cookieByNameQueryOptions("sidebar_state"));
  const sidebarCookieState = data ?? "true";
  const defaultOpen = sidebarCookieState === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
