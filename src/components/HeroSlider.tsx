import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Slide {
  desktop_image_url: string;
  mobile_image_url: string;
  link?: string | null;
}

const FALLBACK_IMAGE = "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/banner-home-web2.png";

export const HeroSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [error, setError] = useState(false);

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
          // Se não houver slides, crie um slide com a imagem de fallback
          setSlides([{
            desktop_image_url: FALLBACK_IMAGE,
            mobile_image_url: FALLBACK_IMAGE,
            link: null
          }]);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        setError(true);
        // Em caso de erro, use a imagem de fallback
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
    return (
      <div className="h-[500px] w-full bg-gray-100 animate-pulse" />
    );
  }

  const renderSlide = (slide: Slide, index: number) => {
    const imageUrl = isMobile ? slide.mobile_image_url : slide.desktop_image_url;
    
    const slideContent = (
      <div 
        className="relative w-full h-full flex-shrink-0"
        style={{ flex: '0 0 100%' }}
      >
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = FALLBACK_IMAGE;
          }}
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