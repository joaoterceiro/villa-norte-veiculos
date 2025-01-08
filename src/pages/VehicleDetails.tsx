import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleInfoPanel } from "@/components/VehicleInfoPanel";
import { VehicleSpecifications } from "@/components/VehicleSpecifications";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const VehicleDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product")
        .select(`
          *,
          product_accessories (accessory),
          product_images (image_url, image_url_large)
        `)
        .eq("vehicle_id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: similarVehicles } = useQuery({
    queryKey: ["similar-vehicles", vehicle?.make, vehicle?.model],
    enabled: !!vehicle,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*, product_accessories(accessory)")
        .eq("make", vehicle?.make)
        .neq("vehicle_id", id)
        .limit(4);

      if (error) throw error;
      
      return data.map(v => ({
        ...v,
        accessories: v.product_accessories?.map(a => a.accessory) || []
      }));
    },
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div>Carregando...</div>
        <Footer />
      </>
    );
  }

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <div>Veículo não encontrado</div>
        <Footer />
      </>
    );
  }

  const images = vehicle.product_images || [];
  const hasImages = images.length > 0;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const specifications = [
    { label: "Marca", value: vehicle.make },
    { label: "Modelo", value: vehicle.model },
    { label: "Ano", value: vehicle.year },
    { label: "Versão", value: vehicle.base_model },
    { label: "Cor", value: vehicle.color },
    { label: "Combustível", value: vehicle.fuel_type },
    { label: "Portas", value: vehicle.doors },
    { label: "Transmissão", value: vehicle.transmission },
    { label: "Motor", value: vehicle.engine },
    { label: "Quilometragem", value: vehicle.mileage?.toLocaleString("pt-BR") }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 relative rounded-lg overflow-hidden bg-gray-100">
              <img
                src={hasImages ? images[currentImageIndex].image_url : vehicle.image_feature}
                alt={vehicle.title}
                className="w-full aspect-[4/3] object-cover cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              />
              {hasImages && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="col-span-12 lg:col-span-4">
              <VehicleInfoPanel
                title={vehicle.title}
                condition={vehicle.condition}
                price={vehicle.price}
                location="São José dos Campos"
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Especificações</h2>
            <VehicleSpecifications specifications={specifications} />
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="text-xl font-semibold mb-4">Descrição</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {vehicle.description}
            </p>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="text-xl font-semibold mb-4">Acessórios</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {vehicle.product_accessories?.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="justify-start py-2 px-4"
                >
                  {item.accessory}
                </Badge>
              ))}
            </div>
          </div>

          {similarVehicles && similarVehicles.length > 0 && (
            <>
              <Separator className="my-8" />
              <div>
                <h2 className="text-xl font-semibold mb-4">Veículos Similares</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {similarVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
                  ))}
                </div>
              </div>
            </>
          )}

          <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <DialogContent className="max-w-screen-lg w-full p-0 bg-black">
              <div className="relative">
                <img
                  src={hasImages ? images[currentImageIndex].image_url_large || images[currentImageIndex].image_url : vehicle.image_feature}
                  alt={vehicle.title}
                  className="w-full h-auto"
                />
                {hasImages && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VehicleDetails;
