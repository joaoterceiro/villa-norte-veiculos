import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";

export const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="bg-secondary border-b border-secondary">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Logo className="h-8 w-auto" />
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/admin"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/configuracoes"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/admin/configuracoes"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Configurações
              </Link>
            </nav>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-primary hover:bg-secondary"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};