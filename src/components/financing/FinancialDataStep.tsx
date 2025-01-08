import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";

interface FinancialDataStepProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  formatCurrency: (value: string) => string;
  formatCPF: (value: string) => string;
}

export const FinancialDataStep = ({ form, formatCurrency, formatCPF }: FinancialDataStepProps) => {
  return (
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
                placeholder="R$ 0,00"
                className="placeholder:text-gray-400"
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
                      "w-full pl-3 text-left font-normal bg-white",
                      !field.value && "text-gray-400"
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
              <PopoverContent className="w-auto p-0 bg-white" align="start">
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
                placeholder="000.000.000-00"
                className="placeholder:text-gray-400"
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
  );
};