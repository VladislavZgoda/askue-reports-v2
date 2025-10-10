import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { substationsQueryOptions } from "~/server/services/transformer-substation";

import { HousePlug } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";

export function NavSubstations() {
  const { data } = useSuspenseQuery(substationsQueryOptions());

  if (data.length === 0) {
    return <>Список пуст</>;
  }

  return (
    <SidebarMenu>
      {data.map(({ id, name }) => (
        <SidebarMenuItem key={id}>
          <SidebarMenuButton asChild>
            <Link
              to="/substations/$substationId"
              params={{ substationId: id.toString() }}
              activeProps={{
                className: "bg-sidebar-accent text-sidebar-accent-foreground",
              }}
            >
              <HousePlug />
              <span>{name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
