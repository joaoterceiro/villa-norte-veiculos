import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { CodeEditor } from "./CodeEditor";

type ScriptVersion = {
  id: string;
  type: string;
  content: string | null;
  version: number | null;
  updated_at: string;
  updated_by: string | null;
  users_sis: {
    name: string | null;
  } | null;
}

export function ScriptVersionHistory() {
  const [selectedVersion, setSelectedVersion] = useState<ScriptVersion | null>(null);

  const { data: versions } = useQuery({
    queryKey: ["tracking-scripts-versions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tracking_scripts")
        .select(`
          id,
          type,
          content,
          version,
          updated_at,
          updated_by,
          users_sis:users_sis(name)
        `)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data as ScriptVersion[];
    },
  });

  if (!versions?.length) {
    return (
      <Alert>
        <AlertDescription>
          Nenhuma versão encontrada.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Versões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">
                    {version.type === "head" ? "Head Script" : "Body Script"} v{version.version}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Atualizado por {version.users_sis?.name ?? "Usuário desconhecido"} em{" "}
                    {new Date(version.updated_at).toLocaleString("pt-BR")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVersion(version)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedVersion} onOpenChange={() => setSelectedVersion(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedVersion?.type === "head" ? "Head Script" : "Body Script"} v
              {selectedVersion?.version}
            </DialogTitle>
          </DialogHeader>
          {selectedVersion && (
            <CodeEditor
              value={selectedVersion.content || ""}
              onChange={() => {}}
              readOnly
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}