import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Settings, Car, Users } from "lucide-react";

const menuItems = [
  {
    title: "Configurações",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    title: "Veículos",
    icon: Car,
    href: "/dashboard/vehicles",
  },
  {
    title: "Leads",
    icon: Users,
    href: "/dashboard/leads",
  },
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-white border-r">
      <div className="p-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <nav className="px-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};