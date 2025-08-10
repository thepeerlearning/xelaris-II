"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deletePrice, getSchools } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import { Trash } from "lucide-react"
import React from "react"

export default function DeleteSchoolPrice({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useAppDispatch()

  function handleDelete() {
    setLoading(true)
    dispatch(deletePrice({ id }))
      .unwrap()
      .then(() => {
        setLoading(false)
        setOpen(false)
        dispatch(getSchools())
      })
      .catch(() => {
        setLoading(false)
      })
    return false
  }

  const handleClose = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash className="text-primary w-4 h-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col gap-5 justify-center items-center">
        <DialogTitle className="w-full font-inter font-normal text-[19px]/[28px] tracking-[0.2px] text-left text-secondary uppercase">
          Delete Price
        </DialogTitle>
        <div className="w-full px-3 flex flex-col justify-center items-center">
          <p className="font-normal font-inter text-secondary text-sm/[24px]">
            Are you sure you want to continue?
          </p>
          <p className="italic font-normal font-inter text-sm/[24px] text-primary py-2">
            This action is permanent and cannot be undone!
          </p>
        </div>
        <div className="w-full flex gap-2 items-center justify-center mt-4">
          <Button
            variant="ghost"
            className="w-1/2 py-[10px] px-[18px] h-[43px] bg-transparent hover:bg-transparent border border-primary"
            disabled={loading}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            className="w-1/2 py-[10px] px-[18px] h-[43px]"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
