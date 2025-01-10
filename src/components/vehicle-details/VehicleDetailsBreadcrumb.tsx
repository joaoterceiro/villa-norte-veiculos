import { ChevronRight, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface VehicleDetailsBreadcrumbProps {
  title: string;
}

export const VehicleDetailsBreadcrumb = ({ title }: VehicleDetailsBreadcrumbProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4 md:mb-6">
      <ol className="flex items-center space-x-2 text-sm md:text-base">
        <li>
          <Link to="/" className="text-muted hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-muted" />
        </li>
        <li>
          <Link to="/carros" className="text-muted hover:text-primary transition-colors">
            Carros
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-muted" />
        </li>
        <li>
          <span className="text-primary font-medium">{title}</span>
        </li>
      </ol>
      <Button
        variant="ghost"
        size="sm"
        className="text-muted hover:text-primary"
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Compartilhar</span>
      </Button>
    </div>
  );
};