import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { FormStepper } from "./financing/FormStepper";
import { PersonalDataStep } from "./financing/PersonalDataStep";
import { FinancialDataStep } from "./financing/FinancialDataStep";
import { DocumentationStep } from "./financing/DocumentationStep";
import { formSchema } from "./financing/schema";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";

interface FinancingFormProps {
  onSuccess: () => void;
  vehicleTitle: string;
}

export const FinancingForm = ({ onSuccess, vehicleTitle }: FinancingFormProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      valor_entrada: "",
      cpf: "",
      carro_troca: "false",
      cnh: "false",
    },
  });

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const floatValue = parseFloat(numericValue) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(floatValue);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.from("leads").insert({
        nome: values.nome,
        telefone: values.telefone,
        valor_entrada: parseFloat(values.valor_entrada.replace(/\D/g, "")) / 100,
        data_nascimento: format(values.data_nascimento, "yyyy-MM-dd"),
        cpf: values.cpf,
        carro_troca: values.carro_troca === "true",
        cnh: values.cnh === "true",
        observacao: `Interesse no veículo: ${vehicleTitle}`,
      });

      if (error) throw error;

      toast({
        title: "Simulação enviada com sucesso!",
        description: "Em breve entraremos em contato.",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Erro ao enviar simulação",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const step1Valid = await form.trigger(["nome", "telefone"]);
      if (step1Valid) setStep(2);
    } else if (step === 2) {
      const step2Valid = await form.trigger(["valor_entrada", "data_nascimento", "cpf"]);
      if (step2Valid) setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormStepper currentStep={step} totalSteps={3} />
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <PersonalDataStep form={form} formatPhone={formatPhone} />
          )}

          {step === 2 && (
            <FinancialDataStep
              form={form}
              formatCurrency={formatCurrency}
              formatCPF={formatCPF}
            />
          )}

          {step === 3 && (
            <DocumentationStep form={form} />
          )}
        </AnimatePresence>

        <motion.div 
          className="flex justify-between pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="h-12 px-6 rounded-xl border-gray-200 hover:bg-gray-50/80 hover:border-primary/30 hover:text-primary transition-all duration-200"
            >
              Voltar
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="h-12 px-6 rounded-xl shadow-lg shadow-primary/20 hover:translate-y-[-1px] transition-all duration-200 ml-auto"
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="h-12 px-6 rounded-xl shadow-lg shadow-primary/20 hover:translate-y-[-1px] transition-all duration-200 ml-auto"
            >
              Enviar
            </Button>
          )}
        </motion.div>
      </form>
    </Form>
  );
};