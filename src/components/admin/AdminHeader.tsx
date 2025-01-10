import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-xl font-bold">
              Painel Admin
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                to="/admin/configuracoes"
                className={`${
                  location.pathname === "/admin/configuracoes"
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Configurações
              </Link>
            </nav>
          </div>
          <Button variant="ghost" onClick={handleSignOut}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};