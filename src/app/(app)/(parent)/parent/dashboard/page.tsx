"use client"

import { useEffect, useState } from "react"
import { PersonalInfo } from "../../_components/Account"
import HomePage from "../../_components/Home"
import { PaymentInfo } from "../../_components/Account/payment"
import { ChangePassword } from "../../_components/Settings"
import { useAppSelector } from "@/lib/redux/hooks"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { getParentProfile } from "@/lib/redux"

export default function ParentDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(1)
  const steps = ["Home", "Account", "Settings"]

  const { user, isLoggedIn }: any = useAppSelector((state: any) => state.auth)
  const { profile }: any = useAppSelector((state: any) => state.parent)

  const dispatch = useDispatch()

  useEffect(() => {
    const role = user?.role?.toLowerCase()

    if (isLoggedIn === false && role !== "parent") {
      router.push("/login")
      return
    }
    if (isLoggedIn === true && role !== "parent") {
      router.push("/access-denied")
      return
    }

    // Fetch latest parent profile
    dispatch(getParentProfile() as any)
  }, [isLoggedIn, router, user, dispatch])

  // Optional: small guard if profile is still loading
  const displayName = profile?.name ?? user?.name

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[64px] flex flex-col gap-8 md:gap-12">
      {/* Welcome Section */}
      <div className="w-full flex flex-col gap-1 py-4">
        <h2 className="font-inter font-normal text-[16px]/[22px] sm:text-[18px]/[24px] -tracking-[1.4%] text-secondary">
          Welcome
        </h2>
        <h4 className="font-inter font-normal text-[28px]/[36px] sm:text-[32px]/[42px] md:text-[36px]/[48px] -tracking-[2.2%] text-white capitalize">
          {displayName}
        </h4>
        <p className="font-inter font-normal text-[14px]/[20px] sm:text-[15px]/[24px] -tracking-[0.6%] text-white">
          Find everything you need to stay informed
        </p>
      </div>

      {/* Tabs and Content Section */}
      <div className="w-full border-b border-[#FBF8E6] flex flex-col gap-4 md:gap-6 pb-8">
        {/* Tabs */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="min-w-max flex gap-4 sm:gap-[32px] pb-1">
            {steps?.map((item, index) => (
              <button
                key={item}
                className={`font-inter font-normal text-[14px]/[24px] -tracking-[0.6%] pb-2 transition-colors ${
                  activeTab === index + 1
                    ? "text-primary border-b-2 border-primary"
                    : "text-white hover:text-primary/80"
                }`}
                onClick={() => setActiveTab(index + 1)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 1 ? (
          <HomePage />
        ) : activeTab === 2 ? (
          <div className="w-full flex flex-col 2xl:flex-row justify-between gap-4">
            <PersonalInfo profile={profile} />
            <PaymentInfo />
          </div>
        ) : activeTab === 3 ? (
          <ChangePassword />
        ) : null}
      </div>
    </div>
  )
}
