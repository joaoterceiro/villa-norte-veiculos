import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RangeFilterProps {
  label: string;
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  type?: "number" | "text";
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

export const RangeFilter = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  type = "number",
  minPlaceholder = "Mínimo",
  maxPlaceholder = "Máximo",
}: RangeFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type={type}
          placeholder={minPlaceholder}
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          className="bg-white"
        />
        <Input
          type={type}
          placeholder={maxPlaceholder}
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          className="bg-white"
        />
      </div>
    </div>
  );
};