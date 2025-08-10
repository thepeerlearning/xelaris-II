"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getCookie } from "cookies-next"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { StepIndicator } from "./Stepper"
import { PersonalInfoStep } from "./steps/Information"
import { PaymentStep } from "./steps/Payment"
import { ClassSchedulingStep } from "./steps/Scheduling"

export function AddChild() {
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    const step = getCookie("step")
    if (step === "account_created") {
      setCurrentStep(2)
    } else if (step === "class_schedule") {
      setCurrentStep(3)
    } else {
      setCurrentStep(1)
    }
  }, [])
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[180px]">
          Add another child <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col gap-5 justify-center items-center">
        <DialogTitle>Add Child</DialogTitle>
        <div className="w-full flex flex-col gap-[60px] justify-center items-center">
          <StepIndicator currentStep={currentStep} totalSteps={3} />
          <div className="">
            {currentStep === 1 && <PersonalInfoStep nextStep={nextStep} />}

            {currentStep === 2 && (
              <ClassSchedulingStep nextStep={nextStep} prevStep={prevStep} />
            )}

            {currentStep === 3 && <PaymentStep />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
