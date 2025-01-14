import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  const formatDate = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 2) return numericValue;
    if (numericValue.length <= 4) return `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
    if (numericValue.length <= 8) return `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4)}`;
    return `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`;
  };

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
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Data de nascimento</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={value ? formatDate(value.toString()) : ""}
                placeholder="06/07/1994"
                maxLength={10}
                className="h-12 px-4 rounded-xl border-gray-200 bg-gray-50/50 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                onChange={(e) => {
                  const formatted = formatDate(e.target.value);
                  if (formatted.length === 10) {
                    const [day, month, year] = formatted.split('/');
                    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                    onChange(date);
                  } else {
                    onChange(e.target.value);
                  }
                }}
              />
            </FormControl>
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