import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Activity, Calendar, Car, Fuel, Gauge, Layers, Palette, Settings, Tag } from "lucide-react";

const icons = {
  car: Car,
  tag: Tag,
  calendar: Calendar,
  layers: Layers,
  palette: Palette,
  fuel: Fuel,
  door: Car,
  settings: Settings,
  gauge: Gauge,
  activity: Activity,
};

interface SpecificationProps {
  label: string;
  value: string | number | undefined;
  icon: keyof typeof icons;
  className?: string;
}

const Specification = ({ label, value, icon, className }: SpecificationProps) => {
  const Icon = icons[icon];

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={cn(
        "p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md group", 
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-xl bg-gray-50 text-gray-500 group-hover:bg-primary/5 group-hover:text-primary transition-colors duration-200">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="flex-1">
          <div className="text-sm md:text-base text-gray-500 font-medium mb-1">{label}</div>
          <div className="text-base md:text-lg text-gray-900 font-semibold">
            {value || "—"}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface VehicleSpecificationsProps {
  specifications: Array<{
    label: string;
    value: string | number | undefined;
    icon: keyof typeof icons;
  }>;
}

export const VehicleSpecifications = ({ specifications }: VehicleSpecificationsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {specifications.map((spec, index) => (
        <Specification
          key={index}
          label={spec.label}
          value={spec.value}
          icon={spec.icon}
        />
      ))}
    </div>
  );
};