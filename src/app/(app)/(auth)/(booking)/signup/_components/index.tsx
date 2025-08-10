"use client"
import { useState } from "react"
import { InformationStep } from "./InformationStep"
import { PaymentStep } from "./PaymentStep"
import { ProgressIndicator } from "./ProgressIndicator"
import { SchedulingStep } from "./SchedulingStep"
import { SignUpData } from "./type"

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<SignUpData>({
    parentName: "",
    childName: "",
    email: "",
    phone: "",
    password: "",
    timezone: "",
    childAge: "",
    classDuration: "",
    amount: "",
    availableDay: "",
    availableTime: "",
  })

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }
  const handlePickStep = (index: number) => {
    if (index > currentStep) return
    setCurrentStep(index)
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <InformationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <SchedulingStep
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return <PaymentStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <>
      {currentStep < 4 && (
        <div className="mb-8">
          <ProgressIndicator
            currentStep={currentStep}
            setStep={handlePickStep}
          />
        </div>
      )}

      {renderStep()}
    </>
  )
}

export default SignUpForm
