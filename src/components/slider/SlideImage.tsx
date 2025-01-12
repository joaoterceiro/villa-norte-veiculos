import { memo, useEffect, useState } from "react";

interface SlideImageProps {
  mobileUrl: string;
  desktopUrl: string;
  isFirstSlide: boolean;
}

export const SlideImage = memo(({ mobileUrl, desktopUrl, isFirstSlide }: SlideImageProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <img
      src={isMobile ? mobileUrl : desktopUrl}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      loading={isFirstSlide ? "eager" : "lazy"}
    />
  );
});

SlideImage.displayName = "SlideImage";