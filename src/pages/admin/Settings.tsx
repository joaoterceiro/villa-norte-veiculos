import { AdminLayout } from "@/layouts/AdminLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const formSchema = z.object({
  whatsapp_number: z.string().min(1, "WhatsApp é obrigatório"),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional().nullable(),
  address: z.string().optional().nullable(),
  facebook_url: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
  instagram_url: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
  youtube_url: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
});

export default function Settings() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whatsapp_number: "",
      phone: "",
      email: "",
      address: "",
      facebook_url: "",
      instagram_url: "",
      youtube_url: "",
    },
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ["portal-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portal_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { error } = await supabase
        .from("portal_settings")
        .update(values)
        .eq("id", settings?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-settings"] });
      toast.success("Configurações atualizadas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar configurações");
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        whatsapp_number: settings.whatsapp_number,
        phone: settings.phone || "",
        email: settings.email || "",
        address: settings.address || "",
        facebook_url: settings.facebook_url || "",
        instagram_url: settings.instagram_url || "",
        youtube_url: settings.youtube_url || "",
      });
    }
  }, [settings, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div>Carregando...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Configurações do Portal</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="whatsapp_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp*</FormLabel>
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
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: (11) 9999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebook_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtube_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Salvar alterações
            </Button>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}