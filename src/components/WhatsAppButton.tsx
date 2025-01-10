import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const WhatsAppButton = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["portal-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portal_settings")
        .select("whatsapp_number")
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    // Hide button on admin routes
    setIsVisible(!location.pathname.startsWith("/admin"));
  }, [location]);

  const handleClick = () => {
    if (!settings?.whatsapp_number) return;
    
    const message = encodeURIComponent("Olá! Gostaria de mais informações.");
    const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isVisible || !settings?.whatsapp_number) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "flex items-center justify-center",
          "w-14 h-14 md:w-16 md:h-16",
          "rounded-full shadow-lg",
          "bg-[#25D366] hover:bg-[#20bc5a]",
          "transition-all duration-300 ease-in-out",
          "animate-pulse hover:animate-none",
          "hover:shadow-xl"
        )}
        onClick={handleClick}
        aria-label="Abrir WhatsApp"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
        )}
      </motion.button>
    </AnimatePresence>
  );
};