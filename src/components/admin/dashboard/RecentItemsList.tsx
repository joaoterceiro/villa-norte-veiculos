import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RecentItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
}

interface RecentItemsListProps {
  title: string;
  items?: RecentItem[];
  isLoading?: boolean;
}

export const RecentItemsList = ({ title, items = [], isLoading = false }: RecentItemsListProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};