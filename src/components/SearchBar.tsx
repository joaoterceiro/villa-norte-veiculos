import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

interface SearchBarProps {
  onSearch?: (term: string) => void;
  className?: string;
}

interface SearchResult {
  vehicle_id: string;
  title: string;
  year: number;
  price: number;
  mileage: number;
  image_feature: string;
}

export const SearchBar = ({ onSearch, className = "bg-white rounded-lg shadow-lg p-6" }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .rpc('filter_products', {
            p_search_term: searchTerm,
            p_marca: null,
            p_ano_min: null,
            p_price_min: null,
            p_price_max: null,
            p_mileage_min: null,
            p_mileage_max: null,
            p_transmission_type: null,
            p_fuel_type: null,
            p_body_type: null,
            p_color: null
          });

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        console.log("Search results:", data);
        setSearchResults(data || []);
      } catch (error) {
        console.error("Error searching vehicles:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="container mx-auto -mt-8 relative z-10 px-4">
      <div className={className}>
        <h2 className="text-2xl font-semibold mb-4">Encontre o veículo perfeito entre mais de 100 disponíveis!</h2>
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
            
            {searchTerm.length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">Buscando...</div>
                ) : searchResults.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">Nenhum veículo encontrado</div>
                ) : (
                  <div className="p-2">
                    {searchResults.map((vehicle) => (
                      <Link 
                        key={vehicle.vehicle_id} 
                        to={`/carros/${vehicle.vehicle_id}`}
                        className="block"
                      >
                        <Card className="mb-2 hover:bg-gray-50 transition-colors">
                          <div className="flex gap-4 p-3">
                            <div className="w-24 h-20">
                              <img
                                src={vehicle.image_feature || "/placeholder.svg"}
                                alt={vehicle.title}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-secondary truncate">
                                {vehicle.title}
                              </h3>
                              <div className="text-sm text-gray-500 mt-1">
                                <span>{vehicle.year}</span>
                                <span className="mx-2">•</span>
                                <span>{vehicle.mileage?.toLocaleString("pt-BR")} km</span>
                              </div>
                              <div className="text-primary font-bold mt-1">
                                {formatPrice(vehicle.price || 0)}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#FF5B00] hover:bg-[#FF5B00]/90 transition-colors text-white px-8 py-3 rounded-lg font-semibold whitespace-nowrap"
          >
            VER OFERTAS (108)
          </button>
        </form>
      </div>
    </div>
  );
};