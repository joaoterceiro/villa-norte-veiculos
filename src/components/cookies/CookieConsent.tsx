import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/integrations/supabase/types";

type CookiePolicyRow = Database["public"]["Tables"]["cookie_policy"]["Row"];

interface CookiePolicy {
  version: string;
  content: {
    title: string;
    introduction: string;
  };
  categories: {
    [key: string]: {
      title: string;
      description: string;
      required: boolean;
    };
  };
}

const transformCookiePolicy = (row: CookiePolicyRow): CookiePolicy => {
  return {
    version: row.version,
    content: row.content as CookiePolicy["content"],
    categories: row.categories as CookiePolicy["categories"],
  };
};

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  const { data: cookiePolicy } = useQuery<CookiePolicy>({
    queryKey: ["cookie-policy"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cookie_policy")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return transformCookiePolicy(data);
    },
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
      version: cookiePolicy?.version,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setShowBanner(false);
  };

  if (!showBanner || !cookiePolicy) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {cookiePolicy.content.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {cookiePolicy.content.introduction}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleAcceptAll}
                className="bg-primary hover:bg-primary/90"
              >
                Aceitar todos
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Personalizar
              </Button>
            </div>
            <Link
              to="/politica-de-cookies"
              className="text-sm text-primary hover:underline"
            >
              Saiba mais sobre nossa política de cookies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};