import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { VehicleDetailsBreadcrumb } from "@/components/vehicle-details/VehicleDetailsBreadcrumb";
import { VehicleDetailsContent } from "@/components/vehicle-details/VehicleDetailsContent";
import { VehicleMobileActions } from "@/components/vehicle-details/VehicleMobileActions";

const VehicleDetails = () => {
  const { vehicleId, slug } = useParams<{ vehicleId?: string; slug?: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [financingOpen, setFinancingOpen] = useState(false);
  const isMobile = useIsMobile();

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", vehicleId, slug],
    queryFn: async () => {
      let query = supabase
        .from("product")
        .select(`
          *,
          product_accessories (accessory),
          product_images (image_url, image_url_large)
        `);

      if (vehicleId) {
        query = query.eq("vehicle_id", vehicleId);
      } else if (slug) {
        query = query.eq("slug", slug);
      } else {
        throw new Error("Vehicle ID or slug is required");
      }

      const { data, error } = await query.single();

      if (error) {
        if (error.code === "PGRST116") {
          navigate("/404");
          return null;
        }
        throw error;
      }

      // Redirecionar para URL com slug se acessado por UUID
      if (vehicleId && data.slug && !window.location.pathname.includes("/s/")) {
        navigate(`/veiculos/s/${data.slug}`, { replace: true });
      }

      return data;
    },
    enabled: !!(vehicleId || slug),
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

  const { data: similarVehiclesData } = useQuery({
    queryKey: ["similar-vehicles", vehicle?.make, vehicle?.vehicle_id],
    enabled: !!(vehicle?.make && vehicle?.vehicle_id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicle_details")
        .select()
        .eq("make", vehicle.make)
        .neq("vehicle_id", vehicle.vehicle_id)
        .limit(5);

      if (error) throw error;
      return data;
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

  const handleWhatsAppClick = () => {
    if (!vehicle || !settings?.whatsapp_number) return;
    const message = `Olá! Tenho interesse no veículo: ${vehicle.title}`;
    const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-20 md:pb-0">
        <div className="container mx-auto py-3 px-3 md:py-6 md:px-6">
          <VehicleDetailsBreadcrumb title={vehicle.title} />
          
          <VehicleDetailsContent
            vehicle={vehicle}
            currentImageIndex={currentImageIndex}
            lightboxOpen={lightboxOpen}
            financingOpen={financingOpen}
            onPrevImage={handlePrevImage}
            onNextImage={handleNextImage}
            onLightboxChange={setLightboxOpen}
            onFinancingChange={setFinancingOpen}
            similarVehicles={similarVehiclesData}
          />
        </div>

        {isMobile && (
          <VehicleMobileActions
            onFinancingClick={() => setFinancingOpen(true)}
            onWhatsAppClick={handleWhatsAppClick}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default VehicleDetails;