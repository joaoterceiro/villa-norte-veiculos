import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin } from "lucide-react";

const contactFormSchema = z.object({
  whatsapp_number: z.string().min(1, "WhatsApp é obrigatório"),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional().nullable(),
  address: z.string().optional().nullable(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactInfoFormProps {
  defaultValues: ContactFormData;
  onSubmit: (values: ContactFormData) => void;
}

export function ContactInfoForm({ defaultValues, onSubmit }: ContactInfoFormProps) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="whatsapp_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  WhatsApp*
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 5511999999999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: (11) 9999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="contato@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Endereço
              </FormLabel>
              <FormControl>
                <Input placeholder="Endereço completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}