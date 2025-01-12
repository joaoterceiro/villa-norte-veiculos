import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface YearFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const YearFilter = ({ value, onChange }: YearFilterProps) => {
  const { data: years = [] } = useQuery({
    queryKey: ["year-options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('year_options')
        .select('*')
        .order('year', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="space-y-2">
      <Label>Ano mínimo</Label>
      <Select value={value || "all"} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-white border-[#eee] border shadow-none">
          <SelectValue placeholder="Selecione o ano" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-md z-50">
          <SelectItem value="all" className="bg-white hover:bg-gray-100">
            Todos os anos
          </SelectItem>
          {years.map((year) => (
            <SelectItem 
              key={year.year} 
              value={year.year.toString()}
              className="bg-white hover:bg-gray-100"
            >
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};