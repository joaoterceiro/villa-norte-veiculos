import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Slide {
  desktop_image_url: string;
  mobile_image_url: string;
  link?: string | null;
}

export const HeroSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from("slides")
          .select("desktop_image_url, mobile_image_url, link")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (error) throw error;
        if (data) setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

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

  if (isLoading || slides.length === 0) {
    return null;
  }

  const renderSlide = (slide: Slide, index: number) => {
    const slideContent = (
      <div 
        className="w-full h-full relative"
        style={{ flex: '0 0 100%' }}
      >
        <img
          src={isMobile ? slide.mobile_image_url : slide.desktop_image_url}
          alt=""
          className="w-full h-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
        />
      </div>
    );

    return slide.link ? (
      <Link key={index} to={slide.link} className="block h-full">
        {slideContent}
      </Link>
    ) : (
      <div key={index} className="block h-full">
        {slideContent}
      </div>
    );
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        </>
      )}
    </div>
  );
};

HeroSlider.displayName = "HeroSlider";