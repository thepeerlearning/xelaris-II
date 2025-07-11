"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function SuccessStep() {
  return (
    <div className="text-center space-y-8">
      <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 text-black" />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Registration Successful!
        </h1>
        <p className="text-gray-600 max-w-sm mx-auto">
          Your child&apos;s class is confirmed! We&apos;ve sent all the details
          to your email, including the Zoom link and instructor information.
        </p>
      </div>

      <Button
        onClick={() => (window.location.href = "/")}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-full"
      >
        Back to homepage
      </Button>
    </div>
  );
}
