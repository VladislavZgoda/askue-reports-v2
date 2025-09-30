import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { getRouteApi } from "@tanstack/react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const routeApi = getRouteApi("__root__");
  const sidebarCookie = routeApi.useLoaderData();
  const defaultOpen = sidebarCookie === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
