"use client"
import DataLoader from "@/components/lottie/loader"
import NoData from "@/components/svgs/no-data"
import { timezoneToCountry } from "@/lib/data"
import { getStudents } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { convert24To12, getInitials } from "@/lib/utils"
// import { Avatar, div, Button, Card, CardHeader } from "@mui/material"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { isEmpty } from "lodash"
import moment from "moment-timezone"
import Link from "next/link"
import React from "react"
import DeleteStudent from "./_delete"

export default function MyDashboardPage() {
  const [page, setPage] = React.useState(0)
  const pagesize = 10
  const [contact, setContact] = React.useState<any>(null)
  const [search, setSearch] = React.useState("")
  const currentZone = moment.tz.guess()
  const { students: data, loading }: any = useAppSelector(
    (state) => state.admin
  )
  const [filteredStudents, setFilteredStudents] = React.useState(data)
  const count = filteredStudents?.length
  const totalPageNumbers = Math.ceil(count / pagesize)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getStudents())
  }, [dispatch])

  React.useEffect(() => {
    const filterProperties = () => {
      let filtered = data
      if (search !== "") {
        filtered = filtered?.filter((property: any) => {
          return Object.values(property)
            .join("")
            .toLowerCase()
            .includes(search.toLowerCase())
        })
      }
      setContact(null)
      setFilteredStudents(filtered)
    }
    filterProperties()
  }, [data, search])

  const handlePageNavigation = (direction: string) => {
    if (direction === "next") {
      setPage(page < totalPageNumbers - 1 ? page + 1 : page)
    } else {
      setPage(page > 0 ? page - 1 : 0)
    }
  }
  const handleSearch = (e: any) => setSearch(e.target.value)

  const getUTCTime = (localTime: string, timezone: string) => {
    const localMoment = moment.tz(localTime, "HH:mm:ss", timezone)
    return localMoment.utc().format("HH:mm:ss") // Format as HH:mm:ss string
  }

  const getLocaltime = (time: string, fromTimezone: string) => {
    // Assume today's date if only time is provided
    const now = moment().tz(fromTimezone)
    const todayDate = now.format("YYYY-MM-DD")
    const dateTimeString = `${todayDate}T${time}`

    // Convert to moment object and then to the target timezone
    const localTime = moment
      .tz(dateTimeString, fromTimezone)
      .tz(currentZone)
      .format("HH:mm:ss")
    return localTime
  }

  const getTimezoneShortName = () => {
    try {
      const now = moment.tz(currentZone)
      const abbreviation = now.zoneAbbr() // Get the timezone abbreviation
      return abbreviation // Return the full name or abbreviation if not found
    } catch (error) {
      console.log("error", error)
      return null
    }
  }
  const getCountryFromTimezone = (timezone: string) => {
    return timezoneToCountry[timezone] || "Unknown"
  }

  return (
    <div className="w-full flex flex-col gap-8 bg-[#1D1F24]">
      <div className="w-full md:w-[400px]">
        <Input
          id="search"
          name="search"
          value={search}
          placeholder="Search for students"
          onChange={handleSearch}
          className="border-[#E5E9EB]/20"
        />
      </div>
      <div className="w-full px-6 bg-[#1D1F24]">
        <h4 className="w-full flex gap-2 font-bold font-inter text-lg text-secondary">
          All Students{" "}
          <span className="w-[25px] h-[25px] flex justify-center items-center p-[2px] mt-1 rounded-md border border-solid border-[#E5E9EB]/20 font-normal font-inter text-xs/[18px] ">
            {count ? count : 0}
          </span>
        </h4>
      </div>
      <div className="w-full bg-[#1D1F24] flex flex-col p-2 lg:p-[12px_0_48px_0] rounded-xl border border-solid border-[#E5E9EB]/20 shadow-[0px_1px_2px_0px_rgba(16, 24, 40, 0.05)] relative">
        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-8 xl:gap-12 xxl:gap-32 p-4">
          <Card className="w-full shadow-none border-[#E5E9EB]/20 bg-transparent px-4 flex flex-col gap-10">
            <div className="w-full max-w-[640px]">
              {loading ? (
                <DataLoader />
              ) : data === null ? (
                <NoData />
              ) : (
                <>
                  <CardHeader className="py-3 px-6 m-0">
                    <h4 className="w-full font-medium font-inter text-sm text-secondary">
                      Student Name
                    </h4>
                  </CardHeader>
                  {isEmpty(filteredStudents) ? (
                    <NoData message="No student information available" />
                  ) : (
                    <div className="w-full grid grid-cols-1 gap-2">
                      {filteredStudents
                        ?.slice(page * pagesize, page * pagesize + pagesize)
                        .map((student: any) => {
                          return (
                            <div
                              key={student.id}
                              className={`${
                                contact?.id === student.id
                                  ? "bg-primary/5 border-primary/80"
                                  : "bg-transparent"
                              } flex items-center space-x-4 rounded border border-[#E5E9EB]/10 p-4`}
                            >
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={student.photo}
                                  alt="Student photo"
                                />
                                <AvatarFallback className="bg-[#F2F4F7] text-[#667085] font-medium font-inter text-sm">
                                  {getInitials(student.name.trim())}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <p
                                  className={
                                    contact?.id === student.id
                                      ? "text-white font-medium font-inter text-sm capitalize"
                                      : "text-secondary font-normal font-inter text-sm capitalize"
                                  }
                                >
                                  {`${student.name} - (${student.username})`}
                                </p>
                                <p
                                  className={
                                    contact?.id === student.id
                                      ? "text-white font-normal font-inter text-sm capitalize"
                                      : "text-secondary font-normal font-inter text-sm capitalize"
                                  }
                                >
                                  {`${student?.class?.price?.school?.name} (${student?.class?.price?.school?.age_range} yrs)`}
                                </p>
                              </div>
                              <Button
                                onClick={() => setContact(student)}
                                className={
                                  contact?.id === student.id
                                    ? "w-[100px] mt-2 mr-1 bg-primary h-[40px] flex justify-center items-center py-[2px] px-[6px] border border-solid border-primary hover:text-white text-black font-inter font-bold text-xs/[18px] cursor-pointer rounded-full"
                                    : "w-[100px] bg-transparent h-[40px] flex justify-center items-center py-[2px] px-[6px] border border-solid border-primary text-primary font-inter font-bold text-xs/[18px] cursor-pointer rounded-full hover:bg-primary/10"
                                }
                              >
                                View class
                              </Button>
                            </div>
                          )
                        })}
                    </div>
                  )}
                  <div className="w-full flex flex-col justify-center items-center py-[20px]] mt-8 md:mt-6 xl:mt-8">
                    <div className="flex justify-end items-center gap-4">
                      <Button
                        type="button"
                        className="w-[100px] h-[36px] py-4 px-[19px] normal-case font-bold font-inter text-[14px]/[20.3px] text-black bg-white hover:bg-white/90 rounded-lg border border-solid border-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D] disabled:cursor-not-allowed"
                        onClick={() => handlePageNavigation("previous")}
                        disabled={page === 0 || filteredStudents.length === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        className="rounded-lg h-[36px] py-4 px-[19px]"
                        onClick={() => handlePageNavigation("next")}
                        disabled={page + 1 === totalPageNumbers || count === 0}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
          {contact && (
            <div className="w-full flex flex-col gap-4">
              <div className="w-full bg-[#1D1F24]">
                <div className="w-full h-[188px] p-6 flex flex-col flex-start gap-2 bg-[#1D1F24] rounded-xl">
                  <h4 className="w-full flex text-white font-bold font-inter text-lg m-0 p-0">
                    Parent information
                  </h4>
                  <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                    Full name:{" "}
                    <span className="text-white font-normal font-inter text-sm">
                      {contact?.parent?.name}
                    </span>
                  </p>
                  <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                    Mobile no:{" "}
                    <span className="text-white font-normal font-inter text-sm">
                      {contact?.parent?.phone}
                    </span>
                  </p>
                  <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                    Email address:{" "}
                    <span className="text-white font-normal font-inter text-sm">
                      {contact?.parent?.email}
                    </span>
                  </p>
                  <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                    Country:{" "}
                    <span className="text-white font-normal font-inter text-sm">
                      {getCountryFromTimezone(
                        contact?.timezone
                          ? contact?.timezone
                          : contact?.class.timezone
                      )}
                    </span>
                  </p>
                  <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                    Time zone:{" "}
                    <span className="text-white font-normal font-inter text-sm">
                      {`${
                        contact?.timezone
                          ? contact?.timezone
                          : contact?.class.timezone
                      } (GMT ${moment
                        .utc()
                        ?.tz(
                          contact?.timezone
                            ? contact?.timezone
                            : contact?.class.timezone
                        )
                        ?.format("Z")})`}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 bg-[#1D1F24] p-6 rounded-xl min-h-[123px]">
                <h4 className="w-full flex text-white font-medium font-inter text-lg m-0 p-0">
                  Class Schedule
                </h4>
                {!isEmpty(contact?.class?.schedules) ? (
                  contact?.class?.schedules.map((clx: any, index: number) => {
                    const utctime = convert24To12(
                      getUTCTime(clx.time, contact?.class?.timezone)
                    )
                    const localtime = convert24To12(
                      getLocaltime(clx.time, contact?.class?.timezone)
                    )
                    return (
                      <div
                        key={index}
                        className="w-full h-[210px] py-2 flex flex-col flex-start gap-2 bg-[#1D1F24] rounded-xl"
                      >
                        <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px] capitalize">
                          Day:{" "}
                          <span className="text-white font-normal font-inter text-sm">
                            {clx.day}
                          </span>
                        </p>
                        <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                          Date:{" "}
                          <span className="text-white font-normal font-inter text-sm">
                            {clx.date}
                          </span>
                        </p>
                        <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                          Meeting time:{" "}
                          <span className="text-white font-normal font-inter text-sm">
                            {convert24To12(clx.time)}
                          </span>
                        </p>
                        <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                          UTC time equivalent:{" "}
                          <span className="text-white font-normal font-inter text-sm">
                            {utctime}
                          </span>
                        </p>
                        <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                          Local time equivalent ({getTimezoneShortName()}):{" "}
                          <span className="text-white font-normal font-inter text-sm">
                            {localtime}
                          </span>
                        </p>
                        <p className="w-full flex p-0 m-0 taxt-white gap-1 font-bold font-inter text-[16px]/[20px]">
                          Class duration
                          <span className="text-white font-normal font-inter text-sm">
                            {contact?.class?.price?.duration}mins
                          </span>
                        </p>

                        <div className="w-full flex justify-end items-center">
                          <Link
                            href={`${clx.zoom.start_url}`}
                            target="_blank"
                            className="w-fit h-[36px] py-4 px-[22px] normal-case font-bold font-inter text-[14px]/[20.3px] text-black bg-primary hover:bg-primary/90 hover:scale-[1.008] transition duration-300 ease-in-out rounded-lg flex justify-center items-center"
                          >
                            Join Class
                          </Link>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="w-full flex flex-col justify-center items-center">
                    <NoData message="No class schedule available" />
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col gap-1 bg-[#1D1F24] pt-6 pb-0 px-6 rounded-xl">
                <h4 className="w-full flex text-error font-bold font-inter text-lg m-0 p-0">
                  Danger Zone
                </h4>
                <div className="w-full flex justify-end items-center">
                  <DeleteStudent id={contact.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
