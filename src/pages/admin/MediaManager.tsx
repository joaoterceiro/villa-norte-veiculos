import { AdminLayout } from "@/layouts/AdminLayout";
import { BannerManager } from "@/components/admin/media/BannerManager";
import { SlideManager } from "@/components/admin/media/SlideManager";
import { Button } from "@/components/ui/button";
import { Plus, Image, Presentation } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { SlideForm } from "@/components/admin/media/SlideForm";
import { BannerForm } from "@/components/admin/media/BannerForm";

const MediaManager = () => {
  const [isSlideFormOpen, setIsSlideFormOpen] = useState(false);
  const [isBannerFormOpen, setIsBannerFormOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Slides Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Presentation className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">Slides</h2>
                <p className="text-[#8A898C] mt-1">
                  Gerencie os slides do carrossel principal
                </p>
              </div>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsSlideFormOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Slide
            </Button>
          </div>
          <SlideManager />
          <SlideForm
            open={isSlideFormOpen}
            onOpenChange={setIsSlideFormOpen}
          />
        </section>

        <Separator className="my-8" />

        {/* Banners Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Image className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">Banners</h2>
                <p className="text-[#8A898C] mt-1">
                  Gerencie os banners promocionais
                </p>
              </div>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsBannerFormOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Banner
            </Button>
          </div>
          <BannerManager />
          <BannerForm
            open={isBannerFormOpen}
            onOpenChange={setIsBannerFormOpen}
          />
        </section>
      </div>
    </AdminLayout>
  );
};

export default MediaManager;
