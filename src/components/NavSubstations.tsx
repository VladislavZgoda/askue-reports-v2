import { useSuspenseQuery } from "@tanstack/react-query";
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
      {data.map((substation) => (
        <SidebarMenuItem key={substation.id}>
          <SidebarMenuButton asChild>
            <a href="#">
              <HousePlug />
              <span>{substation.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
