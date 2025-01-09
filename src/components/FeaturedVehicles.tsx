import { useEffect, useState } from "react";
import { VehicleCard } from "./VehicleCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("product")
          .select("*")
          .eq("is_featured", true)
          .limit(10); // Increased from 5 to 10 featured vehicles

        if (error) throw error;

        setVehicles(data);
      } catch (error) {
        toast.error("Erro ao carregar veículos em destaque");
        console.error("Error fetching featured vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const plugin = useState(() => 
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )[0];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Veículos em destaque
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Confira nossa seleção especial de veículos
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] animate-pulse rounded-lg bg-gray-200"
              />
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin]}
            className="relative mx-auto w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {vehicles.map((vehicle) => (
                <CarouselItem
                  key={vehicle.vehicle_id}
                  className="pl-2 md:basis-1/3 lg:basis-1/5 md:pl-4"
                >
                  <VehicleCard vehicle={vehicle} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 top-1/2 hidden -translate-y-1/2 md:flex" />
            <CarouselNext className="absolute -right-12 top-1/2 hidden -translate-y-1/2 md:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
}