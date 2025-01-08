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
  isKilometer?: boolean;
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
  isKilometer = false,
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

  const formatKilometer = (value: string) => {
    if (!value) return "";
    const numericValue = value.replace(/\D/g, "");
    return new Intl.NumberFormat("pt-BR").format(Number(numericValue)) + " KM";
  };

  const handleCurrencyChange = (value: string, onChange: (value: string) => void) => {
    const numericValue = value.replace(/\D/g, "");
    onChange(numericValue);
  };

  const handleKilometerChange = (value: string, onChange: (value: string) => void) => {
    const numericValue = value.replace(/\D/g, "");
    onChange(numericValue);
  };

  const getValue = (value: string) => {
    if (isCurrency) return formatCurrency(value);
    if (isKilometer) return formatKilometer(value);
    return value;
  };

  const handleChange = (value: string, onChange: (value: string) => void) => {
    if (isCurrency) return handleCurrencyChange(value, onChange);
    if (isKilometer) return handleKilometerChange(value, onChange);
    return onChange(value);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type={isCurrency || isKilometer ? "text" : type}
          placeholder={minPlaceholder}
          value={getValue(minValue)}
          onChange={(e) => handleChange(e.target.value, onMinChange)}
          className="bg-white placeholder:text-gray-500"
        />
        <Input
          type={isCurrency || isKilometer ? "text" : type}
          placeholder={maxPlaceholder}
          value={getValue(maxValue)}
          onChange={(e) => handleChange(e.target.value, onMaxChange)}
          className="bg-white placeholder:text-gray-500"
        />
      </div>
    </div>
  );
};