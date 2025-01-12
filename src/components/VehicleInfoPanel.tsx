import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calculator, CheckCircle, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { FinancingForm } from "./FinancingForm";

interface VehicleInfoPanelProps {
  title: string;
  condition: string;
  location?: string;
  price: number;
  category?: string;
  downloadUrl?: string;
}

export const VehicleInfoPanel = ({
  title,
  condition,
  location,
  price,
  category = "carro",
  downloadUrl,
}: VehicleInfoPanelProps) => {
  const [showFinancingModal, setShowFinancingModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const { data: settings } = useQuery({
    queryKey: ["portal-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portal_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleWhatsAppClick = () => {
    if (!settings?.whatsapp_number) return;

    const message = encodeURIComponent(
      `Oi, acabei de ver o ${category} ${title} e queria saber mais detalhes de como adquirir.`
    );
    const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="w-full col-span-12 lg:col-span-4 space-y-6 md:space-y-8 bg-white p-6 md:p-8 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-black/5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#86868b] mb-4 md:mb-6">
            <span>{condition}</span>
            {location && (
              <>
                <span>|</span>
                <span>{location}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl md:text-[32px] font-semibold leading-tight tracking-[-0.003em] text-[#1d1d1f] break-words">{title}</h1>
          <div className="mt-6 md:mt-8">
            <span className="text-3xl md:text-[40px] font-semibold text-primary inline-flex items-baseline">
              {formatPrice(price || 0)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full text-base md:text-[17px] font-medium tracking-[-0.022em] h-auto py-4 md:py-[18px] px-6 md:px-[31px] shadow-[0_2px_8px_rgba(255,87,34,0.2)] hover:translate-y-[-1px] transition-all duration-200 ease-out" 
            onClick={handleWhatsAppClick}
          >
            <MessageSquare className="w-[18px] h-[18px] mr-2" />
            Tenho interesse
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-base md:text-[17px] font-medium tracking-[-0.022em] h-auto py-4 md:py-[18px] px-6 md:px-[31px] border-primary text-primary hover:bg-primary/5 hover:translate-y-[-1px] transition-all duration-200 ease-out" 
            onClick={() => setShowFinancingModal(true)}
          >
            <Calculator className="w-[18px] h-[18px] mr-2" />
            Faça uma simulação
          </Button>
        </div>

        {downloadUrl && (
          <div className="pt-5 md:pt-6 border-t border-[#f5f5f5]">
            <Button
              variant="outline"
              className="w-full text-sm md:text-[15px] text-[#86868b] hover:text-[#666666] h-auto py-4 md:py-[18px] px-6 md:px-[31px] hover:translate-y-[-1px] transition-all duration-200 ease-out"
              onClick={() => window.open(downloadUrl, "_blank")}
            >
              <Download className="w-[18px] h-[18px] mr-2" />
              Baixe as fotos deste anúncio
            </Button>
          </div>
        )}

        <div className="space-y-3 pt-5 md:pt-6 border-t border-[#f5f5f5]">
          <div className="flex items-start md:items-center gap-3">
            <CheckCircle className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-0.5 md:mt-0" />
            <span className="text-sm md:text-[15px] leading-[1.4] text-[#333333]">
              Veículos revisados e periciados
            </span>
          </div>
          <div className="flex items-start md:items-center gap-3">
            <CheckCircle className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-0.5 md:mt-0" />
            <span className="text-sm md:text-[15px] leading-[1.4] text-[#333333]">
              Bônus na troca
            </span>
          </div>
          <div className="flex items-start md:items-center gap-3">
            <CheckCircle className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-0.5 md:mt-0" />
            <span className="text-sm md:text-[15px] leading-[1.4] text-[#333333]">
              90 dias de garantia da loja
            </span>
          </div>
          <div className="flex items-start md:items-center gap-3">
            <CheckCircle className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-0.5 md:mt-0" />
            <span className="text-sm md:text-[15px] leading-[1.4] text-[#333333]">
              Entrada Parcelada em até 21x
            </span>
          </div>
          <div className="flex items-start md:items-center gap-3">
            <CheckCircle className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-0.5 md:mt-0" />
            <span className="text-sm md:text-[15px] leading-[1.4] text-[#333333]">
              Pague em até 60 Meses
            </span>
          </div>
        </div>
      </div>

      <Dialog open={showFinancingModal} onOpenChange={setShowFinancingModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Simulação de Financiamento</DialogTitle>
          </DialogHeader>
          <FinancingForm
            onSuccess={() => setShowFinancingModal(false)}
            vehicleTitle={title}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};