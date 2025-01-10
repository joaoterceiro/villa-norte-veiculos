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
        <SelectContent className="bg-white border shadow-md z-50 overflow-hidden">
          <SelectItem value="all" className="bg-white hover:bg-gray-100">Todos</SelectItem>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="bg-white hover:bg-gray-100"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};