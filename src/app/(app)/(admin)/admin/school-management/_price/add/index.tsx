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
import { addPrice, getSchools } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useState } from "react"
import {
  Controller,
  useForm,
  type ControllerFieldState,
  type ControllerRenderProps,
} from "react-hook-form"
import { z } from "zod"

// ---------------- Schema ----------------
const validationSchema = z.object({
  classPerWeek: z
    .string()
    .min(1, "Number of classes per week is required")
    .regex(/^\d+$/, "Must be a whole number"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(/^\d+$/, "Must be a whole number"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format (e.g., 10.00 or 10)"),
})
type FormValues = z.infer<typeof validationSchema> // all strings

type RawFormValues = z.input<typeof validationSchema> // what RHF stores pre-transform

// --------- Currency Input ----------
interface CurrencyInputProps {
  field: ControllerRenderProps<RawFormValues, "price">
  fieldState: ControllerFieldState
  placeholder?: string
}

const CurrencyInput = ({
  field,
  fieldState,
  placeholder,
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

  const sanitize = (s: string) => {
    const cleaned = s.replace(/[^0-9.]/g, "")
    const parts = cleaned.split(".")
    return parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(sanitize(e.target.value)) // keep raw numeric string
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false)
    field.onChange(sanitize(e.target.value))
    field.onBlur()
  }

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
        onBlur={handleBlur}
        onChange={handleChange}
        value={isEditing ? field.value ?? "" : toCurrency(field.value)}
        inputMode="decimal"
        aria-invalid={!!fieldState.error}
      />
    </div>
  )
}

// -------------- Component --------------
export default function AddSchool({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: { price: "", duration: "", classPerWeek: "1" },
    mode: "onBlur",
  })

  const sanitizeAmount = (s: string) => {
    const cleaned = s.replace(/[^0-9.]/g, "")
    const parts = cleaned.split(".")
    return parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned
  }

  const onSubmit = (data: FormValues) => {
    const inputData = {
      school_id: id,
      idx: data.classPerWeek, // stays string
      default_currency: "USD",
      amount: sanitizeAmount(data.price), // backend wants string
      duration: data.duration, // stays string
    }
    setLoading(true)
    dispatch(addPrice({ inputData }))
      .unwrap()
      .then(() => {
        setLoading(false)
        setOpen(false)
        dispatch(getSchools())
        form.reset()
      })
      .catch(() => setLoading(false))
  }
  // const onSubmit = (data: ParsedFormValues) => {
  //   const inputData = {
  //     school_id: id,
  //     // if your API expects string, stringify; otherwise send numbers directly
  //     idx: String(data.classPerWeek),
  //     default_currency: "USD",
  //     amount: data.price, // number is safer; stringify only if backend requires
  //     duration: String(data.duration),
  //   }

  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[200px] h-[45px] py-[12px] gap-2 font-bold font-inter text-[14px]/[24px] md:text-[16px]/[20px] bg-white text-black hover:scale-[1.008] transition duration-300 ease-in-out justify-start rounded-md capitalize">
          <Plus /> Add Price
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full flex flex-col gap-5">
        <DialogTitle className="w-full font-inter font-bold text-[19px]/[28px] tracking-[0.2px] text-left text-secondary uppercase">
          Add Price
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="classPerWeek"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Number of classes per week
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(fieldState.error && "border-red-500")}
                        inputMode="numeric"
                        type="number"
                        min={1}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="price"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-white">Price</FormLabel>
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

              <FormField
                control={form.control}
                name="duration"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Duration (minutes)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., 60"
                        className={cn(fieldState.error && "border-red-500")}
                        inputMode="numeric"
                        type="number"
                        min={1}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-4" />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-1/2 bg-transparent"
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
