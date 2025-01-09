import { cn } from "@/lib/utils";

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
}

export const FormStepper = ({ currentStep, totalSteps }: FormStepperProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200",
                currentStep > index
                  ? "bg-primary text-white"
                  : currentStep === index
                  ? "bg-primary text-white ring-4 ring-primary/20"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 mx-2 transition-colors duration-200",
                  currentStep > index ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};