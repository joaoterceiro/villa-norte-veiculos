import { useState, useEffect } from "react";
import { SearchInput } from "./search/SearchInput";
import { SearchResults } from "./search/SearchResults";
import { useVehicleSearch } from "./search/useVehicleSearch";
import { useSearchParams } from "react-router-dom";

interface SearchBarProps {
  onSearch?: (term: string) => void;
  className?: string;
}

export const SearchBar = ({ onSearch, className = "bg-white rounded-lg shadow-lg p-6" }: SearchBarProps) => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const make = searchParams.get("make");
  const { searchResults, isLoading, totalVehicles } = useVehicleSearch(searchTerm, make);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <div className="container mx-auto -mt-8 relative z-10 px-4">
      <div className={className}>
        <h2 className="text-2xl font-semibold mb-4">
          Encontre o veículo perfeito entre mais de {totalVehicles} disponíveis!
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <SearchResults 
              results={searchResults}
              isLoading={isLoading}
              searchTerm={searchTerm}
            />
          </div>
          <button
            type="submit"
            className="bg-[#FF5B00] hover:bg-[#FF5B00]/90 transition-colors text-white px-8 py-3 rounded-lg font-semibold whitespace-nowrap"
          >
            VER OFERTAS ({totalVehicles})
          </button>
        </form>
      </div>
    </div>
  );
};