import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Car, 
  Image, 
  Users,
  Settings
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard
  },
  {
    title: "Veículos",
    href: "/admin/vehicles",
    icon: Car
  },
  {
    title: "Banners",
    href: "/admin/slides",
    icon: Image
  },
  {
    title: "Leads",
    href: "/admin/leads",
    icon: Users
  },
  {
    title: "Configurações",
    href: "/admin/settings",
    icon: Settings
  }
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex lg:flex-col gap-4 p-4 border-r min-h-screen w-64">
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                location.pathname === item.href && "bg-gray-100 text-gray-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};