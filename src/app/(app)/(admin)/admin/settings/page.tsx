"use client"
import { useState } from "react"
import { ChangePassword } from "./_personal-information"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(1)
  const steps = ["Home"]

  return (
    <div className="w-full flex flex-col relative min-h-screen overflow-hidden gap-6">
      <div className="w-full md:w-[426px] flex flex-col gap-6">
        <h1 className="text-white font-arial font-bold text-[24px]/[32px] md:text-[26px]/[38px] text-left">
          Settings
          <span className="block text-white/60 font-arial font-normal text-[16px]/[24px] text-left">
            Update your profile to get a personalized experience
          </span>
        </h1>
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
                    : "text-black hover:text-primary"
                }`}
                onClick={() => setActiveTab(index + 1)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 1 ? <ChangePassword /> : null}
      </div>
    </div>
  )
}
