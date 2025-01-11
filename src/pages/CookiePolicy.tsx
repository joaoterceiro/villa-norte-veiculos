import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

const transformCookiePolicy = (row: CookiePolicyRow): CookiePolicy => {
  return {
    version: row.version,
    content: row.content as CookiePolicy["content"],
    categories: row.categories as CookiePolicy["categories"],
  };
};

export default function CookiePolicy() {
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

  if (!cookiePolicy) return null;

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{cookiePolicy.content.title}</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-gray-800">Introdução</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {cookiePolicy.content.introduction}
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="mb-8">
        {Object.entries(cookiePolicy.content.sections).map(([key, section]) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger className="text-lg font-semibold text-gray-800">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Categorias de Cookies</h2>
      <div className="grid gap-4">
        {Object.entries(cookiePolicy.categories).map(([key, category]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-800">
                {category.title}
                {category.required && (
                  <span className="text-sm font-normal text-gray-500">
                    (Necessário)
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}