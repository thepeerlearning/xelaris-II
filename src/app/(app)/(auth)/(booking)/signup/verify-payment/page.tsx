"use client"
import DataLoader from "@/components/lottie/loader"
import { Button } from "@/components/ui/button"
import { validatePayment } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import { Check } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React from "react"

export default function VerifyPayment() {
  const search = useSearchParams()
  const token = search.get("t")
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
      })
      .catch(() => {
        setLoading(false)
      })
  }, [dispatch, token])

  return (
    <div className="w-full min-h-screen flex flex-col">
      {loading ? <DataLoader /> : null}
      {success && (
        <div className="flex flex-col justify-center items-center text-black space-y-4 pt-20">
          <div className="bg-primary flex justify-center items-center p-5 rounded-full">
            <Check />
          </div>
          <h2 className="text-2xl">Registration Successful!</h2>
          <p className="text-center">
            Your child&apos;s class is confirmed! We&apos;ve sent all the
            details to your email, including the Zoom link and instructor
            information.
          </p>
          <Button asChild>
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
