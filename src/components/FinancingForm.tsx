import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  telefone: z.string().min(14, "Telefone inválido"),
  valor_entrada: z.string().min(1, "Valor de entrada é obrigatório"),
  data_nascimento: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  cpf: z.string().min(14, "CPF inválido"),
  carro_troca: z.enum(["true", "false"]),
  cnh: z.enum(["true", "false"]),
});

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual é o seu nome?</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual é o seu contato?</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={15}
                      onChange={(e) => {
                        field.onChange(formatPhone(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="valor_entrada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual é o valor de entrada?</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(formatCurrency(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data_nascimento"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Qual é a sua data de nascimento?</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual é o seu CPF?</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={14}
                      onChange={(e) => {
                        field.onChange(formatCPF(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="carro_troca"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Possui carro na troca?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Sim</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">Não</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cnh"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Possui CNH?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Sim</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">Não</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Voltar
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Próximo
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Enviar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};