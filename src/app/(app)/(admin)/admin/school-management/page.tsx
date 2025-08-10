"use client"
import { TableContent } from "@/components/Table"
import DataLoader from "@/components/lottie/loader"
import NoData from "@/components/svgs/no-data"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { getSchools } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { isEmpty } from "lodash"
import { Ellipsis } from "lucide-react"
import React from "react"
import AddSchoolPrice from "./_price/add"
import DeleteSchoolPrice from "./_price/delete"
import UpdateSchoolPrice from "./_price/update"
import AddSchool from "./_school/add"
import DeleteSchool from "./_school/delete"
import UpdateSchool from "./_school/update"
import Callout from "@/components/Callout"
function createData(
  sn: number,
  title: string,
  age: string,
  duration: string,
  classPerWeek: string,
  amount: React.ReactNode,
  action: React.ReactNode
) {
  return {
    sn,
    title,
    age,
    duration,
    classPerWeek,
    amount,
    action,
  }
}

const columns = [
  {
    id: "sn",
    label: " ",
    align: "left",
    minWidth: 20,
  },
  {
    id: "title",
    label: "Name",
    minWidth: 500,
    align: "left",
  },
  {
    id: "age",
    label: "Age range",
    minWidth: 100,
    align: "left",
  },
  {
    id: "duration",
    label: "Duration (mins)",
    minWidth: 100,
    align: "left",
  },
  {
    id: "classPerWeek",
    label: "No. of class per week",
    minWidth: 100,
    align: "left",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "left",
  },
  {
    id: "action",
    label: " ",
    minWidth: 100,
    align: "right",
  },
]
export default function BillingHistory() {
  const { schools: data, loading }: any = useAppSelector((state) => state.admin)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getSchools())
  }, [dispatch])

  const rows =
    data?.length !== 0
      ? data?.map((row: any, i: number) => {
          return createData(
            i + 1,
            row.name,
            row.age_range,
            row.prices?.map((price: any, i: number) => {
              return (
                <div
                  key={`duration number: ${i}`}
                  className="font-normal font-inter text-sm text-secondary text-nowrap overflow-hidden text-ellipsis"
                >
                  {price.duration}
                </div>
              )
            }),
            row.prices?.map((price: any, i: number) => {
              return (
                <div
                  key={`duration number: ${i}`}
                  className="font-normal font-inter text-sm text-secondary text-nowrap overflow-hidden text-ellipsis"
                >
                  {price.idx}
                </div>
              )
            }),
            row.prices?.map((price: any, i: number) => {
              return (
                <div className="flex gap-2" key={price.id}>
                  <span
                    key={`price number: ${i}`}
                    className="font-normal font-inter text-sm text-secondary text-nowrap overflow-hidden text-ellipsis"
                  >
                    $
                    {Number(price.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <DeleteSchoolPrice id={price.id} />
                </div>
              )
            }),
            <Callout
              icon={<Ellipsis />}
              FirstActionButton={<AddSchoolPrice id={row.id} />}
              SecondActionButton={<UpdateSchoolPrice row={row} />}
              ThirdActionButton={<UpdateSchool row={row} />}
              FourthActionButton={<DeleteSchool id={row.id} />}
            />
          )
        })
      : []
  return (
    <div className="w-full flex flex-col gap-8">
      <DropdownMenuSeparator className="border-[#F0F2F5]" />
      <div className="w-full max-w-[1022px] flex flex-col gap-2">
        <div className="w-full flex justify-end items-center">
          <AddSchool />
        </div>

        {loading ? (
          <DataLoader />
        ) : isEmpty(data) ? (
          <NoData />
        ) : (
          <TableContent columns={columns} rows={rows} />
        )}
      </div>
    </div>
  )
}
