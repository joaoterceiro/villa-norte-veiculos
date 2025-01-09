import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { VehicleInfoPanel } from "@/components/VehicleInfoPanel";
import { VehicleSpecifications } from "@/components/VehicleSpecifications";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehicleImageGallery } from "@/components/VehicleImageGallery";
import { VehicleSimilar } from "@/components/VehicleSimilar";

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
        .limit(5);

      if (error) throw error;
      
      return data.map(v => ({
        ...v,
        accessories: v.product_accessories?.map(a => a.accessory) || []
      }));
    },
  });

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (vehicle?.product_images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (vehicle?.product_images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

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
        <div className="container mx-auto py-6 px-4 md:py-8 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <VehicleImageGallery
              images={vehicle.product_images || []}
              title={vehicle.title}
              imageFeature={vehicle.image_feature}
              currentImageIndex={currentImageIndex}
              onPrevImage={handlePrevImage}
              onNextImage={handleNextImage}
              onImageClick={() => setLightboxOpen(true)}
            />

            <div className="lg:col-span-4">
              <VehicleInfoPanel
                title={vehicle.title}
                condition={vehicle.condition}
                price={vehicle.price}
                location="São José dos Campos"
                category={vehicle.category}
                downloadUrl={vehicle.download}
              />
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Especificações</h2>
            <VehicleSpecifications specifications={specifications} />
          </div>

          <Separator className="my-6 md:my-8" />

          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Descrição</h2>
            <p className="text-[#666666] whitespace-pre-line text-sm md:text-base">
              {vehicle.description}
            </p>
          </div>

          <Separator className="my-6 md:my-8" />

          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Acessórios</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {vehicle.product_accessories?.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="justify-start py-2 px-4 text-sm"
                >
                  {item.accessory}
                </Badge>
              ))}
            </div>
          </div>

          {similarVehicles && similarVehicles.length > 0 && (
            <>
              <Separator className="my-6 md:my-8" />
              <VehicleSimilar vehicles={similarVehicles} />
            </>
          )}

          <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <DialogContent className="max-w-screen-lg w-full p-0 bg-black">
              <VehicleImageGallery
                images={vehicle.product_images || []}
                title={vehicle.title}
                imageFeature={vehicle.image_feature}
                currentImageIndex={currentImageIndex}
                onPrevImage={handlePrevImage}
                onNextImage={handleNextImage}
                onImageClick={() => setLightboxOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VehicleDetails;