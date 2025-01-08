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
  isCurrency?: boolean;
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
  isCurrency = false,
}: RangeFilterProps) => {
  const formatCurrency = (value: string) => {
    if (!value) return "";
    const numericValue = value.replace(/\D/g, "");
    const floatValue = parseFloat(numericValue) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(floatValue);
  };

  const handleCurrencyChange = (value: string, onChange: (value: string) => void) => {
    const numericValue = value.replace(/\D/g, "");
    onChange(numericValue);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type={isCurrency ? "text" : type}
          placeholder={minPlaceholder}
          value={isCurrency ? formatCurrency(minValue) : minValue}
          onChange={(e) =>
            isCurrency
              ? handleCurrencyChange(e.target.value, onMinChange)
              : onMinChange(e.target.value)
          }
          className="bg-white placeholder:text-gray-500"
        />
        <Input
          type={isCurrency ? "text" : type}
          placeholder={maxPlaceholder}
          value={isCurrency ? formatCurrency(maxValue) : maxValue}
          onChange={(e) =>
            isCurrency
              ? handleCurrencyChange(e.target.value, onMaxChange)
              : onMaxChange(e.target.value)
          }
          className="bg-white placeholder:text-gray-500"
        />
      </div>
    </div>
  );
};