import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout realizado com sucesso",
        description: "Você será redirecionado para a página inicial.",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar logout",
        description: "Por favor, tente novamente.",
      });
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex space-x-6">
            <Link
              to="/admin"
              className={cn(
                "py-4 text-sm font-medium transition-colors hover:text-primary",
                isActive("/admin") && "text-[#FF6500] border-b-2 border-[#FF6500]"
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={cn(
                "py-4 text-sm font-medium transition-colors hover:text-primary",
                isActive("/admin/products") &&
                  "text-[#FF6500] border-b-2 border-[#FF6500]"
              )}
            >
              Produtos
            </Link>
            <Link
              to="/admin/media"
              className={cn(
                "py-4 text-sm font-medium transition-colors hover:text-primary",
                isActive("/admin/media") &&
                  "text-[#FF6500] border-b-2 border-[#FF6500]"
              )}
            >
              Mídia
            </Link>
            <Link
              to="/admin/settings"
              className={cn(
                "py-4 text-sm font-medium transition-colors hover:text-primary",
                isActive("/admin/settings") &&
                  "text-[#FF6500] border-b-2 border-[#FF6500]"
              )}
            >
              Configurações
            </Link>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-primary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </nav>
      </div>
    </header>
  );
}