import { memo } from "react";

interface SlideImageProps {
  mobileUrl: string;
  desktopUrl: string;
  isFirstSlide: boolean;
}

export const SlideImage = memo(({ mobileUrl, desktopUrl, isFirstSlide }: SlideImageProps) => {
  const isMobile = window.innerWidth < 768;

  return (
    <img
      src={isMobile ? mobileUrl : desktopUrl}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      loading={isFirstSlide ? "eager" : "lazy"}
      fetchpriority={isFirstSlide ? "high" : "auto"}
    />
  );
});

SlideImage.displayName = "SlideImage";