import { ChevronRight, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface VehicleDetailsBreadcrumbProps {
  title: string;
}

export const VehicleDetailsBreadcrumb = ({ title }: VehicleDetailsBreadcrumbProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        description: "Link copiado para a área de transferência!",
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-4 md:py-6"
    >
      <ol className="flex items-center space-x-2 text-sm md:text-base flex-wrap">
        <li>
          <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </li>
        <li>
          <Link to="/veiculos" className="text-gray-500 hover:text-primary transition-colors">
            Veículos
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </li>
        <li className="text-gray-900 font-medium break-all line-clamp-1 md:line-clamp-none">
          {title}
        </li>
      </ol>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0 ml-2"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        <span className="sr-only">Compartilhar</span>
      </Button>
    </motion.div>
  );
};