import { useState } from "react";

const FALLBACK_IMAGE = "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/banner-home-web2.png";

interface SlideImageProps {
  src: string;
  loading?: "eager" | "lazy";
}

export const SlideImage = ({ src, loading = "lazy" }: SlideImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt=""
      className="w-full h-full object-cover"
      loading={loading}
      onError={() => setImageSrc(FALLBACK_IMAGE)}
    />
  );
};

SlideImage.displayName = "SlideImage";