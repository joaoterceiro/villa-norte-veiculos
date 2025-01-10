import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Logo />
            <nav className="flex items-center space-x-4">
              <Link
                to="/admin"
                className={`text-sm font-medium text-white hover:text-white/80 transition-colors ${
                  isActive("/admin") ? "text-primary border-b-2 border-primary pb-1" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/media"
                className={`text-sm font-medium text-white hover:text-white/80 transition-colors ${
                  isActive("/admin/media") ? "text-primary border-b-2 border-primary pb-1" : ""
                }`}
              >
                Mídia
              </Link>
              <Link
                to="/admin/settings"
                className={`text-sm font-medium text-white hover:text-white/80 transition-colors ${
                  isActive("/admin/settings") ? "text-primary border-b-2 border-primary pb-1" : ""
                }`}
              >
                Configurações
              </Link>
            </nav>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="text-white hover:text-white/80"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};