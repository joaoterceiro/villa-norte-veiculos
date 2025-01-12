import { memo } from "react";
import { Link } from "react-router-dom";
import { SlideImage } from "./SlideImage";

interface SlideContentProps {
  mobileUrl: string;
  desktopUrl: string;
  link?: string | null;
  isFirstSlide: boolean;
  index: number;
}

export const SlideContent = memo(({ mobileUrl, desktopUrl, link, isFirstSlide, index }: SlideContentProps) => {
  const content = (
    <div className="relative w-full h-full flex-shrink-0">
      <SlideImage
        mobileUrl={mobileUrl}
        desktopUrl={desktopUrl}
        isFirstSlide={isFirstSlide}
      />
    </div>
  );

  if (link) {
    return (
      <Link
        key={index}
        to={link}
        className="w-full h-full flex-shrink-0"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="w-full h-full flex-shrink-0">
      {content}
    </div>
  );
});

SlideContent.displayName = "SlideContent";