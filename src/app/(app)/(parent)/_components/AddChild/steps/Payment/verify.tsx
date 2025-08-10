"use client"

import { SuccessIcon } from "@/components/svgs"
import { clearUserData, validatePayment } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import dynamic from "next/dynamic"
import * as React from "react"

const DataLoader = dynamic(() => import("@/components/lottie/loader"), {
  ssr: false,
})
export default function VerifyAddChildPayment({ token }: { token: string }) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    dispatch(validatePayment({ token }))
      .unwrap()
      .then(() => {
        setSuccess(true)
        setLoading(false)
        dispatch(clearUserData())
      })
      .catch(() => {
        setLoading(false)
      })
  }, [dispatch, token])

  return (
    <div className="w-full h-full py-8">
      {loading ? <DataLoader /> : null}
      {success && (
        <div className="w-full flex items-center flex-col gap-6 py-12">
          <SuccessIcon />
          <div className="w-full flex flex-col gap-4 justify-center items-center">
            <h4 className="w-full md:w-[382px] text-secondary font-inter font-normal text-[30px]/[34px] text-center">
              Success! Your child&apos;s class is scheduled and added to your
              calendar.
            </h4>
          </div>
        </div>
      )}
    </div>
  )
}
