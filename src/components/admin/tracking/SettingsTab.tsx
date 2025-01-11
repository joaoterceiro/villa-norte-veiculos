import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SettingsTab() {
  return (
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
  );
}