import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface CookieCategory {
  title: string;
  description: string;
  required: boolean;
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Record<string, CookieCategory>;
  onSave: (preferences: CookiePreferences) => void;
  onAcceptAll: () => void;
}

export const CookiePreferencesModal = ({
  open,
  onOpenChange,
  categories,
  onSave,
  onAcceptAll,
}: CookiePreferencesModalProps) => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false,
  });

  const handleSave = () => {
    onSave(preferences);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-gray-800">Preferências de Cookies</SheetTitle>
          <SheetDescription className="text-gray-600">
            Personalize suas preferências de cookies. Cookies necessários não podem ser desativados pois são essenciais para o funcionamento do site.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {Object.entries(categories).map(([key, category]) => (
            <div key={key} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`cookie-${key}`} className="text-base font-medium text-gray-700">
                  {category.title}
                </Label>
                <Switch
                  id={`cookie-${key}`}
                  checked={preferences[key as keyof CookiePreferences]}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, [key]: checked }))
                  }
                  disabled={category.required}
                />
              </div>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
          <Button variant="outline" onClick={onAcceptAll}>
            Aceitar Todos
          </Button>
          <Button onClick={handleSave}>
            Salvar Preferências
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};