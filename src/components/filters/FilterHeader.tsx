import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";
import { Separator } from "../ui/separator";
import { FilterHeaderProps } from "./types/filters";

export const FilterHeader = ({ onReset }: FilterHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary"
          onClick={onReset}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Limpar filtros
        </Button>
      </div>
      <Separator />
    </>
  );
};