import StripeProvider from "../../StripeProvider"
import CheckoutForm from "./Provider"

export function PaymentStep() {
  return (
    <div className="w-full">
      <StripeProvider>
        <CheckoutForm />
      </StripeProvider>
    </div>
  )
}
