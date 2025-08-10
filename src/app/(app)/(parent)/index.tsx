"use client"

import type { Metadata } from "next"
import React from "react"
import { Header } from "./_components/Header"
import Image from "next/image"
import { NotificationIcon } from "@/components/svgs"

export const metadata: Metadata = {
  title: "Parent Dashboard | xelaris",
  description: "Parent Dasboard to manage kids information",
}

export default function LandingRootLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[#1D1F24]">
      <Header />
      <div className="w-full h-[53px] flex justify-end items-center mt-[63px]">
        <div className="w-[185px] h-full flex justify-end items-end gap-1 px-[21px]">
          <NotificationIcon />
          <div className="w-6 h-6 rounded-full flex justify-center items-center border border-[#0000001A]">
            <Image
              src="/images/avatar-placeholder.webp"
              alt="profile avatar"
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <main className="flex-grow flex-1">{children}</main>
    </div>
  )
}
