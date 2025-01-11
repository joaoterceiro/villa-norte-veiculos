import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/Logo";
import type { AuthError } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate("/admin");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setIsLoading(true);
        try {
          const { data: userProfile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (error || userProfile?.role !== "admin") {
            setErrorMessage("Acesso negado. Apenas administradores podem fazer login.");
            await supabase.auth.signOut();
          } else {
            navigate("/admin");
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          setErrorMessage("Erro ao verificar permissões do usuário.");
          await supabase.auth.signOut();
        }
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="w-32 h-auto mb-8" />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Login Administrativo
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Acesse o painel administrativo
          </p>
        </div>

        {errorMessage && (
          <Alert variant="destructive" className="animate-in fade-in-50 duration-300">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-100">
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#FF6500',
                    brandAccent: '#e65a00',
                    inputBackground: 'white',
                    inputText: 'black',
                    inputBorder: '#e2e8f0',
                    inputBorderFocus: '#FF6500',
                    inputBorderHover: '#FF6500',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                  space: {
                    inputPadding: '12px',
                    buttonPadding: '12px',
                  },
                  fonts: {
                    bodyFontFamily: `'Inter', sans-serif`,
                    buttonFontFamily: `'Inter', sans-serif`,
                    inputFontFamily: `'Inter', sans-serif`,
                    labelFontFamily: `'Inter', sans-serif`,
                  },
                },
              },
              className: {
                container: 'space-y-4',
                label: 'text-sm font-medium text-gray-700',
                button: 'w-full font-medium shadow-sm',
                input: 'w-full',
              },
            }}
            providers={[]}
            redirectTo={window.location.origin}
            showLinks={false}
            view="sign_in"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;