import { cn } from "@/lib/utils";

interface SpecificationProps {
  label: string;
  value: string | number | undefined;
  className?: string;
}

const Specification = ({ label, value, className }: SpecificationProps) => {
  return (
    <div className={cn(
      "p-3 md:p-4 bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md", 
      className
    )}>
      <div className="text-[#8A8A8A] text-xs md:text-sm font-medium mb-1">{label}</div>
      <div className="text-[#14181B] text-sm md:text-base font-semibold">
        {value || "—"}
      </div>
    </div>
  );
};

interface VehicleSpecificationsProps {
  specifications: {
    label: string;
    value: string | number | undefined;
  }[];
}

export const VehicleSpecifications = ({ specifications }: VehicleSpecificationsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
      {specifications.map((spec, index) => (
        <Specification
          key={index}
          label={spec.label}
          value={spec.value}
        />
      ))}
    </div>
  );
};