import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AdminSlidesTable } from "@/components/admin/slides/AdminSlidesTable";
import { Plus } from "lucide-react";

const Slides = () => {
  const { data: slides, isLoading } = useQuery({
    queryKey: ['admin-slides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slides')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Banners</h1>
        <Button>
          <Plus className="mr-2" />
          Novo Banner
        </Button>
      </div>
      <AdminSlidesTable slides={slides || []} />
    </div>
  );
};

export default Slides;