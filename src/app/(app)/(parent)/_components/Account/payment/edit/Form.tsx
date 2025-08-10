"use client"
import { Button } from "@/components/ui/button"
import { editPaymentMethod, getPaymentMethod } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import React from "react"

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { user }: any = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    if (!stripe || !elements) {
      setIsLoading(false)
      return
    }

    // const cardElement = elements.getElement(CardElement)
    const cardNumberElement = elements.getElement(CardNumberElement)
    const cardExpiryElement = elements.getElement(CardExpiryElement)
    const cardCvcElement = elements.getElement(CardCvcElement)

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      setIsLoading(false)
      return
    }

    const { error, paymentMethod }: any = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: {
        name: user?.name,
        email: user?.email,
      },
    })
    if (error) {
      setIsLoading(false)
      setMessage(error.message)
    } else {
      const inputData = {
        pm_id: paymentMethod.id,
      }
      dispatch(editPaymentMethod({ inputData }))
        .unwrap()
        .then(() => {
          setIsLoading(false)
          dispatch(getPaymentMethod())
        })
        .catch(() => {
          setIsLoading(false)
        })
    }
  }

  const cardElementOptions: any = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1A1A1A",
        "::placeholder": { color: "#BDC1CA" },
      },
      invalid: { color: "#E23353" },
    },
    hidePostalCode: true,
    showIcon: true,
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-8"
      id="payment-form"
    >
      <div className="w-full flex gap-2">
        <div className="w-2/3 relative flex flex-col gap-1">
          <label
            className="text-secondary text-sm font-normal font-inter tracking-[0.6000000238418579px] text-left disabled:text-[#98A2B3]"
            htmlFor="expiry"
          >
            Card number
          </label>
          <CardNumberElement
            options={cardElementOptions}
            className={`w-full bg-white px-[18px] py-2 h-[40px] border border-solid border-border font-inter text-[16px]/[24px] font-normal cursor-text text-[#667085] hover:border-solid hover:border-b-0 hover:shadow-[0px_2px_0px_0px_#E4F222] hover:border-[#E4E5FC] focus:outline-none focus:border-solid focus:border-b-0 focus:border-[#E4E5FC] focus:shadow-[0px_2px_0px_0px_#E4F222] disabled:bg-[#E1E1E1] disabled:text-[#667085] disabled:hover:border-[#F5F5F5] disabled:cursor-not-allowed placeholder:text-[#98A2B3] placeholder:text-[15px]/[17.5px]`}
          />
        </div>
        <div className="w-1/3 flex gap-2">
          <div className="w-1/2 relative flex flex-col gap-1">
            <label
              className="text-secondary text-sm font-normal font-inter tracking-[0.6000000238418579px] text-left disabled:text-[#98A2B3]"
              htmlFor="expiry"
            >
              Expiry
            </label>
            <CardExpiryElement
              options={cardElementOptions}
              className={`w-full bg-white px-[18px] py-2 h-[40px] border border-solid border-border font-inter text-[16px]/[24px] font-normal cursor-text text-[#667085] hover:border-solid hover:border-b-0 hover:shadow-[0px_2px_0px_0px_#E4F222] hover:border-[#E4E5FC] focus:outline-none focus:border-solid focus:border-b-0 focus:border-[#E4E5FC] focus:shadow-[0px_2px_0px_0px_#E4F222] disabled:bg-[#E1E1E1] disabled:text-[#667085] disabled:hover:border-[#F5F5F5] disabled:cursor-not-allowed placeholder:text-[#98A2B3] placeholder:text-[15px]/[17.5px]`}
            />
          </div>
          <div className="w-1/2 relative flex flex-col gap-1">
            <label
              className="text-secondary text-sm font-normal font-inter tracking-[0.6000000238418579px] text-left disabled:text-[#98A2B3]"
              htmlFor="expiry"
            >
              CVV
            </label>
            <CardCvcElement
              options={cardElementOptions}
              className={`w-full bg-white px-[18px] py-2 h-[40px] border border-solid border-border font-inter text-[16px]/[24px] font-normal cursor-text text-[#667085] hover:border-solid hover:border-b-0 hover:shadow-[0px_2px_0px_0px_#E4F222] hover:border-[#E4E5FC] focus:outline-none focus:border-solid focus:border-b-0 focus:border-[#E4E5FC] focus:shadow-[0px_2px_0px_0px_#E4F222] disabled:bg-[#E1E1E1] disabled:text-[#667085] disabled:hover:border-[#F5F5F5] disabled:cursor-not-allowed placeholder:text-[#98A2B3] placeholder:text-[15px]/[17.5px]`}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button disabled={isLoading || !stripe}>
          {isLoading ? "Processing..." : "Submit Payment"}
        </Button>
      </div>
      {message && (
        <div
          id="payment-message"
          className="font-normal font-inter text-center text-sm text-primary -tracking-[1.2px] my-[20px]"
        >
          {message}
        </div>
      )}
    </form>
  )
}
