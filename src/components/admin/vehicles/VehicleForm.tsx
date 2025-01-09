import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const vehicleSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  make: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  year: z.string().min(1, "Ano é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
  vehicleId?: string;
  onSuccess?: () => void;
}

export const VehicleForm = ({ vehicleId, onSuccess }: VehicleFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit = async (data: VehicleFormData) => {
    try {
      setIsLoading(true);
      
      if (vehicleId) {
        const { error } = await supabase
          .from('product')
          .update({
            title: data.title,
            make: data.make,
            model: data.model,
            year: parseInt(data.year),
            price: parseFloat(data.price),
            status: data.status,
          })
          .eq('vehicle_id', vehicleId);

        if (error) throw error;
        
        toast({
          title: "Veículo atualizado",
          description: "O veículo foi atualizado com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('product')
          .insert({
            title: data.title,
            make: data.make,
            model: data.model,
            year: parseInt(data.year),
            price: parseFloat(data.price),
            status: data.status,
            date_added: new Date().toISOString(),
            external_id: Math.floor(Math.random() * 1000000),
          });

        if (error) throw error;
        
        toast({
          title: "Veículo criado",
          description: "O veículo foi criado com sucesso.",
        });
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o veículo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="make">Marca</Label>
        <Input id="make" {...register("make")} />
        {errors.make && (
          <p className="text-sm text-red-500 mt-1">{errors.make.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="model">Modelo</Label>
        <Input id="model" {...register("model")} />
        {errors.model && (
          <p className="text-sm text-red-500 mt-1">{errors.model.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="year">Ano</Label>
        <Input id="year" type="number" {...register("year")} />
        {errors.year && (
          <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price">Preço</Label>
        <Input id="price" type="number" step="0.01" {...register("price")} />
        {errors.price && (
          <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Input id="status" {...register("status")} />
        {errors.status && (
          <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Salvando..." : vehicleId ? "Atualizar" : "Criar"}
      </Button>
    </form>
  );
};