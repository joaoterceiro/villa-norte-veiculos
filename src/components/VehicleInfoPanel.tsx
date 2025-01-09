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
      <div className="space-y-6 bg-background p-6 rounded-lg shadow-sm border">
        <div>
          <div className="flex items-center gap-2 text-base text-[#8A8A8A] mb-2">
            <span className="uppercase">{condition}</span>
            {location && (
              <>
                <span>|</span>
                <span>{location}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold text-[#14181B]">{title}</h1>
          <div className="mt-4">
            <span className="text-4xl font-bold text-[#FF6500]">
              {formatPrice(price || 0)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full text-lg" 
            size="lg"
            onClick={handleWhatsAppClick}
          >
            <MessageSquare className="w-6 h-6 mr-2" />
            Tenho interesse
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-lg" 
            size="lg"
            onClick={() => setShowFinancingModal(true)}
          >
            <Calculator className="w-6 h-6 mr-2" />
            Faça uma simulação
          </Button>
        </div>

        {downloadUrl && (
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full text-lg text-secondary hover:text-secondary-foreground"
              size="lg"
              onClick={() => window.open(downloadUrl, "_blank")}
            >
              <Download className="w-5 h-5 mr-2" />
              Baixe as fotos deste anúncio
            </Button>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#8A8A8A]" />
            <span className="text-base text-[#8A8A8A]">
              Veículos revisados e periciados
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#8A8A8A]" />
            <span className="text-base text-[#8A8A8A]">
              Bônus na troca
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#8A8A8A]" />
            <span className="text-base text-[#8A8A8A]">
              90 dias de garantia da loja
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#8A8A8A]" />
            <span className="text-base text-[#8A8A8A]">
              Entrada Parcelada em até 21x
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#8A8A8A]" />
            <span className="text-base text-[#8A8A8A]">
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