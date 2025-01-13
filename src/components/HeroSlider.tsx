import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SlideContent } from "./slider/SlideContent";
import { SlideNavigation } from "./slider/SlideNavigation";

const FALLBACK_IMAGE = "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/banner-home-web2.png";

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
        const { data, error: fetchError } = await supabase
          .from("slides")
          .select("desktop_image_url, mobile_image_url, link")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (fetchError) throw fetchError;
        
        if (data && data.length > 0) {
          setSlides(data);
        } else {
          setSlides([{
            desktop_image_url: FALLBACK_IMAGE,
            mobile_image_url: FALLBACK_IMAGE,
            link: null
          }]);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        setSlides([{
          desktop_image_url: FALLBACK_IMAGE,
          mobile_image_url: FALLBACK_IMAGE,
          link: null
        }]);
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

  if (isLoading) {
    return <div className="h-[500px] w-full bg-gray-100 animate-pulse" />;
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => (
          <SlideContent
            key={index}
            imageUrl={isMobile ? slide.mobile_image_url : slide.desktop_image_url}
            link={slide.link}
            index={index}
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
};

HeroSlider.displayName = "HeroSlider";