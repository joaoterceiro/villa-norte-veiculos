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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white to-gray-50/80 backdrop-blur-sm border border-gray-100/50 transition-all duration-300", 
        "hover:shadow-lg hover:shadow-gray-100/50 hover:border-gray-200/50",
        "dark:from-gray-900 dark:to-gray-900/90 dark:border-gray-800/50 dark:hover:border-gray-700/50",
        className
      )}
    >
      <div className="relative z-10 p-4 md:p-6">
        <div className="mb-3 md:mb-4">
          <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gray-100/80 text-gray-600 group-hover:bg-primary/5 group-hover:text-primary transition-colors duration-300 dark:bg-gray-800 dark:text-gray-400">
            <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
          </div>
        </div>
        <div className="space-y-1 md:space-y-2">
          <div className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
            {label}
          </div>
          <div className="text-base md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {value || "—"}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none dark:from-gray-800/50" />
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
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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