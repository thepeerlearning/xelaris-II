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
import { getSchools, updatePrice } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { isEmpty } from "lodash"
import { Edit } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Controller,
  useForm,
  type ControllerFieldState,
  type ControllerRenderProps,
} from "react-hook-form"
import { z } from "zod"

// --- schema: all strings, with numeric validation ---
const validationSchema = z.object({
  oldPrice: z
    .string()
    .min(1, "Old price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
  newPrice: z
    .string()
    .min(1, "New price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(/^\d+$/, "Duration must be a whole number"),
  classPerWeek: z
    .string()
    .min(1, "Class number is required")
    .regex(/^\d+$/, "Classes per week must be a whole number"),
})

type FormValues = z.infer<typeof validationSchema>

// --- helpers ---
const sanitizeAmount = (s: string) => {
  const cleaned = s.replace(/[^0-9.]/g, "")
  const parts = cleaned.split(".")
  return parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned
}

// Keep raw numeric string while typing; format on blur when not focused
interface CurrencyInputProps {
  field: ControllerRenderProps<FormValues, "oldPrice" | "newPrice">
  fieldState: ControllerFieldState
  placeholder?: string
  disabled?: boolean
}
const CurrencyInput = ({
  field,
  fieldState,
  placeholder,
  disabled,
}: CurrencyInputProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toCurrency = (v: string | number | undefined): string => {
    const n = Number.parseFloat(String(v ?? ""))
    return Number.isFinite(n)
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(n)
      : ""
  }

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        $
      </span>
      <Input
        type="text"
        disabled={disabled}
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

export default function UpdateSchoolPrice({ row, rowPrice }: any) {
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
    mode: "onBlur",
  })

  // prefill from rowPrice
  useEffect(() => {
    form.setValue("oldPrice", sanitizeAmount(rowPrice?.amount ?? ""))
    form.setValue("duration", String(rowPrice?.duration ?? ""))
    form.setValue("classPerWeek", String(rowPrice?.idx ?? "1"))
  }, [form, rowPrice, row])

  const priceIdOrOld = form.watch("oldPrice")
  console.log("rowPrice", rowPrice)
  const onSubmit = (data: FormValues) => {
    const inputData = {
      id: rowPrice.id,
      default_currency: "USD",
      idx: Number(data.classPerWeek),
      amount: sanitizeAmount(data.newPrice),
      duration: data.duration,
      school_id: row?.id,
    }

    setLoading(true)
    dispatch(updatePrice({ inputData }))
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
        <Button variant="ghost" size="icon">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col gap-5">
        <DialogTitle className="text-center">
          Update {row?.name} Price
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            {/* Old price (read-only) */}
            <Controller
              control={form.control}
              name="oldPrice"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-white">Old price</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      field={field}
                      fieldState={fieldState}
                      placeholder="0.00"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isEmpty(priceIdOrOld) ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="classPerWeek"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Number of class per week
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            inputMode="numeric"
                            type="number"
                            min={1}
                            step={1}
                            className={cn(fieldState.error && "border-red-500")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="newPrice"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-white">New price</FormLabel>
                        <FormControl>
                          <CurrencyInput
                            field={field}
                            fieldState={fieldState}
                            placeholder="e.g., 10.00"
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
                      <FormLabel className="text-white">
                        New duration (minutes)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          type="number"
                          min={1}
                          step={1}
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
