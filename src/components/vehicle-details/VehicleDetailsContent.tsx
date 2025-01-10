import { VehicleImageGallery } from "@/components/VehicleImageGallery";
import { VehicleInfoPanel } from "@/components/VehicleInfoPanel";
import { VehicleSpecifications } from "@/components/VehicleSpecifications";
import { VehicleSimilar } from "@/components/VehicleSimilar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FinancingForm } from "@/components/FinancingForm";

interface VehicleDetailsContentProps {
  vehicle: any;
  currentImageIndex: number;
  lightboxOpen: boolean;
  financingOpen: boolean;
  onPrevImage: () => void;
  onNextImage: () => void;
  onLightboxChange: (open: boolean) => void;
  onFinancingChange: (open: boolean) => void;
  similarVehicles?: any[];
}

export const VehicleDetailsContent = ({
  vehicle,
  currentImageIndex,
  lightboxOpen,
  financingOpen,
  onPrevImage,
  onNextImage,
  onLightboxChange,
  onFinancingChange,
  similarVehicles,
}: VehicleDetailsContentProps) => {
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6">
        <VehicleImageGallery
          images={vehicle.product_images || []}
          title={vehicle.title}
          imageFeature={vehicle.image_feature}
          currentImageIndex={currentImageIndex}
          onPrevImage={onPrevImage}
          onNextImage={onNextImage}
          onImageClick={() => onLightboxChange(true)}
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
          {vehicle.product_accessories?.map((item: any, index: number) => (
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

      <Dialog open={lightboxOpen} onOpenChange={onLightboxChange}>
        <DialogContent className="max-w-screen-lg w-full p-0 bg-black">
          <VehicleImageGallery
            images={vehicle.product_images || []}
            title={vehicle.title}
            imageFeature={vehicle.image_feature}
            currentImageIndex={currentImageIndex}
            onPrevImage={onPrevImage}
            onNextImage={onNextImage}
            onImageClick={() => onLightboxChange(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={financingOpen} onOpenChange={onFinancingChange}>
        <DialogContent>
          <FinancingForm 
            onSuccess={() => onFinancingChange(false)}
            vehicleTitle={vehicle.title}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};