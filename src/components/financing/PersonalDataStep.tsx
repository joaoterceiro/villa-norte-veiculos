import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";

interface PersonalDataStepProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  formatPhone: (value: string) => string;
}

export const PersonalDataStep = ({ form, formatPhone }: PersonalDataStepProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qual é o seu nome?</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Digite seu nome completo"
                className="placeholder:text-gray-400"
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
            <FormLabel>Qual é o seu contato?</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="(00) 00000-0000"
                className="placeholder:text-gray-400"
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
  );
};