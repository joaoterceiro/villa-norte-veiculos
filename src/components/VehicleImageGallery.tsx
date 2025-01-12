import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden">
        <motion.img
          key={hasImages ? images[currentImageIndex].image_url : imageFeature}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          src={hasImages ? images[currentImageIndex].image_url : imageFeature}
          alt={title}
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={onImageClick}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {hasImages && (
        <>
          <button
            onClick={onPrevImage}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 p-2 md:p-3 rounded-full transition-colors duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={onNextImage}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 p-2 md:p-3 rounded-full transition-colors duration-200"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        </>
      )}
    </div>
  );
};