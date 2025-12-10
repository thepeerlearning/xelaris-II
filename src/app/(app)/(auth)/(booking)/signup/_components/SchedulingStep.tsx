"use client"

import Form from "@/components/form/Form"
import FormField from "@/components/form/FormField"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { timezoneOptions } from "@/data"
import { classSchedule, clearUserData, getSchools } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCookie } from "cookies-next"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  useForm,
} from "react-hook-form"
import * as z from "zod"

const hhmm = /^(?:[01]\d|2[0-3]):[0-5]\d$/

const schema = z
  .object({
    timezone: z.string().min(1, "Timezone is required"),
    childAge: z.string().min(1, "Child age is required"),
    classDuration: z.string().min(1, "Class duration is required"),
    availableDay: z.string().min(1, "Available day is required"),
    availableTime: z.string().min(1, "Available time is required"),
    isMulti: z.boolean().default(false),
    dayTwo: z.string().optional(),
    amount: z.string().optional(),
    timeTwo: z
      .string()
      .optional()
      .refine((v) => !v || hhmm.test(v), {
        message: "Enter a valid time in HH:mm",
      }),
  })
  .refine(
    (data) => {
      // If isMulti is true, dayTwo and timeTwo are required
      if (data.isMulti) {
        return !!data.dayTwo && !!data.timeTwo
      }
      return true
    },
    {
      message: "Second day and time are required for multiple classes",
      path: ["dayTwo"],
    }
  )
  .refine(
    (data) => {
      // Check for duplicate day/time combinations
      if (
        data.isMulti &&
        data.availableDay === data.dayTwo &&
        data.availableTime === data.timeTwo
      ) {
        return false
      }
      return true
    },
    {
      message: "Day and time combinations must be different",
      path: ["timeTwo"],
    }
  )

type SchedulingFormData = z.infer<typeof schema>

