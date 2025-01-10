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
            <h1 className="text-3xl font-bold text-secondary">Gerenciador de Mídia</h1>
            <p className="text-muted-foreground">
              Gerencie os banners e slides do site
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Novo
          </Button>
        </div>

        <Tabs defaultValue="slides" className="w-full">
          <TabsList className="w-full grid grid-cols-2 gap-4 bg-transparent p-0">
            <TabsTrigger 
              value="slides" 
              className="w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none border-2 border-transparent data-[state=active]:border-primary py-3 rounded-lg transition-all duration-200"
            >
              Slides
            </TabsTrigger>
            <TabsTrigger 
              value="banners" 
              className="w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none border-2 border-transparent data-[state=active]:border-primary py-3 rounded-lg transition-all duration-200"
            >
              Banners
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="slides" className="space-y-4 m-0">
              <SlideManager />
            </TabsContent>
            <TabsContent value="banners" className="space-y-4 m-0">
              <BannerManager />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default MediaManager;