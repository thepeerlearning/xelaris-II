"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import convertToSubcurrency from "@/lib/utils";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SignUpData } from "../../types";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface PaymentStepProps {
  formData: SignUpData;
}

export function PaymentStep({ formData }: PaymentStepProps) {
  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(+formData.classDuration),
          currency: "usd",
        }}
      >
        <CheckoutForm amount={+formData.classDuration} data={formData} />
      </Elements>
    </div>
  );
}

const CheckoutForm = ({
  amount,
  data,
}: {
  amount: number;
  data: SignUpData;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount), data }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount, data]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}&email=${data.email}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className=" p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div className="mt-1 text-red-500">{errorMessage}</div>}

      <Button disabled={!stripe || loading} className="w-full mt-5">
        {!loading ? `Pay $${amount}` : "Processing..."}
      </Button>

      <p className="text-center text-black mt-5 text-sm">
        🔒 We use Stripe to securely manage your payment information and we
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
  );
};
