import { AdminLayout } from "@/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Code2, History, Settings2 } from "lucide-react";
import { CodeEditor } from "@/components/admin/tracking/CodeEditor";
import { ScriptVersionHistory } from "@/components/admin/tracking/ScriptVersionHistory";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TrackingAnalytics() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const queryClient = useQueryClient();

  const { data: scripts, isLoading } = useQuery({
    queryKey: ["tracking-scripts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tracking_scripts")
        .select("*")
        .order("type", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: { type: string; content: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("tracking_scripts")
        .upsert({
          type: values.type,
          content: values.content,
          is_active: values.is_active,
          updated_by: (await supabase.auth.getUser()).data.user?.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracking-scripts"] });
      toast.success("Scripts salvos com sucesso!");
      setHasUnsavedChanges(false);
    },
    onError: () => {
      toast.error("Erro ao salvar scripts");
    },
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const headScript = scripts?.find((s) => s.type === "head");
  const bodyScript = scripts?.find((s) => s.type === "body");

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Tracking & Analytics</h1>
            <p className="text-muted-foreground">
              Configure seus códigos de rastreamento e análise que serão aplicados em todo o site
            </p>
          </div>
          <Button 
            onClick={() => {
              if (headScript) {
                mutation.mutate({
                  type: "head",
                  content: headScript.content || "",
                  is_active: headScript.is_active,
                });
              }
              if (bodyScript) {
                mutation.mutate({
                  type: "body",
                  content: bodyScript.content || "",
                  is_active: bodyScript.is_active,
                });
              }
            }}
            disabled={mutation.isPending || !hasUnsavedChanges}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="head" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="head" className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Head Scripts
                </TabsTrigger>
                <TabsTrigger value="body" className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Body Scripts
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Histórico
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  Configurações
                </TabsTrigger>
              </TabsList>

              <TabsContent value="head" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-base font-medium">Scripts no Head</CardTitle>
                    <Switch
                      checked={headScript?.is_active}
                      onCheckedChange={(checked) => {
                        if (headScript) {
                          mutation.mutate({
                            ...headScript,
                            is_active: checked,
                          });
                        }
                      }}
                    />
                  </CardHeader>
                  <CardContent>
                    <CodeEditor
                      value={headScript?.content || ""}
                      onChange={(value) => {
                        setHasUnsavedChanges(true);
                        if (headScript) {
                          headScript.content = value;
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="body" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-base font-medium">Scripts no Body</CardTitle>
                    <Switch
                      checked={bodyScript?.is_active}
                      onCheckedChange={(checked) => {
                        if (bodyScript) {
                          mutation.mutate({
                            ...bodyScript,
                            is_active: checked,
                          });
                        }
                      }}
                    />
                  </CardHeader>
                  <CardContent>
                    <CodeEditor
                      value={bodyScript?.content || ""}
                      onChange={(value) => {
                        setHasUnsavedChanges(true);
                        if (bodyScript) {
                          bodyScript.content = value;
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <ScriptVersionHistory />
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Avançadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert>
                      <AlertDescription>
                        Configurações avançadas estarão disponíveis em breve.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}