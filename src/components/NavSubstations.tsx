import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { substationsQueryOptions } from "~/server/services/transformer-substation";

import { HousePlug } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";

export function NavSubstations() {
  const { data } = useSuspenseQuery(substationsQueryOptions());
  const [activeLinkId, setActiveLinkId] = useState<number | null>(null);

  const handleLinkClick = (id: number) => setActiveLinkId(id);

  if (data.length === 0) {
    return <>Список пуст</>;
  }

  return (
    <SidebarMenu>
      {data.map(({ id, name }) => (
        <SidebarMenuItem key={id}>
          <SidebarMenuButton asChild isActive={id === activeLinkId}>
            <Link
              to="/substations/$substationId"
              params={{ substationId: id.toString() }}
              onClick={() => handleLinkClick(id)}
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
