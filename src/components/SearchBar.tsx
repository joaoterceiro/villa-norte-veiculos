import { Search } from "lucide-react";
import { SearchInput } from "./search/SearchInput";
import { SearchResults } from "./search/SearchResults";
import { useVehicleSearch } from "./search/useVehicleSearch";

export const SearchBar = () => {
  const { searchTerm, setSearchTerm, searchResults, isLoading } = useVehicleSearch();

  return (
    <section className="w-full py-8 md:py-12 bg-white">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-secondary mb-4">
            Encontre o carro dos seus sonhos
          </h2>
          <p className="text-base md:text-lg text-muted font-light leading-relaxed">
            Mais de 100 veículos esperando por você em nosso showroom
          </p>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <SearchResults 
            results={searchResults} 
            isLoading={isLoading} 
            searchTerm={searchTerm} 
          />
        </div>
      </div>
    </section>
  );
};