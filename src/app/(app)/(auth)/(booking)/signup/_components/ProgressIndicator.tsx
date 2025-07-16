import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  setStep: (index: number) => void;
}

export function ProgressIndicator({
  currentStep,
  setStep,
}: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: "Information" },
    { number: 2, label: "Scheduling" },
    { number: 3, label: "Payment" },
  ];

  return (
    <div className="relative mb-8   overflow-clip">
      {/* Background line */}
      <div
        className={cn(
          "absolute top-5 sm:top-5 left-0 right-0  h-0.5 bg-gray-300"
        )}
      />

      {/* Progress line */}
      <div
        className={cn(
          "absolute top-5 sm:top-5 left-0 h-0.5 bg-black mx-8 sm:mx-10 transition-all duration-300 ",
          {
            "w-[48%]": currentStep === 2,
            "w-full": currentStep === 3,
          }
        )}
      />

      {/* Steps */}
      <div className="flex items-center justify-between relative">
        {steps.map((step) => (
          <div
            key={step.number}
            onClick={() => setStep(step.number)}
            className={cn(
              "flex flex-col first:items-start last:items-end items-center cursor-pointer relative z-40",
              step.number >= currentStep && "cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                `size-10 sm:w-11 sm:h-11 rounded-full bg-white z-50 flex items-center transition-all justify-center text-xs sm:text-sm font-medium ${
                  currentStep >= step.number
                    ? "bg-black text-white font-bold"
                    : "bg-[#F3F3ED]  text-black/80"
                } ${currentStep === step.number && "bg-primary text-black"}`
              )}
            >
              {step.number}
            </div>
            <span
              className={cn(
                "text-xs sm:text-sm sm:mt-2 text-gray-600 text-center max-w-[60px] sm:max-w-none",
                currentStep == step.number && "font-bold text-black"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
