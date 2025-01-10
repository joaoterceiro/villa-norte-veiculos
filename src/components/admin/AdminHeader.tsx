import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function AdminHeader() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex space-x-6">
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
        </nav>
      </div>
    </header>
  );
}