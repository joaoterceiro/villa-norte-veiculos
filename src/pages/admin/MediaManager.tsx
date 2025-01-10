import { AdminLayout } from "@/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BannerManager } from "@/components/admin/media/BannerManager";
import { SlideManager } from "@/components/admin/media/SlideManager";
import { Button } from "@/components/ui/button";
import { Plus, Image, Presentation } from "lucide-react";
import { cn } from "@/lib/utils";

const MediaManager = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary">Gerenciador de Mídia</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os banners e slides do site
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Novo
          </Button>
        </div>

        <Tabs defaultValue="slides" className="w-full">
          <TabsList className="w-full grid grid-cols-2 gap-4 bg-transparent p-0 mb-8">
            {[
              { value: "slides", label: "Slides", icon: Presentation },
              { value: "banners", label: "Banners", icon: Image },
            ].map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={cn(
                  "flex items-center gap-2 w-full border-2 border-transparent py-6 rounded-lg transition-all duration-200",
                  "data-[state=active]:border-primary data-[state=active]:bg-primary/5",
                  "data-[state=active]:text-primary hover:bg-muted/50"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="slides" className="m-0">
            <SlideManager />
          </TabsContent>
          <TabsContent value="banners" className="m-0">
            <BannerManager />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default MediaManager;