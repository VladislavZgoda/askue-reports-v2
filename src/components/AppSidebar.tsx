import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "./ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

import { SearchForm } from "./SearchForm";
import { NavSubstations } from "./NavSubstations";
import { SubstationCreation } from "./SubstationCreation";
import { User2, ChevronUp } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <span className="text-center font-semibold">Отчеты АСКУЭ</span>
        <SearchForm />
        <SubstationCreation />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavSubstations />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Темы</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
