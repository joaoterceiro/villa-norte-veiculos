import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";
import { motion } from "framer-motion";

interface PersonalDataStepProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  formatPhone: (value: string) => string;
}

export const PersonalDataStep = ({ form, formatPhone }: PersonalDataStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Nome completo</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Digite seu nome"
                className="h-12 px-4 rounded-xl border-gray-200 bg-gray-50/50 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-all duration-200"
              />
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
            <FormLabel className="text-sm font-medium text-gray-700">Telefone</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="(00) 00000-0000"
                className="h-12 px-4 rounded-xl border-gray-200 bg-gray-50/50 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-all duration-200"
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
    </motion.div>
  );
};