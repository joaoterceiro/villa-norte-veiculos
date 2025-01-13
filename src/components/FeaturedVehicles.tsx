import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VehicleCard } from "./VehicleCard";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const FeaturedVehicles = () => {
  const { data: vehicles = [] } = useQuery({
    queryKey: ["featured-vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicle_details")
        .select("*")
        .eq("is_featured", true)
        .eq("status", "active")
        .order("year", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    },
  });

  if (!vehicles.length) return null;

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-secondary mb-4">
            Veículos em Destaque
          </h2>
          <p className="text-base md:text-lg text-muted font-light leading-relaxed max-w-2xl mx-auto">
            Confira nossa seleção especial de veículos em destaque com as melhores condições
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/veiculos">
            <Button variant="outline" size="lg" className="font-medium">
              Ver todo o estoque
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};