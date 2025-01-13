import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const brands = [
  { name: "Volkswagen", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/volkswagen.jpg" },
  { name: "Fiat", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/fiat.jpg" },
  { name: "Chevrolet", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/chevrolet.jpg" },
  { name: "Ford", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/ford.jpg" },
  { name: "Honda", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/honda.jpg" },
  { name: "Jeep", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/jeep.jpg" },
  { name: "Renault", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/renault.jpg" },
  { name: "Hyundai", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/hyundai.jpg" },
  { name: "Mitsubishi", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/mitsubishi.jpg" },
  { name: "Land Rover", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/land rover.jpg" },
  { name: "Mercedes", logo: "https://bwghpkijwhhkqfcibyyf.supabase.co/storage/v1/object/public/slides/marcas/mercedes-benz.jpg" },
];

export const BrandLogos = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const handleBrandClick = (brandName: string) => {
    if (!isDragging) {
      const formattedBrand = brandName.toLowerCase();
      navigate(`/marca/${formattedBrand}`);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftShadow(scrollLeft > 0);
    setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="py-16 bg-gray-50/50">
      <div className="container mx-auto max-w-[1400px] px-1 sm:px-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          Encontre o carro dos seus sonhos por marca
        </h2>
        <p className="text-center text-muted mb-12 text-base max-w-3xl mx-auto">
          Explore nossa seleção exclusiva e descubra as melhores opções de veículos das marcas mais renomadas.
        </p>
        <div className="relative">
          {/* Left shadow */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50/50 to-transparent pointer-events-none z-10 transition-opacity duration-200",
              showLeftShadow ? "opacity-100" : "opacity-0"
            )}
          />
          
          {/* Right shadow */}
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none z-10 transition-opacity duration-200",
              showRightShadow ? "opacity-100" : "opacity-0"
            )}
          />

          <div
            ref={scrollContainerRef}
            className={cn(
              "overflow-x-auto scrollbar-hide",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={stopDragging}
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div className="flex gap-3 px-4 min-w-max">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => handleBrandClick(brand.name)}
                  className={cn(
                    "group shrink-0 transition-transform duration-200",
                    !isDragging && "hover:scale-105"
                  )}
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 w-[120px] aspect-square flex items-center justify-center relative overflow-hidden scroll-snap-align-start">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-auto object-contain transition-all duration-300 group-hover:scale-110"
                      draggable="false"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};