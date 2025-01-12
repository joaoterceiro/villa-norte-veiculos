import { VehicleImageGallery } from "@/components/VehicleImageGallery";
import { VehicleInfoPanel } from "@/components/VehicleInfoPanel";
import { VehicleSpecifications } from "@/components/VehicleSpecifications";
import { VehicleSimilar } from "@/components/VehicleSimilar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FinancingForm } from "@/components/FinancingForm";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="max-w-[2000px] mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[65%] h-[400px] md:h-[600px]">
          <VehicleImageGallery
            images={vehicle.product_images || []}
            title={vehicle.title}
            imageFeature={vehicle.image_feature}
            currentImageIndex={currentImageIndex}
            onPrevImage={onPrevImage}
            onNextImage={onNextImage}
            onImageClick={() => onLightboxChange(true)}
          />
        </div>

        <div className="w-full md:w-[35%]">
          <div className="md:sticky md:top-24">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-xl md:text-2xl font-light tracking-tight text-gray-900 mb-4">
          Especificações
        </h2>
        <VehicleSpecifications specifications={specifications} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 bg-gray-50/50 p-6 md:p-8 rounded-2xl"
      >
        <h2 className="text-xl md:text-2xl font-light tracking-wide text-gray-900 mb-4">Descrição</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
            {vehicle.description}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-xl md:text-2xl font-light tracking-wide text-gray-900 mb-4">Acessórios</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <AnimatePresence>
            {vehicle.product_accessories?.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Badge
                  variant="outline"
                  className="group flex items-center gap-2 py-2 px-3 text-xs md:text-sm font-medium text-gray-700 bg-white/50 hover:bg-gray-50/80 border border-gray-200/80 rounded-xl transition-all duration-200 backdrop-blur-sm hover:border-gray-300/80 w-full"
                >
                  <Tag className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-primary transition-colors duration-200" strokeWidth={1.5} />
                  {item.accessory}
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {similarVehicles && similarVehicles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <VehicleSimilar vehicles={similarVehicles} />
        </motion.div>
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