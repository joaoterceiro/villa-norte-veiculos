import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Card } from "@/components/ui/card";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, readOnly = false }: CodeEditorProps) {
  const editorRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        (editorRef.current as any).layout();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="border rounded-lg overflow-hidden">
      <Editor
        height="400px"
        defaultLanguage="html"
        value={value}
        onChange={(value) => onChange(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          readOnly,
        }}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </Card>
  );
}