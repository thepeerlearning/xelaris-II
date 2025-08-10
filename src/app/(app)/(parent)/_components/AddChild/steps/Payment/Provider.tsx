"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { clearUserData, parentInitiatePayment } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type {
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
} from "@stripe/stripe-js"
import { getCookie } from "cookies-next"
import Image from "next/image"
import React from "react"
import VerifyAddChildPayment from "./verify"

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useAppDispatch()
  const { user }: any = useAppSelector((state: any) => state.signup)
  const [name, setName] = React.useState("")
  const [message, setMessage] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [token, setToken] = React.useState("")

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
        email: user?.email ?? "",
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
        parentInitiatePayment({ inputData })
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
      setToken(paymentIntent?.id)
      setIsOpen(true)
    } catch (err) {
      console.error(err)
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass =
    "selection:bg-primary selection:text-secondary rounded h-10 w-full min-w-0 border bg-transparent px-4 py-2.5 text-base transition-[color] outline-none placeholder:text-[#BDC1CA] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-[15px]/[22px]"

  const stripeStyle = {
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
    <React.Fragment>
      {isOpen ? (
        <VerifyAddChildPayment token={token} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full xl:w-[420px] grid grid-cols-1 gap-[10px]"
        >
          <div className="w-full relative flex flex-col gap-1">
            <Label htmlFor="name">Name on card</Label>
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
                options={stripeStyle}
                className={inputClass}
              />{" "}
              <Image
                src="/cards.svg"
                alt="payment cards"
                width={10}
                height={20}
                className="w-auto h-auto absolute right-0 top-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className=" w-full relative flex flex-col gap-1">
              <Label htmlFor="expiry">Expiry</Label>

              <CardExpiryElement
                id="expiry"
                options={stripeStyle}
                className={inputClass}
              />
            </div>

            <div className="w-full relative flex flex-col gap-1">
              <Label htmlFor="cvc">CVC</Label>
              <div className="relative">
                <CardCvcElement
                  id="cvc"
                  options={stripeStyle}
                  className={inputClass}
                />
                <Image
                  src="/cvv.svg"
                  alt="Cvv icon"
                  width={10}
                  height={20}
                  className="w-auto h-auto absolute right-2 top-3"
                />
              </div>
            </div>
          </div>

          <Button
            disabled={isLoading || !stripe}
            type="submit"
            className="w-full h-[46px] rounded py-[13.5px] px-[10px] flex gap-[10px] mt-4"
          >
            {isLoading ? "Processing..." : "Submit Payment"}
          </Button>

          {message && (
            <p className="text-sm text-red-600 text-center mt-2">{message}</p>
          )}
        </form>
      )}
    </React.Fragment>
  )
}
