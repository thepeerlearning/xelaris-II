"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { env } from "@/config/env"
import { clearUserData, initiatePayment } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import {
  loadStripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
} from "@stripe/stripe-js"
import { getCookie } from "cookies-next"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

// Define the SignUpData interface as it's used in the component
interface SignUpData {
  parentName: string
  amount: string
  childName: string
  email: string
  password: string
  phone: string
  timezone: string
  childAge: string
  classDuration: string
  availableDay: string
  availableTime: string
}

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

interface PaymentStepProps {
  formData: SignUpData
}

export function PaymentStep({ formData }: PaymentStepProps) {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={+formData?.amount} data={formData} />
      </Elements>
    </div>
  )
}

const CheckoutForm = ({
  amount,
  data,
}: {
  amount: number
  data: SignUpData
}) => {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useAppDispatch()
  const [name, setName] = React.useState(data?.parentName ?? "")
  const [message, setMessage] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    if (!stripe || !elements) {
      setMessage("Stripe is not loaded.")
      setIsLoading(false)
      return
    }

    const cardNumber = elements.getElement(
      CardNumberElement
    ) as StripeCardNumberElement
    const cardExpiry = elements.getElement(
      CardExpiryElement
    ) as StripeCardExpiryElement
    const cardCvc = elements.getElement(CardCvcElement) as StripeCardCvcElement

    if (!cardNumber || !cardExpiry || !cardCvc) {
      setMessage("Please fill all card fields.")
      setIsLoading(false)
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumber,
      billing_details: {
        name,
        email: data?.email ?? "",
      },
    })

    if (error) {
      setMessage(error.message ?? "Failed to create payment method.")
      setIsLoading(false)
      return
    }

    try {
      const classId = getCookie("cl_id")
      const inputData = {
        class_id: classId,
        pm_id: paymentMethod.id,
      }

      const { data: clientSecret } = await dispatch(
        initiatePayment({ inputData })
      ).unwrap()

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        })

      if (confirmError) {
        setMessage(confirmError.message ?? "Payment failed.")
        setIsLoading(false)
        return
      }

      dispatch(clearUserData())
      router.push(`/signup/verify-payment?t=${paymentIntent?.id}`)
    } catch (err) {
      console.error(err)
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    )
  }
  const inputClass =
    "text-black w-full min-w-0 h-10 border border-gray-100 outline-0 focus:outline-0 bg-white px-3 py-1 text-base  transition-colors outline-none placeholder:text-[#BDC1CA] focus:border-background disabled:cursor-not-allowed disabled:opacity-50"

  const baseStyle = {
    style: {
      base: {
        color: "#000000",
        backgroundColor: "#FFFFFF",
        fontSize: "16px",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
        "::placeholder": { color: "#BDC1CA" },
        iconColor: "#BDC1CA",
      },
      invalid: { color: "#E23353" },
    },
  } as const

  const numberOptions = { ...baseStyle, showIcon: true } // OK for CardNumber
  const expiryOptions = { ...baseStyle } // no showIcon/hidePostalCode
  const cvcOptions = { ...baseStyle } // no showIcon/hidePostalCode
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full xl:w-[420px] grid grid-cols-1 gap-[10px]"
    >
      <div className="w-full relative flex flex-col gap-1">
        <Label htmlFor="name">Name On Card</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="w-full relative flex flex-col gap-1">
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative">
          <CardNumberElement
            id="cardNumber"
            options={numberOptions}
            className={`${inputClass} pr-12 z-10`}
          />
          <Image
            src="/cards.svg"
            alt=""
            width={24}
            height={16}
            aria-hidden="true"
            className="w-auto h-auto pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 z-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className=" w-full relative flex flex-col gap-1">
          <Label htmlFor="expiry">Expiry</Label>

          <CardExpiryElement
            id="expiry"
            options={expiryOptions}
            className={inputClass}
          />
        </div>

        <div className="w-full relative flex flex-col gap-1">
          <Label htmlFor="cvc">CVC</Label>
          <div className="relative">
            <CardCvcElement
              id="cvc"
              options={cvcOptions}
              className={`${inputClass} pr-10`}
            />
            <Image
              src="/cvv.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className="w-auto h-auto pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      <Button
        disabled={isLoading || !stripe}
        type="submit"
        className="w-full h-[46px] rounded py-[13.5px] px-[10px] flex gap-[10px] mt-4"
      >
        {!isLoading ? `Pay $${amount}` : "Processing..."}
      </Button>

      {message && (
        <p className="text-sm text-red-600 text-center mt-2">{message}</p>
      )}
      <p className="text-center text-black mt-5 text-sm">
        🔒 We use Stripe to securely manage your payment information and we
        never store your complete card number ourselves.
      </p>
      <div className="flex justify-center mt-5">
        <Image
          src="/assets/logos/stripe-banner.svg"
          alt="stripe"
          width={150}
          height={33}
          className="w-auto h-auto"
        />
      </div>
    </form>
  )
}
