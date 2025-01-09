import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { SlideFormValues } from "./slide-schema";
import { ImagePreview } from "./ImagePreview";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadFieldProps {
  form: UseFormReturn<SlideFormValues>;
  name: "desktop_image_url" | "mobile_image_url";
  label: string;
}

export function ImageUploadField({ form, name, label }: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('slides')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('slides')
        .getPublicUrl(filePath);

      form.setValue(name, publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
              </FormControl>
            </TabsContent>
            <TabsContent value="url">
              <FormControl>
                <Input {...field} placeholder="https://" />
              </FormControl>
            </TabsContent>
          </Tabs>
          <ImagePreview url={field.value} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}