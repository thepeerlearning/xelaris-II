"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AccessDeniedPage() {
  const router = useRouter()
  return (
    <div className="bg-white bg-no-repeat bg-top bg-fixed relative flex flex-col items-center min-h-[100vh] overflow-hidden place-content-center">
      <div className="bg-top bg-no-repeat max-w-[768px] flex flex-col justify-center items-center bg-white">
        <Button className="w-fit h-[48px] flex gap-[2px] justify-center items-center py-[12px] px-[18px] rounded-lg border border-solid border-[#D0D5DD] bg-white shadow-[0px_1px_2px_0px_rgba(16, 24, 40, 0.05)] cursor-pointer">
          <span className="text-white text-5xl -mt-1">&bull;</span>
          <p className="p-0 m-0 text-white font-semibold font-inter text-[16px]/[20px]">
            401 error
          </p>
        </Button>
        <h1 className="w-full flex text-center flex-col text-white m-0 font-bold font-inter text-2xl sm:text-[40px]/[60px] -tracking-[0.02em]">
          You&apos;re not authorize to view this page
          <span className="text-center text-white m-0 font-normal font-inter text-[20px]/[30px]">
            Please login with right credentials
          </span>
        </h1>
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center mt-[32px]">
          <div
            className="w-full md:w-[150px] h-[48px] flex justify-center items-center py-[12px] px-[18px] rounded-lg border border-solid border-[#D0D5DD] bg-primary text-black shadow-[0px_1px_2px_0px_rgba(16, 24, 40, 0.05)] cursor-pointer font-semibold font-inter text-[18px]/[28px]"
            onClick={() => router.push("/")}
          >
            Go home
          </div>
        </div>
      </div>
    </div>
  )
}
