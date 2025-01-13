import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FinancingForm } from "@/components/FinancingForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Car, FileText, MessageCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const steps = [
  {
    number: "01",
    title: "Escolha seu carro",
    description: "Navegue pelo nosso estoque e selecione o carro dos seus sonhos",
    action: "Explorar estoque",
    link: "/vehicles",
    icon: Car,
  },
  {
    number: "02",
    title: "Preencha os dados",
    description: "Complete suas informações em poucos minutos",
    action: "Simular agora",
    icon: FileText,
  },
  {
    number: "03",
    title: "Receba a análise",
    description: "Nossa equipe entrará em contato com o resultado da simulação",
    action: "Entrar em contato",
    icon: MessageCircle,
  },
];

export const FinancingSteps = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { data: settings } = useQuery({
    queryKey: ["portal-settings"],
    queryFn: async () => {
      const { data } = await supabase
        .from("portal_settings")
        .select("whatsapp_number")
        .single();
      return data;
    },
  });

  const handleAction = (index: number) => {
    switch (index) {
      case 0:
        navigate("/vehicles");
        break;
      case 1:
        setIsModalOpen(true);
        break;
      case 2:
        if (settings?.whatsapp_number) {
          window.open(
            `https://wa.me/${settings.whatsapp_number}?text=Olá! Gostaria de mais informações sobre financiamento.`,
            "_blank"
          );
        }
        break;
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2 block">
            PROCESSO SIMPLIFICADO
          </span>
          <h2 className="text-3xl font-light tracking-tight mb-4">
            Fácil e Rápido
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[360px] group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <span className="absolute top-6 right-8 text-4xl font-light text-gray-100 transition-transform duration-300 group-hover:rotate-[-5deg]">
                  {step.number}
                </span>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon size={32} className="text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-light tracking-tight text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-500 font-light leading-relaxed mb-6 flex-grow">
                    {step.description}
                  </p>
                  
                  <button
                    onClick={() => handleAction(index)}
                    className="text-primary hover:text-primary/90 font-medium inline-flex items-center gap-2 group/btn transition-colors"
                  >
                    {step.action}
                    <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl">
                  <Progress 
                    value={hoveredCard === index ? 100 : 0} 
                    className="transition-all duration-1000"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Simulação de Financiamento</DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo para simular seu financiamento
            </DialogDescription>
          </DialogHeader>
          <FinancingForm
            onSuccess={() => setIsModalOpen(false)}
            vehicleTitle="Simulação Geral"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};