import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

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
  const [localMinValue, setLocalMinValue] = useState(minValue);
  const [localMaxValue, setLocalMaxValue] = useState(maxValue);

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

  const debouncedMinChange = debounce((value: string) => {
    onMinChange(value);
  }, 500);

  const debouncedMaxChange = debounce((value: string) => {
    onMaxChange(value);
  }, 500);

  useEffect(() => {
    setLocalMinValue(minValue);
    setLocalMaxValue(maxValue);
  }, [minValue, maxValue]);

  const handleCurrencyChange = (value: string, onChange: (value: string) => void, setLocalValue: (value: string) => void) => {
    const numericValue = value.replace(/\D/g, "");
    setLocalValue(numericValue);
    onChange(numericValue);
  };

  const handleKilometerChange = (value: string, onChange: (value: string) => void, setLocalValue: (value: string) => void) => {
    const numericValue = value.replace(/\D/g, "");
    setLocalValue(numericValue);
    onChange(numericValue);
  };

  const getValue = (value: string, isMin: boolean) => {
    const localValue = isMin ? localMinValue : localMaxValue;
    if (isCurrency) return formatCurrency(localValue);
    if (isKilometer) return formatKilometer(localValue);
    return localValue;
  };

  const handleChange = (
    value: string, 
    onChange: (value: string) => void, 
    setLocalValue: (value: string) => void,
    debouncedChange: (value: string) => void
  ) => {
    if (isCurrency) {
      handleCurrencyChange(value, setLocalValue, setLocalValue);
      debouncedChange(value.replace(/\D/g, ""));
    } else if (isKilometer) {
      handleKilometerChange(value, setLocalValue, setLocalValue);
      debouncedChange(value.replace(/\D/g, ""));
    } else {
      setLocalValue(value);
      debouncedChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type={isCurrency || isKilometer ? "text" : type}
          placeholder={minPlaceholder}
          value={getValue(minValue, true)}
          onChange={(e) => handleChange(
            e.target.value, 
            onMinChange, 
            setLocalMinValue,
            debouncedMinChange
          )}
          className="bg-white border-[#eee] placeholder:text-gray-500 shadow-none"
        />
        <Input
          type={isCurrency || isKilometer ? "text" : type}
          placeholder={maxPlaceholder}
          value={getValue(maxValue, false)}
          onChange={(e) => handleChange(
            e.target.value, 
            onMaxChange, 
            setLocalMaxValue,
            debouncedMaxChange
          )}
          className="bg-white border-[#eee] placeholder:text-gray-500 shadow-none"
        />
      </div>
    </div>
  );
};