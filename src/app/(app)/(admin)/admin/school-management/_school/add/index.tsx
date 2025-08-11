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
import {
  useFieldArray,
  useForm,
  Controller,
  type ControllerFieldState,
  type ControllerRenderProps,
} from "react-hook-form"
import { z } from "zod"

// schema: keep strings, validate shape
const validationSchema = z.object({
  title: z.string().min(1, "School name is required"),
  age: z.string().min(1, "Age range is required"),
  prices: z.array(
    z.object({
      price: z
        .string()
        .min(1, "Price is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
      duration: z
        .string()
        .min(1, "Duration is required")
        .regex(/^\d+$/, "Must be a whole number"),
      classPerWeek: z
        .string()
        .min(1, "Class number is required")
        .regex(/^\d+$/, "Must be a whole number"),
    })
  ),
})

type FormValues = z.infer<typeof validationSchema>

// ---------- helpers ----------
const sanitizeAmount = (s: string) => {
  const cleaned = s.replace(/[^0-9.]/g, "")
  const parts = cleaned.split(".")
  return parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned
}

const toCurrency = (v: string | number | undefined) => {
  const n = Number.parseFloat(String(v ?? ""))
  return Number.isFinite(n)
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(n)
    : ""
}

// ---------- CurrencyInput ----------
interface CurrencyInputProps {
  field: ControllerRenderProps<FormValues, `prices.${number}.price`>
  fieldState: ControllerFieldState
  placeholder?: string
}
const CurrencyInput = ({
  field,
  fieldState,
  placeholder,
}: CurrencyInputProps) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        $
      </span>
      <Input
        type="text"
        className={cn("pl-6", fieldState.error && "border-red-500")}
        placeholder={placeholder}
        name={field.name}
        ref={field.ref}
        onFocus={() => setIsEditing(true)}
        onBlur={(e) => {
          setIsEditing(false)
          field.onChange(sanitizeAmount(e.target.value))
          field.onBlur()
        }}
        onChange={(e) => field.onChange(sanitizeAmount(e.target.value))}
        value={isEditing ? field.value ?? "" : toCurrency(field.value)}
        inputMode="decimal"
        aria-invalid={!!fieldState.error}
      />
    </div>
  )
}

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
    mode: "onBlur",
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "prices",
  })

  const onSubmit = (data: FormValues) => {
    const newPrices = data.prices.map((item) => ({
      default_currency: "USD",
      amount: sanitizeAmount(item.price), // string for backend
      duration: item.duration, // string
      idx: Number(item.classPerWeek), // numeric index
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
        <Button className="w-[180px] capitalize">Register new school</Button>
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
                    <FormLabel className="text-white">School name</FormLabel>
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
                    <FormLabel className="text-white">Age range</FormLabel>
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
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Number of classes/week
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          type="number"
                          min={1}
                          step={1}
                          placeholder="e.g., 3"
                          className={cn(fieldState.error && "border-red-500")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* UPDATED PRICE FIELD */}
                <Controller
                  control={form.control}
                  name={`prices.${index}.price`}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-white">Price</FormLabel>
                      <FormControl>
                        <CurrencyInput
                          field={field}
                          fieldState={fieldState}
                          placeholder="e.g., 150.00"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`prices.${index}.duration`}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Duration (minutes)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          type="number"
                          min={1}
                          step={1}
                          placeholder="e.g., 45"
                          className={cn(fieldState.error && "border-red-500")}
                        />
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
