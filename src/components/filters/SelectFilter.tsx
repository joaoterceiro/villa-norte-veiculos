import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFilterProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const SelectFilter = ({
  label,
  value,
  onValueChange,
  placeholder = "Selecione uma opção",
  options,
}: SelectFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value || "all"} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-white border-input">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">Todos</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};