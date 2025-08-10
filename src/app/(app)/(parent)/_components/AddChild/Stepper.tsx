interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  // Define step titles
  const stepTitles = ["Information", "Class Scheduling", "Payment"]

  return (
    <div className="w-[180px] flex items-center justify-center px-4 md:px-3">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <div
            key={stepNumber}
            className="w-full h-[49px] flex flex-col items-center gap-2"
          >
            <div className="flex items-center">
              {/* Step circle */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full  ${
                  isActive
                    ? "text-secondary"
                    : isCompleted
                    ? "bg-[#E7E4D4] text-black/83"
                    : "bg-black/8 text-black/83"
                }`}
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)),linear-gradient(90deg, #2A2A2A 0%, rgba(0, 0, 0, 0) 0%)`,
                }}
              >
                <span className="text-[14px]/[18px] font-inter font-medium tracking-normal">
                  {stepNumber}
                </span>
              </div>

              {/* Connector line */}
              {stepNumber < totalSteps && (
                <div
                  className={`h-1 min-w-[124.67px] ${
                    stepNumber < currentStep
                      ? "bg-secondary"
                      : "bg-[linear-gradient(0deg,rgba(0,0,0,0.08),rgba(0,0,0,0.08)),linear-gradient(90deg,#2A2A2A_0%,rgba(0,0,0,0)_0%)]"
                  }`}
                />
              )}
            </div>

            {/* Step title */}
            <p
              className={`w-full font-inter font-medium tracking-normal text-[13.67px]/[18px] text-black/83}`}
            >
              {stepTitles[index]}
            </p>
          </div>
        )
      })}
    </div>
  )
}
