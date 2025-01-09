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

export const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data, error } = await supabase
          .from("product")
          .select("*")
          .order("date_added", { ascending: false });

        if (error) throw error;

        setVehicles(data);
      } catch (error) {
        toast.error("Erro ao carregar veículos");
        console.error("Error fetching vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Ano</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.vehicle_id}>
            <TableCell>{vehicle.title}</TableCell>
            <TableCell>{vehicle.make}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.year}</TableCell>
            <TableCell>
              {vehicle.price?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell>{vehicle.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};