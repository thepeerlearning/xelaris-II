"use client"

import DataLoader from "@/components/lottie/loader"
import NoData from "@/components/svgs/no-data"
import { getAdminReschedules } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { isEmpty } from "lodash"
import moment from "moment-timezone"
import React from "react"
import RespondToReschedule from "./_response" // Assuming this path is correct
import { TableContent } from "@/components/Table"

// Define types for columns and rows for better type safety
interface Column {
  id: string
  label: string
  align?: "left" | "center" | "right" | "justify"
  minWidth?: number
}

interface RowData {
  sn: number
  title: string
  email: string
  childname: string
  date: React.ReactNode
  status: React.ReactNode
  action: React.ReactNode
}

const columns: Column[] = [
  {
    id: "sn",
    label: " ",
    align: "left",
    minWidth: 20,
  },
  {
    id: "title",
    label: "Parent Name",
    minWidth: 500,
    align: "left",
  },
  {
    id: "email",
    label: "Parent Email",
    minWidth: 500,
    align: "left",
  },
  {
    id: "childname",
    label: "Child Name",
    minWidth: 100,
    align: "left",
  },
  {
    id: "date",
    label: "Requested On",
    minWidth: 100,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
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

// No need for createData function if we directly map to the row structure
// function createData(...) { ... }

export default function BillingHistory() {
  const { schedules: data, loading }: any = useAppSelector(
    (state) => state.admin
  )
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getAdminReschedules())
  }, [dispatch])

  const rows: RowData[] =
    data?.length !== 0
      ? data?.map((row: any, i: number) => ({
          sn: i + 1,
          title: row.parent_name,
          email: row.parent_email,
          childname: row.child_name,
          date: moment(row.requested_date).format("llll"),
          status:
            row.status.toLowerCase() === "pending" ? (
              <div className="flex h-[30px] w-[80px] items-center justify-center gap-1 rounded-full border border-solid border-primary/10 bg-primary/10 px-[6px] py-[2px] font-inter text-xs/[18px] font-medium capitalize text-primary">
                {row.status}
              </div>
            ) : (
              <div className="flex h-[30px] w-[80px] items-center justify-center gap-1 rounded-full border border-solid border-[#ABEFC6] bg-[#ECFDF3] px-[6px] py-[2px] font-inter text-xs/[18px] font-medium capitalize text-[#067647]">
                {row.status}
              </div>
            ),
          action: <RespondToReschedule row={row} />,
        }))
      : []

  return (
    <div className="flex w-full max-w-[1022px] flex-col gap-2">
      {loading ? (
        <DataLoader />
      ) : isEmpty(data) ? (
        <NoData message="No reschedule request available" />
      ) : (
        <div className="rounded-md border border-solid border-[#EAECF0] bg-white">
          <TableContent
            columns={columns}
            rows={rows}
            sliced={false}
            page={0}
            pagesize={0}
            loading={loading}
          />
        </div>
      )}
    </div>
  )
}
