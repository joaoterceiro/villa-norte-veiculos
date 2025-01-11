import { AdminLayout } from "@/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Code2, History, Settings2 } from "lucide-react";
import { ScriptEditor } from "@/components/admin/tracking/ScriptEditor";
import { ScriptVersionHistory } from "@/components/admin/tracking/ScriptVersionHistory";
import { SettingsTab } from "@/components/admin/tracking/SettingsTab";
import { Script } from "@/components/admin/tracking/types";

export default function TrackingAnalytics() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [scripts, setScripts] = useState<Script[]>([]);
  const queryClient = useQueryClient();

  const { data: fetchedScripts, isLoading } = useQuery({
    queryKey: ["tracking-scripts"],
    queryFn: async () => {
      console.log("Fetching scripts...");
      const { data, error } = await supabase
        .from("tracking_scripts")
        .select("*")
        .order("type", { ascending: true });

      if (error) {
        console.error("Error fetching scripts:", error);
        toast.error("Erro ao carregar scripts");
        throw error;
      }
      
      console.log("Fetched scripts:", data);
      return data as Script[];
    },
  });

  useEffect(() => {
    if (fetchedScripts) {
      console.log("Setting scripts from fetch:", fetchedScripts);
      setScripts(fetchedScripts);
    }
  }, [fetchedScripts]);

  const mutation = useMutation({
    mutationFn: async (values: { type: string; content: string; is_active: boolean }) => {
      console.log("Saving script:", values);
      const script = scripts.find(s => s.type === values.type);
      
      const scriptData = {
        type: values.type,
        content: values.content,
        is_active: values.is_active,
        updated_by: (await supabase.auth.getUser()).data.user?.id,
        version: ((script?.version || 0) + 1),
      };

      if (script?.id) {
        // Update existing script
        const { data, error } = await supabase
          .from("tracking_scripts")
          .update(scriptData)
          .eq('id', script.id)
          .select()
          .single();

        if (error) {
          console.error("Error updating script:", error);
          throw error;
        }
        
        console.log("Updated script:", data);
        return data;
      } else {
        // Insert new script
        const { data, error } = await supabase
          .from("tracking_scripts")
          .insert(scriptData)
          .select()
          .single();

        if (error) {
          console.error("Error inserting script:", error);
          throw error;
        }
        
        console.log("Inserted script:", data);
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracking-scripts"] });
      queryClient.invalidateQueries({ queryKey: ["tracking-scripts-versions"] });
      toast.success("Scripts salvos com sucesso!");
      setHasUnsavedChanges(false);
    },
    onError: (error) => {
      console.error("Error saving scripts:", error);
      toast.error("Erro ao salvar scripts");
    },
  });

  const handleSaveChanges = async () => {
    try {
      console.log("Saving changes...");
      if (headScript) {
        await mutation.mutateAsync({
          type: "head",
          content: headScript.content || "",
          is_active: headScript.is_active,
        });
      }
      if (bodyScript) {
        await mutation.mutateAsync({
          type: "body",
          content: bodyScript.content || "",
          is_active: bodyScript.is_active,
        });
      }
    } catch (error) {
      console.error("Error in handleSaveChanges:", error);
    }
  };

  const handleContentChange = (type: string, content: string) => {
    console.log("Content change:", { type, content });
    setHasUnsavedChanges(true);
    setScripts(prev => 
      prev.map(script => 
        script.type === type ? { ...script, content } : script
      )
    );
  };

  const handleActiveChange = async (type: string, checked: boolean) => {
    try {
      console.log("Active change:", { type, checked });
      const script = scripts.find(s => s.type === type);
      if (script) {
        await mutation.mutateAsync({
          type,
          content: script.content || "",
          is_active: checked,
        });
        setScripts(prev =>
          prev.map(s =>
            s.type === type ? { ...s, is_active: checked } : s
          )
        );
      }
    } catch (error) {
      console.error("Error in handleActiveChange:", error);
    }
  };

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
            onClick={handleSaveChanges}
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
                <ScriptEditor
                  title="Scripts no Head"
                  script={headScript}
                  onContentChange={(value) => handleContentChange("head", value)}
                  onActiveChange={(checked) => handleActiveChange("head", checked)}
                  isLoading={mutation.isPending}
                />
              </TabsContent>

              <TabsContent value="body" className="space-y-4">
                <ScriptEditor
                  title="Scripts no Body"
                  script={bodyScript}
                  onContentChange={(value) => handleContentChange("body", value)}
                  onActiveChange={(checked) => handleActiveChange("body", checked)}
                  isLoading={mutation.isPending}
                />
              </TabsContent>

              <TabsContent value="history">
                <ScriptVersionHistory />
              </TabsContent>

              <TabsContent value="settings">
                <SettingsTab />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
