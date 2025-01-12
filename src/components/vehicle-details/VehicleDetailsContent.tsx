import { VehicleImageGallery } from "@/components/VehicleImageGallery";
import { VehicleInfoPanel } from "@/components/VehicleInfoPanel";
import { VehicleSpecifications } from "@/components/VehicleSpecifications";
import { VehicleSimilar } from "@/components/VehicleSimilar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FinancingForm } from "@/components/FinancingForm";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

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
    { label: "Marca", value: vehicle.make, icon: "car" as const },
    { label: "Modelo", value: vehicle.model, icon: "tag" as const },
    { label: "Ano", value: vehicle.year, icon: "calendar" as const },
    { label: "Versão", value: vehicle.base_model, icon: "layers" as const },
    { label: "Cor", value: vehicle.color, icon: "palette" as const },
    { label: "Combustível", value: vehicle.fuel_type, icon: "fuel" as const },
    { label: "Portas", value: vehicle.doors, icon: "door" as const },
    { label: "Transmissão", value: vehicle.transmission, icon: "settings" as const },
    { label: "Motor", value: vehicle.engine, icon: "gauge" as const },
    { label: "Quilometragem", value: vehicle.mileage?.toLocaleString("pt-BR"), icon: "activity" as const }
  ];

  return (
    <div className="max-w-[2000px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-8 xl:col-span-9"
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
          className="col-span-12 lg:col-span-4 xl:col-span-3"
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

      <Separator className="my-16 md:my-24" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-light tracking-tight text-gray-900 dark:text-white">
          Especificações
        </h2>
        <VehicleSpecifications specifications={specifications} />
      </motion.div>

      <Separator className="my-16 md:my-24" />

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
              className="group flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-gray-700 bg-white/50 hover:bg-gray-50/80 border border-gray-200/80 rounded-xl transition-all duration-200 backdrop-blur-sm hover:border-gray-300/80 dark:bg-gray-900/50 dark:border-gray-800/80 dark:text-gray-300 dark:hover:border-gray-700/80"
            >
              <Tag className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors duration-200" strokeWidth={1.5} />
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
