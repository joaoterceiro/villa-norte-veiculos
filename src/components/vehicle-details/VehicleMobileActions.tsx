import { Calculator, MessageSquare } from "lucide-react";

interface VehicleMobileActionsProps {
  onFinancingClick: () => void;
  onWhatsAppClick: () => void;
}

export const VehicleMobileActions = ({
  onFinancingClick,
  onWhatsAppClick,
}: VehicleMobileActionsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 grid grid-cols-2 gap-4 z-50">
      <button
        onClick={onFinancingClick}
        className="flex items-center justify-center gap-2 bg-[#FFF5EE] text-primary rounded-lg py-3 px-4"
      >
        <Calculator className="w-5 h-5" />
        <span>Simular</span>
      </button>
      <button
        onClick={onWhatsAppClick}
        className="flex items-center justify-center gap-2 bg-primary text-white rounded-lg py-3 px-4"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Tenho interesse</span>
      </button>
    </div>
  );
};