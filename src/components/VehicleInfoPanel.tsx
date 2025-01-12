import { Button } from "@/components/ui/button";
import { MessageSquare, Calculator, CheckCircle } from "lucide-react";
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
      <div className="w-full col-span-12 lg:col-span-4 bg-white/80 backdrop-blur-[20px] p-8 rounded-[20px] transition-all duration-300">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium tracking-[0.1em] uppercase text-[#86868b] mb-6">
            <span>{condition}</span>
            {location && (
              <>
                <span>|</span>
                <span>{location}</span>
              </>
            )}
          </div>
          <h1 className="text-[40px] font-bold tracking-[-0.003em] leading-[1.1] text-[#1d1d1f] my-6 break-words">
            {title}
          </h1>
          <div className="mt-8 mb-8">
            <span className="text-[48px] font-semibold text-[#1d1d1f] inline-flex items-baseline">
              {formatPrice(price || 0)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full h-auto text-[17px] font-normal tracking-[-0.022em] px-8 py-[18px] rounded-[980px] bg-[#0071e3] hover:bg-[#0077ED] hover:scale-[0.98] transition-all duration-300"
            onClick={handleWhatsAppClick}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Tenho interesse
          </Button>
          <Button 
            variant="ghost"
            className="w-full h-auto text-[17px] font-normal tracking-[-0.022em] px-8 py-[18px] text-[#0071e3] hover:bg-[#0071e3]/5 hover:scale-[0.98] transition-all duration-300"
            onClick={() => setShowFinancingModal(true)}
          >
            <Calculator className="w-5 h-5 mr-2" />
            Faça uma simulação
          </Button>
        </div>

        <div className="mt-10 pt-8 border-t border-[#d2d2d7] space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#0071e3] flex-shrink-0" strokeWidth={1.5} />
            <span className="text-[17px] leading-[1.47059] tracking-[-0.022em] text-[#1d1d1f]">
              Veículos revisados e periciados
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#0071e3] flex-shrink-0" strokeWidth={1.5} />
            <span className="text-[17px] leading-[1.47059] tracking-[-0.022em] text-[#1d1d1f]">
              Bônus na troca
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#0071e3] flex-shrink-0" strokeWidth={1.5} />
            <span className="text-[17px] leading-[1.47059] tracking-[-0.022em] text-[#1d1d1f]">
              90 dias de garantia da loja
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#0071e3] flex-shrink-0" strokeWidth={1.5} />
            <span className="text-[17px] leading-[1.47059] tracking-[-0.022em] text-[#1d1d1f]">
              Entrada Parcelada em até 21x
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#0071e3] flex-shrink-0" strokeWidth={1.5} />
            <span className="text-[17px] leading-[1.47059] tracking-[-0.022em] text-[#1d1d1f]">
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