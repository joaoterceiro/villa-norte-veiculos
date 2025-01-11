import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FinancingForm } from "./FinancingForm";
import { TopBanner } from "./TopBanner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { DesktopMenu } from "./navbar/DesktopMenu";
import { MobileMenu } from "./navbar/MobileMenu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFinancingModal, setShowFinancingModal] = useState(false);

  const { data: settings } = useQuery({
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

  return (
    <>
      <TopBanner />
      <nav className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Logo />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop menu */}
            <DesktopMenu
              whatsappNumber={settings?.whatsapp_number}
              onFinancingClick={() => setShowFinancingModal(true)}
            />

            {/* Mobile menu */}
            <MobileMenu
              isOpen={isMenuOpen}
              whatsappNumber={settings?.whatsapp_number}
              onFinancingClick={() => setShowFinancingModal(true)}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        </div>

        <Dialog open={showFinancingModal} onOpenChange={setShowFinancingModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Simulação de Financiamento</DialogTitle>
            </DialogHeader>
            <FinancingForm
              onSuccess={() => setShowFinancingModal(false)}
              vehicleTitle="Simulação Geral"
            />
          </DialogContent>
        </Dialog>
      </nav>
    </>
  );
};