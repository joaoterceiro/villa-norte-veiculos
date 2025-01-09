import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Digite marca ou modelo do veículo"
        className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
}