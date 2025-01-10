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
import { FixedBottomBar } from "@/components/FixedBottomBar";
import { FinancingForm } from "@/components/FinancingForm";

const VehicleDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showFinancingModal, setShowFinancingModal] = useState(false);

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

  const { data: settings } = useQuery({
    queryKey: ["portal-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portal_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleWhatsAppClick = () => {
    if (!settings?.whatsapp_number || !vehicle) return;

    const message = encodeURIComponent(
      `Oi, acabei de ver o ${vehicle.category} ${vehicle.title} e queria saber mais detalhes de como adquirir.`
    );
    const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

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
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-lg">Carregando...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Veículo não encontrado</div>
        </div>
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
      <main className="min-h-screen bg-background pb-24">
        <div className="container mx-auto py-3 px-3 md:py-6 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6">
            <VehicleImageGallery
              images={vehicle.product_images || []}
              title={vehicle.title}
              imageFeature={vehicle.image_feature}
              currentImageIndex={currentImageIndex}
              onPrevImage={handlePrevImage}
              onNextImage={handleNextImage}
              onImageClick={() => setLightboxOpen(true)}
            />

            <VehicleInfoPanel
              title={vehicle.title}
              condition={vehicle.condition}
              price={vehicle.price}
              location="São José dos Campos"
              category={vehicle.category}
              downloadUrl={vehicle.download}
            />
          </div>

          <div className="mt-4 md:mt-6">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Especificações</h2>
            <VehicleSpecifications specifications={specifications} />
          </div>

          <Separator className="my-4 md:my-6" />

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Descrição</h2>
            <p className="text-[#666666] whitespace-pre-line text-sm md:text-base">
              {vehicle.description}
            </p>
          </div>

          <Separator className="my-4 md:my-6" />

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Acessórios</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
              {vehicle.product_accessories?.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="justify-start py-1 md:py-1.5 px-2 md:px-3 text-xs md:text-sm"
                >
                  {item.accessory}
                </Badge>
              ))}
            </div>
          </div>

          {similarVehicles && similarVehicles.length > 0 && (
            <>
              <Separator className="my-4 md:my-6" />
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

          <Dialog open={showFinancingModal} onOpenChange={setShowFinancingModal}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Simulação de Financiamento</DialogTitle>
              </DialogHeader>
              <FinancingForm
                onSuccess={() => setShowFinancingModal(false)}
                vehicleTitle={vehicle.title}
              />
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
      <FixedBottomBar
        onSimularClick={() => setShowFinancingModal(true)}
        onInteresseClick={handleWhatsAppClick}
      />
    </>
  );
};

export default VehicleDetails;