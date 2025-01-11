import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const menuItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/products", label: "Produtos" },
    { path: "/admin/media", label: "Mídia" },
    { path: "/admin/settings", label: "Configurações" },
    { 
      path: "/admin/tracking", 
      label: "Tracking Analytics",
      icon: <Activity className="h-4 w-4" />
    },
  ];

  return (
    <header className="border-b bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className={cn(
            "flex-col lg:flex-row lg:flex lg:space-x-6 absolute lg:relative left-0 right-0 bg-white lg:bg-transparent border-b lg:border-0",
            "top-[64px] lg:top-0 z-50",
            isMenuOpen ? "flex" : "hidden lg:flex"
          )}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 lg:px-0 py-4 text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                  isActive(item.path) && "text-[#FF6500] border-b-2 border-[#FF6500]"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-primary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};