import { Link } from "react-router-dom";
import { Card } from "../ui/card";

interface SearchResult {
  vehicle_id: string;
  title: string;
  year: number;
  price: number;
  mileage: number;
  image_feature: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  searchTerm: string;
}

export const SearchResults = ({ results, isLoading, searchTerm }: SearchResultsProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (!searchTerm || searchTerm.length < 2) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-[60vh] overflow-y-auto">
      {isLoading ? (
        <div className="p-4 text-center text-gray-500">Buscando...</div>
      ) : results.length === 0 ? (
        <div className="p-4 text-center text-gray-500">Nenhum veículo encontrado</div>
      ) : (
        <div className="p-2">
          {results.map((vehicle) => (
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
  );
}