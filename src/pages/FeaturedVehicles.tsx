import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehiclesGrid } from "@/components/vehicles/VehiclesGrid";
import { VehiclesPagination } from "@/components/vehicles/VehiclesPagination";
import { ChevronRight, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const FeaturedVehicles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "newest";

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["featured-vehicles", sort],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("product")
          .select("*")
          .eq("is_featured", true)
          .eq("status", "active")
          .is("deleted_at", null);

        if (error) throw error;

        return [...(data || [])].sort((a, b) => {
          if (sort === "price-asc") return (a.price || 0) - (b.price || 0);
          if (sort === "price-desc") return (b.price || 0) - (a.price || 0);
          if (sort === "mileage-asc") return (a.mileage || 0) - (b.mileage || 0);
          return new Date(b.date_added).getTime() - new Date(a.date_added).getTime();
        });
      } catch (error) {
        console.error("Error fetching featured vehicles:", error);
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
      <Helmet>
        <title>Veículos em Destaque | Encontre as Melhores Ofertas</title>
        <meta
          name="description"
          content="Confira nossa seleção especial de veículos em destaque com as melhores ofertas. Carros seminovos e usados com garantia e procedência."
        />
      </Helmet>

      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Veículos em Destaque</span>
        </nav>

        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Veículos em Destaque
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
                <SelectItem value="mileage-asc">Menor quilometragem</SelectItem>
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
              Nenhum veículo em destaque encontrado
            </p>
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

export default FeaturedVehicles;