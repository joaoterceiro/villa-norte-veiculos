import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calculator, CheckCircle } from "lucide-react";

interface VehicleInfoPanelProps {
  title: string;
  condition: string;
  location?: string;
  price: number;
}

export const VehicleInfoPanel = ({
  title,
  condition,
  location,
  price,
}: VehicleInfoPanelProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="space-y-6 bg-background p-6 rounded-lg shadow-sm border">
      <div>
        <div className="flex items-center gap-2 text-sm text-[#8A8A8A] mb-2">
          <span className="uppercase">{condition}</span>
          {location && (
            <>
              <span>|</span>
              <span>{location}</span>
            </>
          )}
        </div>
        <h1 className="text-2xl font-bold text-[#333333]">{title}</h1>
        <div className="mt-4">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(price || 0)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <Button className="w-full" size="lg">
          <MessageSquare className="w-5 h-5" />
          Tenho interesse
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          <Calculator className="w-5 h-5" />
          Faça uma simulação
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#8A8A8A]" />
          <span className="text-sm text-[#8A8A8A]">
            Veículos revisados e periciados
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#8A8A8A]" />
          <span className="text-sm text-[#8A8A8A]">
            Bônus na troca
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#8A8A8A]" />
          <span className="text-sm text-[#8A8A8A]">
            90 dias de garantia da loja
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#8A8A8A]" />
          <span className="text-sm text-[#8A8A8A]">
            Entrada Parcelada em até 21x
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#8A8A8A]" />
          <span className="text-sm text-[#8A8A8A]">
            Pague em até 60 Meses
          </span>
        </div>
      </div>
    </div>
  );
};