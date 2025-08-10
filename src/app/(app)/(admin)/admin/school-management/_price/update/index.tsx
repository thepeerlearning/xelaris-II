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
import { addSchool, getSchools } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { isEmpty } from "lodash"
import { Edit } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const validationSchema = z.object({
  oldPrice: z.string().min(1, "Old price is required"),
  newPrice: z.string().min(1, "New price is required"),
  duration: z.string().min(1, "Duration is required"),
  classPerWeek: z.string().min(1, "Class number is required"),
})

type FormValues = z.infer<typeof validationSchema>

export default function AddSchool({ row }: any) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      oldPrice: "",
      newPrice: "",
      duration: "",
      classPerWeek: "1",
    },
  })

  const price = form.watch("oldPrice")

  useEffect(() => {
    const selectPrice = row?.prices?.find((item: any) => item.id === price)
    form.setValue("newPrice", selectPrice?.amount)
    form.setValue("duration", selectPrice?.duration)
    form.setValue("classPerWeek", selectPrice?.idx)
  }, [form, price, row])

  const onSubmit = (data: FormValues) => {
    const inputData = {
      id: price,
      default_currency: "USD",
      idx: Number(data.classPerWeek),
      amount: data.newPrice,
      duration: data.duration,
      school_id: row?.id,
    }

    setLoading(true)
    dispatch(addSchool({ inputData }))
      .unwrap()
      .then(() => {
        setLoading(false)
        setOpen(false)
        dispatch(getSchools())
        form.reset()
      })
      .catch(() => setLoading(false))
  }

  const handleClose = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[200px] h-[45px] py-[12px] gap-2 normal-case font-bold font-inter text-[14px]/[24px] md:text-[16px]/[20px] text-secondary bg-white hover:bg-white hover:scale-[1.008] transition duration-300 ease-in-out justify-start">
          <Edit /> Update school price
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col gap-5">
        <DialogTitle>Update Price</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            {/* Title & Age */}
            <FormField
              control={form.control}
              name="oldPrice"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Old price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(fieldState.error && "border-red-500")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isEmpty(price) ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="classPerWeek"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Number of class per week</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="newPrice"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>New price</FormLabel>
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
                </div>
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>New duration (Time in minutes)</FormLabel>
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
              </>
            ) : null}

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
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
