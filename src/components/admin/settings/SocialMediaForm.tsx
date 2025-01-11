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
import { Facebook, Instagram, Youtube } from "lucide-react";

const socialMediaSchema = z.object({
  facebook_url: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
  instagram_url: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
  youtube_url: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
});

type SocialMediaFormData = z.infer<typeof socialMediaSchema>;

interface SocialMediaFormProps {
  defaultValues: SocialMediaFormData;
  onSubmit: (values: SocialMediaFormData) => void;
}

export function SocialMediaForm({ defaultValues, onSubmit }: SocialMediaFormProps) {
  const form = useForm<SocialMediaFormData>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
      </form>
    </Form>
  );
}