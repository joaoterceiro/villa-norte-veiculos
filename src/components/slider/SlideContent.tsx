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
        to={link}
        className="block w-full h-full"
      >
        {content}
      </Link>
    );
  }

  return content;
});

SlideContent.displayName = "SlideContent";