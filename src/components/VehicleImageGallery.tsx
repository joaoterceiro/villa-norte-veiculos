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
    <div className="relative h-[85vh] rounded-3xl bg-[#f5f5f5] overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]">
      {/* Circular Base with Reflection */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
      
      {/* Main Image Container */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={hasImages ? images[currentImageIndex].image_url : imageFeature}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            src={hasImages ? images[currentImageIndex].image_url : imageFeature}
            alt={title}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={onImageClick}
          />
        </AnimatePresence>

        {/* Navigation Controls */}
        {hasImages && (
          <>
            <button
              onClick={onPrevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-white/90 backdrop-blur-lg hover:bg-white/95 shadow-lg transition-all duration-200 flex items-center justify-center group"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-[#1d1d1f] transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={onNextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-white/90 backdrop-blur-lg hover:bg-white/95 shadow-lg transition-all duration-200 flex items-center justify-center group"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-[#1d1d1f] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </>
        )}

        {/* Progress Bar */}
        {hasImages && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-black/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#FF5722] transition-all duration-300 ease-out"
              style={{ width: `${((currentImageIndex + 1) / totalImages) * 100}%` }}
            />
          </div>
        )}

        {/* Image Counter */}
        {hasImages && (
          <div className="absolute bottom-6 right-6 text-[13px] font-medium tracking-[-0.01em] text-[#86868b]">
            {currentImageIndex + 1} / {totalImages}
          </div>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={onImageClick}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-lg hover:bg-white/95 shadow-lg transition-all duration-200 flex items-center justify-center"
          aria-label="View fullscreen"
        >
          <Expand className="w-5 h-5 text-[#1d1d1f]" />
        </button>
      </div>
    </div>
  );
};