import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";
import { motion } from "framer-motion";

interface DocumentationStepProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const DocumentationStep = ({ form }: DocumentationStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <FormField
        control={form.control}
        name="carro_troca"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-sm font-medium text-gray-700">Possui carro na troca?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-3"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem 
                      value="true"
                      className="border-2 border-gray-200 text-primary focus:border-primary focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-gray-600 cursor-pointer">Sim</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem 
                      value="false"
                      className="border-2 border-gray-200 text-primary focus:border-primary focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-gray-600 cursor-pointer">Não</FormLabel>
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
          <FormItem className="space-y-4">
            <FormLabel className="text-sm font-medium text-gray-700">Possui CNH?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-3"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem 
                      value="true"
                      className="border-2 border-gray-200 text-primary focus:border-primary focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-gray-600 cursor-pointer">Sim</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem 
                      value="false"
                      className="border-2 border-gray-200 text-primary focus:border-primary focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-gray-600 cursor-pointer">Não</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};