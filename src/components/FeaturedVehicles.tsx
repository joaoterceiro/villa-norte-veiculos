import { Calendar, Fuel, Car } from "lucide-react";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FeaturedVehicles = () => {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("status", "active")
        .is("deleted_at", null)
        .order("is_featured", { ascending: false })
        .order("date_added", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card
              key={i}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100 animate-pulse"
            >
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-4 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.vehicle_id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100"
          >
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
        ))}
      </div>
    </div>
  );
};