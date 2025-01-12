import { useState, useEffect, memo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";
import { SlideNavigation } from "./slider/SlideNavigation";
import { SlideContent } from "./slider/SlideContent";

export const HeroSlider = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<{
    desktop_image_url: string;
    mobile_image_url: string;
    link?: string | null;
  }[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("slides")
          .select("desktop_image_url, mobile_image_url, link")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (error) {
          console.error("Error fetching slides:", error);
          return;
        }

        if (data) {
          setSlides(data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isLoading) {
    return (
      <div className="h-[500px] w-full">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out will-change-transform"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => (
          <SlideContent
            key={index}
            index={index}
            mobileUrl={slide.mobile_image_url}
            desktopUrl={slide.desktop_image_url}
            link={slide.link}
            isFirstSlide={index === 0}
          />
        ))}
      </div>
      {slides.length > 1 && (
        <SlideNavigation
          onPrevClick={prevSlide}
          onNextClick={nextSlide}
        />
      )}
    </div>
  );
});

HeroSlider.displayName = "HeroSlider";