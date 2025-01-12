import { useParams, Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehiclesGrid } from "@/components/vehicles/VehiclesGrid";
import { VehiclesPagination } from "@/components/vehicles/VehiclesPagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Loader2 } from "lucide-react";

const BrandVehicles = () => {
  const { brand } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "newest";
  const isMobile = useIsMobile();
  const ITEMS_PER_PAGE = isMobile ? 6 : 15;

  const decodedBrand = decodeURIComponent(brand || "");
  const formattedBrand = decodedBrand.charAt(0).toUpperCase() + decodedBrand.slice(1);

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["vehicles", brand, sort],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.rpc('filter_products', {
          p_marca: brand?.toLowerCase(),
          p_search_term: null,
          p_ano_min: null,
          p_price_min: null,
          p_price_max: null,
          p_mileage_min: null,
          p_mileage_max: null,
          p_transmission_type: null,
          p_fuel_type: null,
          p_body_type: null,
          p_color: null
        });

        if (error) throw error;

        return [...(data || [])].sort((a, b) => {
          if (sort === "price-asc") return (a.price || 0) - (b.price || 0);
          if (sort === "price-desc") return (b.price || 0) - (a.price || 0);
          if (sort === "name-asc") return a.title.localeCompare(b.title);
          if (sort === "name-desc") return b.title.localeCompare(a.title);
          if (a.is_featured !== b.is_featured) return b.is_featured ? 1 : -1;
          return b.year - a.year;
        });
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw error;
      }
    },
  });

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value: string) => {
    searchParams.set("sort", value);
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{formattedBrand}</span>
        </nav>

        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Veículos {formattedBrand}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {vehicles.length} veículos encontrados
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais recentes</SelectItem>
                <SelectItem value="price-asc">Menor preço</SelectItem>
                <SelectItem value="price-desc">Maior preço</SelectItem>
                <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <p className="text-lg text-gray-500 mb-4">
              Nenhum veículo {formattedBrand} encontrado
            </p>
            <Button asChild variant="outline">
              <Link to="/">Voltar para home</Link>
            </Button>
          </div>
        ) : (
          <>
            <VehiclesGrid
              vehicles={vehicles}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
            />
            <VehiclesPagination
              currentPage={currentPage}
              totalItems={vehicles.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BrandVehicles;
