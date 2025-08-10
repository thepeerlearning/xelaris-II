"use client"
import React from "react"
import { AddChild } from "../AddChild"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { getChildren } from "@/lib/redux"
import dynamic from "next/dynamic"
import { isEmpty } from "lodash"

const DataLoader = dynamic(() => import("@/components/lottie/loader"), {
  ssr: false,
})
const NoData = dynamic(() => import("@/components/lottie/no-data"), {
  ssr: false,
})
export default function HomePage() {
  const { children: data, loading }: any = useAppSelector(
    (state) => state.parent
  )
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getChildren())
  }, [dispatch])
  return (
    <div className="w-full max-w-[460px] flex flex-col gap-4">
      <h4 className="font-normal font-inter text-[16px]/[24px] sm:text-[17px]/[26px] text-[#171A1F] tracking-normal">
        Enrolled kids
      </h4>

      {/* Enrolled Kid Card */}
      {loading ? (
        <DataLoader />
      ) : isEmpty(data) ? (
        <NoData />
      ) : (
        data?.map((child: any) => (
          <div
            key={child.id}
            className="w-full rounded border border-dashed border-[#252C32]/60 hover:border-[#252C32] transition-colors"
          >
            <div className="flex flex-col gap-2 p-4 sm:p-6">
              <h4 className="font-normal font-inter text-[16px]/[24px] sm:text-[17px]/[26px] text-secondary tracking-normal">
                {child.name}
              </h4>
              <p className="font-normal font-inter text-[14px]/[22px] sm:text-[16px]/[26px] text-secondary tracking-normal">
                {child.course}
              </p>
            </div>
          </div>
        ))
      )}

      {/* Add Child Button */}
      <div className="mt-2">
        <AddChild />
      </div>
    </div>
  )
}
