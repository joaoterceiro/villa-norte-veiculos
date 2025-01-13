import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FinancingForm } from "@/components/FinancingForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Car, FileText, MessageCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Escolha seu carro ideal",
    description: "Navegue pelo nosso estoque e selecione o carro dos seus sonhos",
    action: "Explorar estoque",
    link: "/vehicles",
    icon: Car,
  },
  {
    number: "02",
    title: "Complete Seu Formulário",
    description: "Clique no botão abaixo e preencha suas informações em poucos minutos",
    action: "Simular agora",
    icon: FileText,
  },
  {
    number: "03",
    title: "Receba a Análise da Simulação",
    description: "Nossa equipe entrará em contato rapidamente com o resultado da sua pré-simulação",
    action: "Entrar em contato",
    icon: MessageCircle,
  },
];

export const FinancingSteps = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-2">
          FÁCIL E RÁPIDO
        </h2>
        <p className="text-center text-gray-500 mb-16 font-light">
          Simule seu financiamento em 3 passos simples
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    <Icon size={48} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-2xl font-light text-gray-600 mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-light mb-4">{step.title}</h3>
                  <p className="text-gray-500 mb-8 font-light">{step.description}</p>
                  <button
                    onClick={() => handleAction(index)}
                    className="text-primary hover:text-primary/90 font-medium inline-flex items-center gap-2 group transition-colors"
                  >
                    {step.action}
                    <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )
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