import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";
import { motion } from "framer-motion";

interface FinancialDataStepProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  formatCurrency: (value: string) => string;
  formatCPF: (value: string) => string;
}

export const FinancialDataStep = ({ form, formatCurrency, formatCPF }: FinancialDataStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="valor_entrada"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Valor de entrada</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="R$ 0,00"
                className="h-12 px-4 rounded-xl border-gray-200 bg-gray-50/50 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-all duration-200"
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
            <FormLabel className="text-sm font-medium text-gray-700">Data de nascimento</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <div className="h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 flex items-center hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 cursor-pointer">
                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                    <Input
                      className={cn(
                        "border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                        !field.value && "text-gray-400"
                      )}
                      placeholder="Selecione uma data"
                      value={field.value ? format(field.value, "dd/MM/yyyy", { locale: ptBR }) : ""}
                      readOnly
                    />
                  </div>
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
            <FormLabel className="text-sm font-medium text-gray-700">CPF</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="000.000.000-00"
                className="h-12 px-4 rounded-xl border-gray-200 bg-gray-50/50 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-all duration-200"
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
    </motion.div>
  );
};