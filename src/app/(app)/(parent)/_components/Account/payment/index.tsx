"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EditPaymentMehtod } from "./edit"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import dynamic from "next/dynamic"
import { isEmpty } from "lodash"
import { useEffect } from "react"
import { getPaymentMethod } from "@/lib/redux"

const DataLoader = dynamic(() => import("@/components/lottie/loader"), {
  ssr: false,
})
const NoData = dynamic(() => import("@/components/lottie/no-data"), {
  ssr: false,
})
export function PaymentInfo() {
  const { paymentMethod, methodLoading: loading }: any = useAppSelector(
    (state) => state.parent
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPaymentMethod())
  }, [dispatch])

  return (
    <div className="w-full h-full space-y-4">
      <h2 className="text-xl font-semibold mb-4">Payment information</h2>
      {loading ? (
        <div className="w-full max-w-[560px] h-full md:h-[298px] rounded-[12px] border border-solid border-[#EAECF0] px-8 py-4 flex flex-col gap-2 place-content-center">
          <DataLoader />
        </div>
      ) : isEmpty(paymentMethod) ? (
        <NoData />
      ) : (
        <>
          {paymentMethod?.data.map((payment: any, index: number) => (
            <div
              className="w-full md:w-[568px] rounded-xl border border-solid border-[#EAECF0] p-6 shadow-[0px_1px_2px_0px_#1018280D] flex flex-col gap-6"
              key={index}
            >
              <div className="w-full flex flex-col md:flex-row gap-6">
                <div className="w-full relative flex flex-col gap-1">
                  <Label htmlFor="name">Name on card</Label>
                  <Input
                    id="name"
                    value={payment.billing_details.name}
                    disabled
                  />
                </div>
                <div className="w-[158px]">
                  <Label htmlFor="name">Expiry</Label>
                  <Input
                    id="expiry"
                    value={`${payment.card.exp_month}/${payment.card.exp_year}`}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <Label htmlFor="name">Card type</Label>
                  <Input id="cardtype" value={payment.card.brand} disabled />
                </div>
                <div className="w-[158px]">
                  <Label htmlFor="name">Card No (Last 4)</Label>
                  <Input id="cardnumber" value={payment.card.last4} disabled />
                </div>
              </div>
              <EditPaymentMehtod />
            </div>
          ))}
        </>
      )}
    </div>
  )
}
