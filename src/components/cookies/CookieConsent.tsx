import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CookiePolicyRow = Database["public"]["Tables"]["cookie_policy"]["Row"];

interface CookiePolicy {
  version: string;
  content: {
    title: string;
    introduction: string;
    sections: {
      what_are_cookies: { title: string; content: string };
      how_we_use: { title: string; content: string };
      your_choices: { title: string; content: string };
      contact: { title: string; content: string };
    };
  };
  categories: {
    necessary: { title: string; description: string; required: boolean };
    analytics: { title: string; description: string; required: boolean };
    marketing: { title: string; description: string; required: boolean };
    personalization: { title: string; description: string; required: boolean };
  };
}

const COOKIE_CONSENT_KEY = "cookie_consent";
const COOKIE_VERSION_KEY = "cookie_version";

const transformCookiePolicy = (row: CookiePolicyRow): CookiePolicy => {
  return {
    version: row.version,
    content: row.content as CookiePolicy["content"],
    categories: row.categories as CookiePolicy["categories"],
  };
};

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  const { data: cookiePolicy } = useQuery({
    queryKey: ["cookiePolicy"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cookie_policy")
        .select("*")
        .eq("is_active", true)
        .order("published_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return transformCookiePolicy(data);
    },
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedVersion = localStorage.getItem(COOKIE_VERSION_KEY);
    
    // Show banner if no consent or if policy version is newer
    if (!hasConsent || (cookiePolicy && savedVersion !== cookiePolicy.version)) {
      setShowBanner(true);
    }
  }, [cookiePolicy]);

  const handleAcceptAll = () => {
    if (!cookiePolicy) return;
    
    localStorage.setItem(COOKIE_CONSENT_KEY, "all");
    localStorage.setItem(COOKIE_VERSION_KEY, cookiePolicy.version);
    setShowBanner(false);
  };

  if (!showBanner || !cookiePolicy) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-white border-t border-gray-200 shadow-lg",
      "p-4 md:p-6"
    )}>
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              {cookiePolicy.content.title}
            </h2>
            <p className="text-muted-foreground">
              {cookiePolicy.content.introduction}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-end">
            <Link 
              to="/politica-de-cookies"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              Política de Cookies
            </Link>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {/* TODO: Implement customize modal */}}
              >
                Personalizar
              </Button>
              <Button onClick={handleAcceptAll}>
                Aceitar Todos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};