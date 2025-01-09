import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("data_cadastro", { ascending: false });

        if (error) throw error;

        setLeads(data);
      } catch (error) {
        toast.error("Erro ao carregar leads");
        console.error("Error fetching leads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Data de Cadastro</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.lead_id}>
            <TableCell>{lead.nome}</TableCell>
            <TableCell>{lead.telefone}</TableCell>
            <TableCell>
              {new Date(lead.data_cadastro).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>{lead.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};