import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, History, Settings2 } from "lucide-react";
import { ScriptEditor } from "./ScriptEditor";
import { ScriptVersionHistory } from "./ScriptVersionHistory";
import { SettingsTab } from "./SettingsTab";
import { Script } from "./types";

interface ScriptTabsProps {
  headScript?: Script;
  bodyScript?: Script;
  onContentChange: (type: string, content: string) => void;
  onActiveChange: (type: string, checked: boolean) => void;
  isLoading: boolean;
}

export function ScriptTabs({
  headScript,
  bodyScript,
  onContentChange,
  onActiveChange,
  isLoading,
}: ScriptTabsProps) {
  return (
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
          onContentChange={(value) => onContentChange("head", value)}
          onActiveChange={(checked) => onActiveChange("head", checked)}
          isLoading={isLoading}
        />
      </TabsContent>

      <TabsContent value="body" className="space-y-4">
        <ScriptEditor
          title="Scripts no Body"
          script={bodyScript}
          onContentChange={(value) => onContentChange("body", value)}
          onActiveChange={(checked) => onActiveChange("body", checked)}
          isLoading={isLoading}
        />
      </TabsContent>

      <TabsContent value="history">
        <ScriptVersionHistory />
      </TabsContent>

      <TabsContent value="settings">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
}