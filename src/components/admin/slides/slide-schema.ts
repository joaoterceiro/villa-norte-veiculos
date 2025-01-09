import { z } from "zod";

export const slideFormSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  desktop_image_url: z.string().url("URL inválida"),
  mobile_image_url: z.string().url("URL inválida"),
  alt_text: z.string().optional(),
  link: z.string().url("URL inválida").optional(),
  type: z.string().optional(),
  display_order: z.number().min(0),
  is_active: z.boolean().default(true),
});

export type SlideFormValues = z.infer<typeof slideFormSchema>;