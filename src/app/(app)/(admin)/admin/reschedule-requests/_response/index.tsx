import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { acceptRequest, getAdminReschedules } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import { convert24To12, convertDayToShortForm } from "@/lib/utils"
import { CircleArrowDown } from "lucide-react"
import { useState } from "react"
import RejectReschedule from "../_reject"

export default function RespondToReschedule({ row }: any) {
  const [loading, setLoading] = useState(false)
  const [slotId, setSlotId] = useState("")
  const dispatch = useAppDispatch()

  const handleAcceptRequest = (id: string) => {
    const inputData = {
      slot_id: id,
    }
    setSlotId(id)
    setLoading(true)
    dispatch(acceptRequest({ inputData }))
      .then(() => {
        setLoading(false)
        dispatch(getAdminReschedules())
      })
      .catch(() => {
        setLoading(false)
      })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-[113px] h-[36px] py-[10px] px-[40px] rounded-lg gap-2 bg-[#FDFDFD] text-[#242426] text-sm/[16.94px] font-normal font-inter flex">
          <CircleArrowDown />
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="w-full p-4 flex flex-col gap-[48px] md:gap-[4px] shadow-[0px_30px_60px_0px_#00000040]">
          <div className="w-full h-full md:h-[108px] pr-4 pl-6 py-4 grid grid-cols-1 gap-2">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="w-full flex flex-col">
                <h4 className="w-full font-normal font-inter text-primary text-sm/[18px]">
                  Current Schedule
                </h4>
                <p className="w-full font-medium font-inter text-[#242426] text-sm/[18px]">
                  {`${convertDayToShortForm(row.current_day)} ${convert24To12(
                    row.current_time
                  )}`}
                </p>
              </div>
              <div className="w-full flex flex-col">
                <h4 className="font-normal font-inter text-primary text-sm/[18px]">
                  Requested Week
                </h4>
                <p className="font-medium font-inter text-[#242426] text-sm/[18px]">
                  Week {row.requested_week}
                </p>
              </div>
              <div className="w-full flex flex-col">
                <h4 className="w-full font-normal font-inter text-primary text-sm/[18px]">
                  Requested New Times
                </h4>
                <p className="w-full font-medium font-inter text-[#242426] text-sm/[18px]">
                  Preferred (Time slot 1){" "}
                  {`${convertDayToShortForm(
                    row.slots?.[0].day
                  )} ${convert24To12(row.slots?.[0].time)}`}
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {row.status.toLowerCase() === "accepted" ? null : (
                <div className="w-full flex justify-end items-end">
                  <Button
                    className="bg-[#FFFFFF] border border-solid border-[#BBBFC1] rounded-[4px] px-6 h-[48px] w-[128px] flex justify-center items-center gap-2 text-[#242731] font-medium font-inter text-[16px]/[24px]"
                    onClick={() => handleAcceptRequest(row.slots?.[0].id)}
                  >
                    {slotId === row.slots?.[0].id && loading
                      ? "Accepting..."
                      : "Accept"}
                  </Button>
                </div>
              )}
            </div>
            {/* FILTER */}
            <div className="w-full grid grid-cols-1 gap-4 md:hidden">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="w-full flex flex-col">
                  <h4 className="w-full font-normal font-inter text-primary text-sm/[18px]">
                    Requested New Times
                  </h4>
                  <p className="w-full font-medium font-inter text-[#242426] text-sm/[18px]">
                    Preferred (Time slot 2){" "}
                    {`${convertDayToShortForm(
                      row.slots?.[1].day
                    )} ${convert24To12(row.slots?.[1].time)}`}
                  </p>
                </div>
                {row.status.toLowerCase() === "accepted" ? null : (
                  <div className="w-full flex justify-end items-end">
                    <Button
                      className="bg-[#FFFFFF] border border-solid border-[#BBBFC1] rounded-[4px] px-6 h-[48px] w-[128px] flex justify-center items-center gap-2 text-[#242731] font-medium font-inter text-[16px]/[24px]"
                      onClick={() => handleAcceptRequest(row.slots?.[1].id)}
                      disabled={loading}
                    >
                      {slotId === row.slots?.[1].id && loading
                        ? "Accepting..."
                        : "Accept"}
                    </Button>
                  </div>
                )}
                {row.status.toLowerCase() === "accepted" ? null : (
                  <div className="w-full flex justify-end items-end">
                    <Button
                      className="bg-[#FFFFFF] border border-solid border-[#BBBFC1] rounded-[4px] px-6 h-[48px] w-[128px] flex justify-center items-center gap-2 text-[#242731] font-medium font-inter text-[16px]/[24px]"
                      onClick={() => handleAcceptRequest(row.slots?.[1].id)}
                      disabled={loading}
                    >
                      {slotId === row.slots?.[1].id && loading
                        ? "Accepting..."
                        : "Accept"}
                    </Button>
                  </div>
                )}
                {row.status.toLowerCase() === "accepted" ? null : (
                  <div className="w-full flex justify-end items-end">
                    <RejectReschedule />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hidden w-full h-full md:h-[108px] pr-4 pl-6 py-4 md:flex">
            <div className="w-full grid grid-cols-1 gap-4">
              {row.status.toLowerCase() === "accepted" ? null : (
                <div className="w-full grid grid-cols-2 gap-6">
                  <RejectReschedule />
                </div>
              )}

              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="w-full flex flex-col">
                  <h4 className="w-full font-normal font-inter text-primary text-sm/[18px]">
                    Requested New Times
                  </h4>
                  <p className="w-full font-medium font-inter text-[#242426] text-sm/[18px]">
                    Preferred (Time slot 2){" "}
                    {`${convertDayToShortForm(
                      row.slots?.[1].day
                    )} ${convert24To12(row.slots?.[1].time)}`}
                  </p>
                </div>
                {row.status.toLowerCase() === "accepted" ? null : (
                  <Button
                    className="bg-[#FFFFFF] border border-solid border-[#BBBFC1] rounded-[4px] px-6 h-[48px] w-[128px] flex justify-center items-center gap-2 text-[#242731] font-medium font-inter text-[16px]/[24px]"
                    onClick={() => handleAcceptRequest(row.slots?.[1].id)}
                    disabled={loading}
                  >
                    {row.slots?.[1].id && loading ? "sending..." : "Accept"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
