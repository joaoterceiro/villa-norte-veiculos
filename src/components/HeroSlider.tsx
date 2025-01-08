import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<{
    title: string;
    desktop_image_url: string;
    mobile_image_url: string;
    link?: string | null;
  }[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("slides")
        .select("title, desktop_image_url, mobile_image_url, link")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching slides:", error);
        return;
      }

      if (data) {
        setSlides(data);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => {
          const SlideWrapper = slide.link ? Link : "div";
          const wrapperProps = slide.link ? { to: slide.link } : {};

          return (
            <SlideWrapper
              key={index}
              {...wrapperProps}
              className="absolute inset-0 w-full h-full"
              style={{ left: `${index * 100}%` }}
            >
              <img
                src={isMobile ? slide.mobile_image_url : slide.desktop_image_url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
                <div className="container mx-auto h-full flex items-center">
                  <h1 className="text-white text-5xl font-bold max-w-2xl">
                    {slide.title}
                  </h1>
                </div>
              </div>
            </SlideWrapper>
          );
        })}
      </div>
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        </>
      )}
    </div>
  );
};