import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VehicleImageGalleryProps {
  images: Array<{ image_url: string; image_url_large?: string }>;
  title: string;
  imageFeature: string;
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  onImageClick: () => void;
}

export const VehicleImageGallery = ({
  images,
  title,
  imageFeature,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  onImageClick,
}: VehicleImageGalleryProps) => {
  const hasImages = images.length > 0;
  const totalImages = hasImages ? images.length : 0;

  return (
    <div className="relative h-full rounded-2xl bg-gradient-to-b from-[#f5f5f5] to-[#fafafa] overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.05)] transition-all duration-300">
      {/* Base Circular com Reflexo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.02]" />
      
      {/* Container Principal da Imagem */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={hasImages ? images[currentImageIndex].image_url : imageFeature}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            src={hasImages ? images[currentImageIndex].image_url : imageFeature}
            alt={title}
            className="w-full h-full object-contain cursor-zoom-in p-4"
            onClick={onImageClick}
          />
        </AnimatePresence>

        {/* Controles de Navegação */}
        {hasImages && (
          <>
            <button
              onClick={onPrevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-black/10 backdrop-blur hover:border-primary/30 hover:bg-white transition-all duration-200 flex items-center justify-center group"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors duration-200" />
            </button>
            <button
              onClick={onNextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-black/10 backdrop-blur hover:border-primary/30 hover:bg-white transition-all duration-200 flex items-center justify-center group"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors duration-200" />
            </button>
          </>
        )}

        {/* Contador de Imagens */}
        {hasImages && (
          <div className="absolute bottom-6 right-6 px-3 py-1.5 bg-white/90 backdrop-blur rounded text-[13px] font-medium tracking-[-0.01em] text-[#666] border border-black/5">
            {currentImageIndex + 1} / {totalImages}
          </div>
        )}

        {/* Botão Fullscreen */}
        <button
          onClick={onImageClick}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 border border-black/10 backdrop-blur hover:border-primary/30 hover:bg-white transition-all duration-200 flex items-center justify-center group"
          aria-label="Ver em tela cheia"
        >
          <Expand className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors duration-200" />
        </button>
      </div>
    </div>
  );
};