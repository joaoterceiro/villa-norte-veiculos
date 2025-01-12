import { VehicleImageGallery } from "@/components/VehicleImageGallery";
import { VehicleInfoPanel } from "@/components/VehicleInfoPanel";
import { VehicleSpecifications } from "@/components/VehicleSpecifications";
import { VehicleSimilar } from "@/components/VehicleSimilar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FinancingForm } from "@/components/FinancingForm";
import { motion } from "framer-motion";

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
  similarVehicles = [],
}: VehicleDetailsContentProps) => {
  const specifications = [
    { label: "Marca", value: vehicle.make, icon: "car" },
    { label: "Modelo", value: vehicle.model, icon: "tag" },
    { label: "Ano", value: vehicle.year, icon: "calendar" },
    { label: "Versão", value: vehicle.base_model, icon: "layers" },
    { label: "Cor", value: vehicle.color, icon: "palette" },
    { label: "Combustível", value: vehicle.fuel_type, icon: "fuel" },
    { label: "Portas", value: vehicle.doors, icon: "door" },
    { label: "Transmissão", value: vehicle.transmission, icon: "settings" },
    { label: "Motor", value: vehicle.engine, icon: "gauge" },
    { label: "Quilometragem", value: vehicle.mileage?.toLocaleString("pt-BR"), icon: "activity" }
  ];

  return (
    <div className="max-w-[2000px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-7 xl:col-span-8"
        >
          <VehicleImageGallery
            images={vehicle.product_images || []}
            title={vehicle.title}
            imageFeature={vehicle.image_feature}
            currentImageIndex={currentImageIndex}
            onPrevImage={onPrevImage}
            onNextImage={onNextImage}
            onImageClick={() => onLightboxChange(true)}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 lg:col-span-5 xl:col-span-4"
        >
          <div className="lg:sticky lg:top-24">
            <VehicleInfoPanel
              title={vehicle.title}
              condition={vehicle.condition}
              price={vehicle.price}
              location="São José dos Campos"
              category={vehicle.category}
              downloadUrl={vehicle.download}
            />
          </div>
        </motion.div>
      </div>

      <Separator className="my-12 md:my-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-900">Especificações</h2>
        <VehicleSpecifications specifications={specifications} />
      </motion.div>

      <Separator className="my-12 md:my-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6 bg-gray-50/50 p-8 rounded-2xl"
      >
        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-900">Descrição</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base md:text-lg">
            {vehicle.description}
          </p>
        </div>
      </motion.div>

      <Separator className="my-12 md:my-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-900">Acessórios</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {vehicle.product_accessories?.map((item: any, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className="justify-start py-2 md:py-3 px-3 md:px-4 text-sm md:text-base hover:bg-gray-50 transition-colors duration-200"
            >
              {item.accessory}
            </Badge>
          ))}
        </div>
      </motion.div>

      {similarVehicles && similarVehicles.length > 0 && (
        <>
          <Separator className="my-12 md:my-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <VehicleSimilar vehicles={similarVehicles} />
          </motion.div>
        </>
      )}

      <Dialog open={lightboxOpen} onOpenChange={onLightboxChange}>
        <DialogContent className="max-w-screen-2xl w-full p-0 bg-black/95">
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
        <DialogContent className="sm:max-w-[500px]">
          <FinancingForm 
            onSuccess={() => onFinancingChange(false)}
            vehicleTitle={vehicle.title}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};