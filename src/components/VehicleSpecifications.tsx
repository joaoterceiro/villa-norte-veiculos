import { cn } from "@/lib/utils";

interface SpecificationProps {
  label: string;
  value: string | number | undefined;
  className?: string;
}

const Specification = ({ label, value, className }: SpecificationProps) => {
  return (
    <div className={cn("p-4 bg-card rounded-lg border shadow-sm", className)}>
      <div className="text-muted text-sm">{label}</div>
      <div className="font-medium mt-1">{value}</div>
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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
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