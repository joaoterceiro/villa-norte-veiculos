import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { FinancingForm } from "@/components/FinancingForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const steps = [
  {
    number: "01",
    title: "Escolha seu carro ideal",
    description: "Navegue pelo nosso estoque e selecione o carro dos seus sonhos",
    action: "Explorar estoque",
    link: "/vehicles",
  },
  {
    number: "02",
    title: "Complete Seu Formulário",
    description: "Clique no botão abaixo e preencha suas informações em poucos minutos",
    action: "Simular agora",
  },
  {
    number: "03",
    title: "Receba a Análise da Simulação",
    description: "Nossa equipe entrará em contato rapidamente com o resultado da sua pré-simulação",
    action: "Entrar em contato",
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
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-2">
          FÁCIL E RÁPIDO
        </h2>
        <p className="text-center text-muted mb-12">
          Simule seu financiamento em 3 passos simples
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-4xl font-bold text-white mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted mb-6">{step.description}</p>
              <button
                onClick={() => handleAction(index)}
                className="text-primary hover:text-primary/90 font-medium inline-flex items-center gap-2"
              >
                {step.action}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="fixed inset-0 z-50 bg-black/50" />
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Simulação de Financiamento
            </h2>
            <p className="text-sm text-muted-foreground">
              Preencha o formulário abaixo para simular seu financiamento
            </p>
          </div>
          <FinancingForm
            onSuccess={() => setIsModalOpen(false)}
            vehicleTitle="Simulação Geral"
          />
        </div>
      </Dialog>
    </div>
  );
};