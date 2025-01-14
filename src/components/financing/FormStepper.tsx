import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
}

export const FormStepper = ({ currentStep, totalSteps }: FormStepperProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: currentStep >= index + 1 ? 1 : 0.8,
                opacity: 1 
              }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                currentStep > index
                  ? "bg-primary shadow-lg shadow-primary/20"
                  : currentStep === index + 1
                  ? "bg-primary ring-4 ring-primary/20"
                  : "bg-gray-100",
                "relative"
              )}
            >
              <span className={cn(
                "text-base font-medium transition-colors",
                currentStep >= index + 1 ? "text-white" : "text-gray-400"
              )}>
                {index + 1}
              </span>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500">
                {index === 0 ? "Dados Pessoais" : index === 1 ? "Dados Financeiros" : "Documentação"}
              </span>
            </motion.div>
            {index < totalSteps - 1 && (
              <div className="flex-1 h-[2px] mx-4">
                <div className={cn(
                  "h-full transition-all duration-500",
                  currentStep > index ? "bg-primary" : "bg-gray-100"
                )} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};