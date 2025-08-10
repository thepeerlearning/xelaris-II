"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import CheckoutForm from "./Form"
import StripeProvider from "../../../AddChild/StripeProvider"

export type StripeTypes = {
  appearance: {
    theme: "stripe"
    variables: {
      colorPrimary: string
    }
  }
}

export function EditPaymentMehtod() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-fit flex gap-2 h-10 text-sm hover:bg-transparent"
        >
          <Edit />
          Edit card
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col gap-5 justify-center items-center">
        <DialogTitle>Edit your payment information</DialogTitle>
        <div className="w-full flex flex-col gap-[60px] justify-center items-center">
          <div className="w-full px-6">
            <StripeProvider>
              <CheckoutForm />
            </StripeProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
