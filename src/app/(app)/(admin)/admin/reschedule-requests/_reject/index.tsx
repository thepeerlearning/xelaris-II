"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { getSchools, updateSchool } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const validationSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
})

type FormValues = z.infer<typeof validationSchema>

export default function RejectReschedule({ row }: any) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      reason: "",
    },
  })

  const onSubmit = (data: FormValues) => {
    const inputData = {
      id: row.id,
      name: data.reason,
    }
    setLoading(true)
    dispatch(updateSchool({ inputData }))
      .unwrap()
      .then(() => {
        setLoading(false)
        setOpen(false)
        dispatch(getSchools())
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleClose = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#D3D3D6] border border-solid border-[#D3D3D6] rounded-[4px] px-6 h-[48px] w-[200px] flex justify-center items-center gap-2 text-sm/[24px] font-medium font-inter text-[#242426]">
          Reject & send message
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col gap-5">
        <DialogTitle> Reject & send message</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full px-2 flex flex-col gap-8"
          >
            {" "}
            <FormField
              control={form.control}
              name="reason"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Reason for the rejection</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., ABC School"
                      className={cn(fieldState.error && "border-red-500")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-4" />
            {/* Submit / Cancel */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="w-1/2"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-1/2" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
