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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};