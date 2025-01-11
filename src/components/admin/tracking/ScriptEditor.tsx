import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CodeEditor } from "./CodeEditor";
import { Script } from "./types";

interface ScriptEditorProps {
  title: string;
  script: Script | undefined;
  onContentChange: (content: string) => void;
  onActiveChange: (checked: boolean) => void;
  isLoading?: boolean;
}

export function ScriptEditor({
  title,
  script,
  onContentChange,
  onActiveChange,
  isLoading,
}: ScriptEditorProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <Switch
          checked={script?.is_active}
          onCheckedChange={onActiveChange}
          disabled={isLoading}
        />
      </CardHeader>
      <CardContent>
        <CodeEditor
          value={script?.content || ""}
          onChange={onContentChange}
        />
      </CardContent>
    </Card>
  );
}