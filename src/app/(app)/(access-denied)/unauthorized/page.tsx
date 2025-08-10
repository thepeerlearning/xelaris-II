"use client"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/redux/features/auth/authSlice"
import { useAppDispatch } from "@/lib/redux/hooks"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  return (
    <div className="bg-[#1D1F24]  bg-no-repeat bg-top bg-fixed relative flex flex-col items-center min-h-[100vh] overflow-hidden place-content-center">
      <div className="bg-top bg-no-repeat max-w-[768px] flex flex-col justify-center items-center bg-[#1D1F24]">
        <Button className="w-fit h-[48px] flex gap-[2px] justify-center items-center py-[12px] px-[18px] rounded-lg border border-solid border-[#D0D5DD] bg-[#1D1F24] shadow-[0px_1px_2px_0px_rgba(16, 24, 40, 0.05)] cursor-pointer">
          <span className="text-white text-5xl -mt-1">&bull;</span>
          <p className="p-0 m-0 text-white font-semibold font-inter text-[16px]/[20px]">
            401 error
          </p>
        </Button>
        <h1 className="w-full flex text-center flex-col text-secondary m-0 font-bold font-inter text-2xl sm:text-[40px]/[60px] -tracking-[0.02em]">
          Your session has expired.
          <span className="text-center text-secondary m-0 font-normal font-inter text-[20px]/[30px]">
            Please log in again to continue.
          </span>
        </h1>
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center mt-[32px]">
          <Button
            onClick={() => {
              dispatch(logout())
              router.push("/")
            }}
            style={{ width: 200 }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
