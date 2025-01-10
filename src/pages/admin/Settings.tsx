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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings2, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

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
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-8">
          <Settings2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Configurações do Portal</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent>
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

                <Separator className="my-6" />
                <div className="text-lg font-medium mb-4">Redes Sociais</div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="facebook_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Facebook className="h-4 w-4" />
                          Facebook
                        </FormLabel>
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
                        <FormLabel className="flex items-center gap-2">
                          <Instagram className="h-4 w-4" />
                          Instagram
                        </FormLabel>
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
                        <FormLabel className="flex items-center gap-2">
                          <Youtube className="h-4 w-4" />
                          YouTube
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://youtube.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-6"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Salvando...
                    </div>
                  ) : (
                    "Salvar alterações"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}