import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const FooterBottom = () => {
  const navigate = useNavigate();

  const handleAdminClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
    } else {
      const { data: userProfile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (userProfile?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/auth");
      }
    }
  };

  return (
    <div className="mt-12 border-t border-gray-700 pt-8">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Villa Norte. Todos os direitos reservados.
        </p>
        <button 
          onClick={handleAdminClick}
          className="text-sm text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none"
        >
          Área administrativa
        </button>
      </div>
    </div>
  );
};