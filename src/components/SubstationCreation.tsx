import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function SubstationCreation() {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-sidebar-foreground/70">Список ТП</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon-sm"
            aria-label="Добавить ТП"
            variant="ghost"
          >
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Добавить ТП</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