interface SchedulingStepProps {
  // formData: SchedulingFormData
  updateFormData: (data: SchedulingFormData) => void
  onNext: () => void
  onBack: () => void
}
const days = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Sunday", value: "sunday" },
]
export function SchedulingStep({
  // formData,
  updateFormData,
  onNext,
  onBack,
}: SchedulingStepProps) {
  const { schools }: any = useAppSelector((state) => state.admin)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [prices, setPrices] = useState([])
  const dispatch = useAppDispatch()
  const childId = getCookie("c_id")
  const stepId = getCookie("stepId")

  const form = useForm<SchedulingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      timezone: "",
      childAge: "",
      classDuration: "",
      availableDay: "",
      availableTime: "",
      isMulti: false,
      amount: "",
      dayTwo: "",
      timeTwo: "",
    },
  })
  const { setValue, watch } = form

  const age = watch("childAge")
  const isMulti = watch("isMulti")
  const price = watch("classDuration")

  useEffect(() => {
    dispatch(getSchools())
  }, [dispatch])
  useEffect(() => {
    const selectedAge = schools?.find((school: any) => school.age_range === age)
    setPrices(selectedAge?.prices || [])
  }, [schools, age])

  useEffect(() => {
    const selectedPrice: any = prices?.find((item: any) => item.id === price)

    if (selectedPrice) {
      setValue("amount", selectedPrice?.amount)
      const shouldBeMulti = selectedPrice?.idx > 1
      if (isMulti !== shouldBeMulti) {
        setValue("isMulti", shouldBeMulti)
      }
    }
  }, [prices, price, setValue, isMulti])
  const toHHMM = (t?: string) => (t ? t.slice(0, 5) : "")
  const handleSubmit = form.handleSubmit((data) => {
    const {
      availableDay,
      availableTime,
      dayTwo,
      timeTwo,
      timezone,
      classDuration,
      isMulti,
    } = data
    const t1 = toHHMM(availableTime)
    const t2 = isMulti ? toHHMM(timeTwo) : undefined
    const inputData = {
      initiate_id: stepId,
      price_id: classDuration,
      child_id: childId,
      timestamps: isMulti
        ? [
            {
              day: availableDay,
              time: t1,
            },
            {
              day: dayTwo,
              time: t2,
            },
          ]
        : [
            {
              day: availableDay,
              time: t1,
            },
          ],
      timezone: timezone,
    }
    setIsSubmitting(true)
    dispatch(classSchedule({ inputData }))
      .unwrap()
      .then(() => {
        setIsSubmitting(false)
        dispatch(clearUserData())
        updateFormData(data)
        onNext()
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  })
  const childAgeOptions =
    schools?.map((school: any) => {
      return {
        value: school.age_range,
        label: `${school.name} (Ages ${school.age_range})`,
      }
    }) || []

  const classDurationOptions =
    prices?.map((price: any) => {
      return {
        value: price.id,
        label: `${
          price.idx <= 1
            ? `${price.duration} mins ($${price.amount}) - ${price.idx} class per week`
            : `${price.duration} mins ($${price.amount}) - ${price.idx} classes per week`
        }`,
      }
    }) || []

  const dayOptions =
    days?.map((day: any) => {
      return {
        value: day.value,
        label: day.label,
      }
    }) || []

  // Define props interface for TimeInput
  interface TimeInputProps {
    field: ControllerRenderProps<
      SchedulingFormData,
      "availableTime" | "timeTwo"
    >
    fieldState: ControllerFieldState
    placeholder: string
  }

  const TimeInput = ({ field, fieldState, placeholder }: TimeInputProps) => (
    <div className="relative">
      <Input
        type="time"
        step={60} // minutes only (no seconds)
        inputMode="numeric"
        pattern="[0-9:]*"
        className={cn(
          "pr-10 hide-time-icon",
          fieldState.error && "border-[#E23353] focus-visible:ring-[#E23353]"
        )}
        placeholder={placeholder}
        value={(field.value ?? "").slice(0, 5)} // keep HH:mm
        onChange={(e) => field.onChange(e.target.value.slice(0, 5))}
        onBlur={field.onBlur}
        name={field.name}
        ref={field.ref}
      />
      <div className="absolute right-3 inset-y-0 flex flex-col justify-between py-[1.5px] pointer-events-none">
        <ChevronUpIcon className="h-6 w-6 text-[#404452]" />
        <ChevronDownIcon className="h-6 w-6 text-[#404452]" />
      </div>
    </div>
  )

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="timezone"
          label="Time Zone"
          fieldType="select"
          options={timezoneOptions}
          placeholder="Select timezone"
          required
        />

        <FormField
          control={form.control}
          name="childAge"
          label="Select Child Age"
          fieldType="select"
          options={childAgeOptions}
          placeholder="Select age range"
          required
        />

        <FormField
          control={form.control}
          name="classDuration"
          label="Select Class Duration"
          fieldType="select"
          options={classDurationOptions}
          placeholder="Select duration"
          required
        />

        <FormField
          control={form.control}
          name="availableDay"
          label="What Day Are You Available For Class"
          fieldType="select"
          options={dayOptions}
          placeholder="Select day"
          required
        />
        <Controller
          control={form.control}
          name="availableTime"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>What time are you available for class?</FormLabel>
              <FormControl>
                <TimeInput
                  field={field}
                  fieldState={fieldState}
                  placeholder="Select time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isMulti && (
          <>
            <FormField
              control={form.control}
              name="dayTwo"
              label=" What day are you available for the second class?"
              fieldType="select"
              options={dayOptions}
              placeholder="Select day"
              required
            />
            <Controller
              control={form.control}
              name="timeTwo"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    What time are you available for the second class?
                  </FormLabel>
                  <FormControl>
                    <TimeInput
                      field={field}
                      fieldState={fieldState}
                      placeholder="Select time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="flex space-x-4 pt-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 py-3 rounded-full border-background text-background bg-transparent"
          >
            Back
          </Button>
          <Button type="submit" className="flex-1">
            {isSubmitting ? "Processing..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
