import { AdminHeader } from "@/components/admin/AdminHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: userProfile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || userProfile?.role !== "admin") {
        navigate("/");
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error("Error checking user:", error);
      navigate("/");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8 max-w-[1400px]">
        {children}
      </main>
    </div>
  );
};