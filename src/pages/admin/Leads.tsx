import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLeadsTable } from "@/components/admin/leads/AdminLeadsTable";

const Leads = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: leads, isLoading } = useQuery({
    queryKey: ['admin-leads', page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .range((page - 1) * pageSize, page * pageSize - 1)
        .order('data_cadastro', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Leads</h1>
      <AdminLeadsTable leads={leads || []} />
    </div>
  );
};

export default Leads;