/* eslint-disable @typescript-eslint/no-require-imports */
import { SignUpData } from "@/modules/dashboard/types";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount, data } = await request.json();

    const formData = data as SignUpData;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      receipt_email: formData.email,
      automatic_payment_methods: { enabled: true },
      metadata: { ...formData },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);

    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
