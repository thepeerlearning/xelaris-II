"use client"
import WhiteAppLogo from "@/components/svgs/white-app-logo"
import Link from "next/link"
import { FC } from "react"

export const Header: FC = () => {
  return (
    <header className="w-full fixed top-0 left-0 bg-secondary h-[65px] py-6 px-[21px] border-b border-[#EBEEF1] z-10 flex items-center">
      {/* Logo */}
      <div>
        <Link href="/" className="block">
          <WhiteAppLogo />
        </Link>
      </div>
    </header>
  )
}
