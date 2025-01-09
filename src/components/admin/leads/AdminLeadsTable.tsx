import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Lead {
  lead_id: string;
  nome: string;
  telefone: string;
  data_cadastro: string;
  status: string | null;
}

interface AdminLeadsTableProps {
  leads: Lead[];
}

export const AdminLeadsTable = ({ leads }: AdminLeadsTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.lead_id}>
              <TableCell>{lead.nome}</TableCell>
              <TableCell>{lead.telefone}</TableCell>
              <TableCell>{new Date(lead.data_cadastro).toLocaleDateString()}</TableCell>
              <TableCell>{lead.status || 'Novo'}</TableCell>
              <TableCell>
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};