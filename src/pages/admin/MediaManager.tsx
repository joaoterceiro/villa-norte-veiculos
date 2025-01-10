import { AdminLayout } from "@/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BannerManager } from "@/components/admin/media/BannerManager";
import { SlideManager } from "@/components/admin/media/SlideManager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MediaManager = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gerenciador de Mídia</h1>
            <p className="text-muted-foreground">
              Gerencie os banners e slides do site
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Novo
          </Button>
        </div>

        <Tabs defaultValue="slides" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="slides" className="flex-1">Slides</TabsTrigger>
            <TabsTrigger value="banners" className="flex-1">Banners</TabsTrigger>
          </TabsList>
          <TabsContent value="slides" className="space-y-4">
            <SlideManager />
          </TabsContent>
          <TabsContent value="banners" className="space-y-4">
            <BannerManager />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default MediaManager;