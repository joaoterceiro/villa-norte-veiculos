import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideNavigationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const SlideNavigation = ({ onPrevClick, onNextClick }: SlideNavigationProps) => {
  return (
    <>
      <button
        onClick={onPrevClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={onNextClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white" size={24} />
      </button>
    </>
  );
};

SlideNavigation.displayName = "SlideNavigation";