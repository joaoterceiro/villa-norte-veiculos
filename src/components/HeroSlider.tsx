import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/lovable-uploads/53749d1f-9432-474d-b903-00ce2a9d61f7.png",
    title: "O CARRO QUE VOCÊ SEMPRE SONHOU ESTÁ AQUI NA VN.",
  },
  {
    image: "/placeholder.svg",
    title: "MAIS DE 100 VEÍCULOS ESPERANDO POR VOCÊ!",
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full"
            style={{ left: `${index * 100}%` }}
          >
            <img
              src={slide.image}
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
          </div>
        ))}
      </div>
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
    </div>
  );
};