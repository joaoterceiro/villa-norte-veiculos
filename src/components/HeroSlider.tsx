import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<{
    desktop_image_url: string;
    mobile_image_url: string;
    link?: string | null;
  }[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchSlides = async () => {
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
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return null;
  }

  const renderSlideContent = (slide: typeof slides[0]) => (
    <img
      src={isMobile ? slide.mobile_image_url : slide.desktop_image_url}
      alt=""
      className="h-full w-full object-cover"
    />
  );

  return (
    <div className="relative h-[300px] overflow-hidden sm:h-[400px] md:h-[500px]">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => {
          const style = { left: `${index * 100}%` };
          
          return slide.link ? (
            <Link
              key={index}
              to={slide.link}
              className="absolute inset-0 h-full w-full"
              style={style}
            >
              {renderSlideContent(slide)}
            </Link>
          ) : (
            <div
              key={index}
              className="absolute inset-0 h-full w-full"
              style={style}
            >
              {renderSlideContent(slide)}
            </div>
          );
        })}
      </div>
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/40 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/40 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}
    </div>
  );
};