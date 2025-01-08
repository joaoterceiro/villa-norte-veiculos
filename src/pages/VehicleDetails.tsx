import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { VehicleCard } from "@/components/VehicleCard";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Car,
  MessageSquare,
  Calculator,
  CheckCircle,
} from "lucide-react";

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
    return <div>Carregando...</div>;
  }

  if (!vehicle) {
    return <div>Veículo não encontrado</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

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

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carrossel de Imagens */}
        <div className="relative rounded-lg overflow-hidden bg-gray-100">
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

        {/* Rest of the vehicle details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted mb-2">
              <span className="uppercase">{vehicle.condition}</span>
            </div>
            <h1 className="text-2xl font-bold">{vehicle.title}</h1>
            <div className="mt-4">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(vehicle.price || 0)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full" size="lg">
              <MessageSquare className="w-5 h-5" />
              Tenho interesse
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Calculator className="w-5 h-5" />
              Faça uma simulação
            </Button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <CheckCircle className="w-4 h-4 mr-1" />
                Veículos revisados e periciados
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <CheckCircle className="w-4 h-4 mr-1" />
                Bônus na troca
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <CheckCircle className="w-4 h-4 mr-1" />
                90 dias de garantia da loja
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <CheckCircle className="w-4 h-4 mr-1" />
                Entrada Parcelada em até 21x
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <CheckCircle className="w-4 h-4 mr-1" />
                Pague em até 60 Meses
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Sobre o veículo</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Marca</div>
            <div className="font-medium">{vehicle.make}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Modelo</div>
            <div className="font-medium">{vehicle.model}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Ano</div>
            <div className="font-medium">{vehicle.year}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Versão</div>
            <div className="font-medium">{vehicle.base_model}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Cor</div>
            <div className="font-medium">{vehicle.color}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Combustível</div>
            <div className="font-medium">{vehicle.fuel_type}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Portas</div>
            <div className="font-medium">{vehicle.doors}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Transmissão</div>
            <div className="font-medium">{vehicle.transmission}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Motor</div>
            <div className="font-medium">{vehicle.engine}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-muted text-sm">Quilometragem</div>
            <div className="font-medium">
              {vehicle.mileage?.toLocaleString("pt-BR")}
            </div>
          </div>
        </div>
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

      {/* Lightbox Dialog */}
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
  );
};

export default VehicleDetails;
