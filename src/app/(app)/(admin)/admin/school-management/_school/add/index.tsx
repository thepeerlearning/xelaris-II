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
import { PlusIcon, X } from "lucide-react"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const validationSchema = z.object({
  title: z.string().min(1, "School name is required"),
  age: z.string().min(1, "Age range is required"),
  prices: z.array(
    z.object({
      price: z.string().min(1, "Price is required"),
      duration: z.string().min(1, "Duration is required"),
      classPerWeek: z.string().min(1, "Class number is required"),
    })
  ),
})

type FormValues = z.infer<typeof validationSchema>

export default function AddSchool() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      age: "",
      prices: [{ price: "", duration: "", classPerWeek: "1" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "prices",
  })

  const onSubmit = (data: FormValues) => {
    const newPrices = data.prices.map((item) => ({
      default_currency: "USD",
      amount: item.price,
      duration: item.duration,
      idx: Number(item.classPerWeek),
    }))

    const inputData = {
      name: data.title,
      age_range: data.age,
      prices: newPrices,
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
        <Button className="w-[180px]">Register new school</Button>
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col gap-5">
        <DialogTitle>Register new school</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            {/* Title & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>School name</FormLabel>
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
                name="age"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Age range</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., 11-14"
                        className={cn(fieldState.error && "border-red-500")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dynamic Price Fields */}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded-lg grid gap-4 relative"
              >
                {fields.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2"
                    onClick={() => remove(index)}
                    aria-label="Remove price option"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                )}

                <FormField
                  control={form.control}
                  name={`prices.${index}.classPerWeek`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of classes/week</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`prices.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="$150" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`prices.${index}.duration`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 45" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            {/* Add New Price Option */}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({ price: "", duration: "", classPerWeek: "1" })
                }
                className="hover:bg-transparent hover:border-primary cursor-pointer"
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Add Price Option
              </Button>
            </div>

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
