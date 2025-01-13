import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  FileText, 
  Calculator, 
  CheckCircle2, 
  CarFront 
} from "lucide-react";

export const FinancingSteps = () => {
  const steps = [
    {
      icon: FileText,
      title: "Documentação",
      description: "Prepare seus documentos pessoais básicos",
    },
    {
      icon: Calculator,
      title: "Simulação",
      description: "Faça uma simulação com as melhores taxas",
    },
    {
      icon: CheckCircle2,
      title: "Aprovação",
      description: "Aprovação rápida e sem burocracia",
    },
    {
      icon: CarFront,
      title: "Retirada",
      description: "Retire seu veículo na loja",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-gray-50">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-secondary mb-4">
            Financiamento Fácil e Rápido
          </h2>
          <p className="text-base md:text-lg text-muted font-light leading-relaxed max-w-2xl mx-auto">
            Conquiste seu veículo novo em apenas 4 passos simples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/5 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-secondary mb-2">
                  {step.title}
                </h3>
                <p className="text-muted font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/financiamento">
            <Button size="lg" className="font-medium">
              Simular Financiamento
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};