/* eslint-disable @typescript-eslint/no-require-imports */
import { env } from "@/config/env";
import { NextRequest, NextResponse } from "next/server";

// Temporary SignUpData interface - will be moved to centralized types
interface SignUpData {
  parentName: string;
  childName: string;
  email: string;
  password: string;
  phone: string;
  timezone: string;
  childAge: string;
  classDuration: string;
  availableDay: string;
  availableTime: string;
}

const stripe = require("stripe")(env.STRIPE_SECRET_KEY);

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
