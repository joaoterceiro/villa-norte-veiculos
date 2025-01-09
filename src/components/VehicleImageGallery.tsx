import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="col-span-12 lg:col-span-8 relative rounded-lg overflow-hidden bg-gray-100">
      <img
        src={hasImages ? images[currentImageIndex].image_url : imageFeature}
        alt={title}
        className="w-full aspect-[4/3] object-cover cursor-pointer"
        onClick={onImageClick}
      />
      {hasImages && (
        <>
          <button
            onClick={onPrevImage}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 md:p-2 rounded-full hover:bg-white/90 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <button
            onClick={onNextImage}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 md:p-2 rounded-full hover:bg-white/90 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </>
      )}
    </div>
  );
};