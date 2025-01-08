import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface YearFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const YearFilter = ({ value, onChange }: YearFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>Ano mínimo</Label>
      <Input
        type="number"
        placeholder="Digite o ano mínimo..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white placeholder:text-gray-500"
      />
    </div>
  );
};