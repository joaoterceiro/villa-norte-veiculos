import { Calculator, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FixedBottomBarProps {
  onSimularClick: () => void;
  onInteresseClick: () => void;
}

export const FixedBottomBar = ({
  onSimularClick,
  onInteresseClick,
}: FixedBottomBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="container mx-auto flex gap-3">
        <Button
          onClick={onSimularClick}
          variant="outline"
          className="flex-1 bg-[#FEC6A1] hover:bg-[#FEC6A1]/90 border-none text-[#222222]"
          size="lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Simular
        </Button>
        <Button
          onClick={onInteresseClick}
          className="flex-1 bg-[#F97316] hover:bg-[#F97316]/90 text-white"
          size="lg"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Tenho interesse
        </Button>
      </div>
    </div>
  );
};