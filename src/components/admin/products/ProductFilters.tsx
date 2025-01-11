import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersProps {
  searchTerm: string;
  makeFilter: string;
  conditionFilter: string;
  statusFilter: string;
  makes: string[] | undefined;
  onSearchChange: (value: string) => void;
  onMakeChange: (value: string) => void;
  onConditionChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function ProductFilters({
  searchTerm,
  makeFilter,
  conditionFilter,
  statusFilter,
  makes,
  onSearchChange,
  onMakeChange,
  onConditionChange,
  onStatusChange,
}: ProductFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="relative">
        <Input
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={makeFilter} onValueChange={onMakeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por marca" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as marcas</SelectItem>
          {makes?.map((make) => (
            <SelectItem key={make} value={make}>
              {make}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={conditionFilter} onValueChange={onConditionChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por condição" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as condições</SelectItem>
          <SelectItem value="new">Novo</SelectItem>
          <SelectItem value="used">Usado</SelectItem>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="active">Ativo</SelectItem>
          <SelectItem value="inactive">Inativo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}