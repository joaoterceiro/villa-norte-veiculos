import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RangeFilterProps {
  label: string;
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  type?: "number" | "text";
}

export const RangeFilter = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  type = "number",
}: RangeFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type={type}
          placeholder="Mín"
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          className="bg-white"
        />
        <Input
          type={type}
          placeholder="Máx"
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          className="bg-white"
        />
      </div>
    </div>
  );
};