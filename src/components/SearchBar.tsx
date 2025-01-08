import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (term: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <div className="container mx-auto -mt-8 relative z-10 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Digite marca ou modelo do veículo"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-accent transition-colors text-white px-8 py-3 rounded-lg font-semibold whitespace-nowrap"
          >
            BUSCAR
          </button>
        </form>
      </div>
    </div>
  );
};