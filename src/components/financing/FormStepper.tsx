import { cn } from "@/lib/utils";

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
}

export const FormStepper = ({ currentStep, totalSteps }: FormStepperProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep > index
                  ? "bg-primary text-white"
                  : currentStep === index
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-1 w-full mx-2",
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