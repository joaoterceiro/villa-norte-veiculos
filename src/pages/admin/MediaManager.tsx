import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BannerManager } from "@/components/admin/media/BannerManager";
import { SlideManager } from "@/components/admin/media/SlideManager";

const MediaManager = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciador de Mídia</h1>
          <p className="text-muted-foreground">
            Gerencie os banners e slides do site
          </p>
        </div>

        <Tabs defaultValue="slides" className="space-y-4">
          <TabsList>
            <TabsTrigger value="slides">Slides</TabsTrigger>
            <TabsTrigger value="banners">Banners</TabsTrigger>
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