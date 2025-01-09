import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Slide {
  id: string;
  title: string;
  type: string | null;
  display_order: number;
  is_active: boolean;
}

interface AdminSlidesTableProps {
  slides: Slide[];
}

export const AdminSlidesTable = ({ slides }: AdminSlidesTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Ordem</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slides.map((slide) => (
            <TableRow key={slide.id}>
              <TableCell>{slide.title}</TableCell>
              <TableCell>{slide.type}</TableCell>
              <TableCell>{slide.display_order}</TableCell>
              <TableCell>
                <Switch checked={slide.is_active} />
              </TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};