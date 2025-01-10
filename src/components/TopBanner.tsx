import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-secondary">
      <div className="max-w-[2000px] mx-auto">
        <Link to="/carros">
          <img
            src="/lovable-uploads/4f79c376-f92c-46c3-bf53-706f6926ea5f.png"
            alt="Mais de 100 veículos esperando por você"
            className="w-full min-h-[60px] md:min-h-[80px] h-auto object-cover"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white hover:bg-white/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar banner</span>
        </Button>
      </div>
    </div>
  );
};