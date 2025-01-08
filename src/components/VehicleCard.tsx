import { Calendar, Fuel, Car, Check } from "lucide-react";
import { Card } from "./ui/card";

interface VehicleCardProps {
  vehicle: {
    vehicle_id: string;
    title: string;
    year: number;
    mileage: number;
    fuel_type: string;
    price: number;
    image_feature: string;
    is_featured: boolean;
    accessories: string[];
  };
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={vehicle.image_feature || "/placeholder.svg"}
          alt={vehicle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {vehicle.is_featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
              Destaque
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-secondary line-clamp-2 mb-3 min-h-[2.5rem]">
          {vehicle.title}
        </h3>
        <div className="flex flex-wrap gap-4 text-muted text-xs mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Car className="w-4 h-4" />
            {vehicle.mileage?.toLocaleString("pt-BR")} km
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4" />
            {vehicle.fuel_type}
          </span>
        </div>
        {vehicle.accessories && vehicle.accessories.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Acessórios</h4>
            <div className="flex flex-wrap gap-2">
              {vehicle.accessories.slice(0, 3).map((accessory) => (
                <span
                  key={accessory}
                  className="inline-flex items-center gap-1 text-xs bg-secondary/10 text-secondary px-2 py-1 rounded"
                >
                  <Check className="w-3 h-3" />
                  {accessory}
                </span>
              ))}
              {vehicle.accessories.length > 3 && (
                <span className="text-xs text-muted">
                  +{vehicle.accessories.length - 3} mais
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <span className="text-xl font-bold text-primary">
            {formatPrice(vehicle.price || 0)}
          </span>
          <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 rounded-md transition-colors text-sm font-medium">
            Ver detalhes
          </button>
        </div>
      </div>
    </Card>
  );
};