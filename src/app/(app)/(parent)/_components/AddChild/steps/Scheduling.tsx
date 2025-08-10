"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getSchools, scheduleClass, clearUserData } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCookie } from "cookies-next"
import {
  ArrowLeft,
  ArrowRight,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react"
import moment from "moment-timezone"
import { useEffect, useState } from "react"
import {
  useForm,
  type ControllerRenderProps,
  type ControllerFieldState,
} from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"

// Define the validation schema using Zod
const timeSchedulingSchema = z
  .object({
    timezone: z.string().nonempty("Please select your timezone"),
    age: z.string().nonempty("Please select your child's age group"),
    day: z.string().nonempty("Please select a day for your class"),
    time: z.string().nonempty("Please select a time for your class"),
    isMulti: z.boolean().default(false),
    dayTwo: z.string().optional(),
    timeTwo: z.string().optional(),
    price: z.string().nonempty("Please select a class duration"),
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
        data.day === data.dayTwo &&
        data.time === data.timeTwo
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

// Define the type from the schema
type TimeSchedulingValues = z.infer<typeof timeSchedulingSchema>

interface TimeSchedulingStepProps {
  nextStep: () => void
  prevStep: () => void
}

export function ClassSchedulingStep({
  nextStep,
  prevStep,
}: TimeSchedulingStepProps) {
  const timezone = moment.tz.names()
  const currentZone = moment.tz.guess()
  const { schools }: any = useAppSelector((state) => state.admin)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [prices, setPrices] = useState<any[]>([])
  const dispatch = useAppDispatch()
  const childId = getCookie("c_id")

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ]

  useEffect(() => {
    const fetchSchools = async () => {
      await dispatch(getSchools())
    }
    fetchSchools()
  }, [dispatch])

  // Initialize the form with React Hook Form and Zod validation
  const form = useForm<TimeSchedulingValues>({
    resolver: zodResolver(timeSchedulingSchema),
    defaultValues: {
      timezone: currentZone,
      isMulti: false,
      day: "",
      time: "",
      dayTwo: "",
      timeTwo: "",
      age: "",
      price: "",
    },
    mode: "onChange",
  })

  const { formState, setValue, watch } = form
  const { isValid } = formState
  const age = watch("age")
  const isMulti = watch("isMulti")
  const price = watch("price")

  useEffect(() => {
    const selectedAge = schools?.find((school: any) => school.age_range === age)
    setPrices(selectedAge?.prices || [])
  }, [schools, age])

  useEffect(() => {
    const selectedPrice: any = prices?.find((item: any) => item.id === price)
    if (selectedPrice) {
      const shouldBeMulti = selectedPrice?.idx > 1
      if (isMulti !== shouldBeMulti) {
        setValue("isMulti", shouldBeMulti)
      }
    }
  }, [prices, price, setValue, isMulti])

  // Handle form submission
  const onSubmit = (values: TimeSchedulingValues) => {
    const { day, time, dayTwo, timeTwo, timezone, price, isMulti } = values
    const inputData = {
      temp_id: childId,
      price_id: price,
      timestamps: isMulti
        ? [
            {
              day: day,
              time: time,
            },
            {
              day: dayTwo,
              time: timeTwo,
            },
          ]
        : [
            {
              day: day,
              time: time,
            },
          ],
      timezone: timezone,
    }

    setIsSubmitting(true)
    dispatch(scheduleClass({ inputData }))
      .unwrap()
      .then(() => {
        setIsSubmitting(false)
        dispatch(clearUserData())
        nextStep()
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  }

  // Define props interface for TimeInput
  interface TimeInputProps {
    field: ControllerRenderProps<TimeSchedulingValues, "time" | "timeTwo">
    fieldState: ControllerFieldState
    placeholder: string
  }

  // Custom time input with icon
  const TimeInput = ({ field, fieldState, placeholder }: TimeInputProps) => (
    <div className="relative">
      <Input
        type="time"
        className={cn(
          "pr-10 hide-time-icon", // Added custom class
          fieldState.error && "border-[#E23353] focus-visible:ring-[#E23353]"
        )}
        placeholder={placeholder}
        {...field}
      />
      <div className="absolute right-3 inset-y-0 flex flex-col justify-between py-[1.5px] pointer-events-none">
        <ChevronUpIcon className="h-6 w-6 text-[#404452]" />
        <ChevronDownIcon className="h-6 w-6 text-[#404452]" />
      </div>
    </div>
  )

  return (
    <div className="space-y-4 w-full xl:w-[420px]">
      <h3 className="text-lg font-medium">Class Scheduling</h3>
      <p className="text-sm text-gray-500">
        Choose your preferred class times and duration
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="timezone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Select time zone</FormLabel>
                <div className="relative">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          fieldState.error &&
                            "border-[#E23353] focus-visible:ring-[#E23353]"
                        )}
                      >
                        <SelectValue placeholder="Select your timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timezone.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Select child age</FormLabel>
                <div className="relative">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          fieldState.error &&
                            "border-[#E23353] focus-visible:ring-[#E23353]"
                        )}
                      >
                        <SelectValue placeholder="Select child's age group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {schools?.map((school: any) => (
                        <SelectItem key={school.id} value={school.age_range}>
                          {`${school.name} (Ages ${school.age_range})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {age && (
            <FormField
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Class Duration</FormLabel>
                  <div className="relative">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            fieldState.error &&
                              "border-[#E23353] focus-visible:ring-[#E23353]"
                          )}
                        >
                          <SelectValue placeholder="Select class duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {prices?.map((price: any) => (
                          <SelectItem key={price.id} value={price.id}>
                            {price.idx <= 1
                              ? `${price.duration} mins ($${price.amount}) - ${price.idx} class per week`
                              : `${price.duration} mins ($${price.amount}) - ${price.idx} classes per week`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="day"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>What day are you available for class?</FormLabel>
                <div className="relative">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          fieldState.error &&
                            "border-[#E23353] focus-visible:ring-[#E23353]"
                        )}
                      >
                        <SelectValue placeholder="Select day for class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {days?.map((day) => (
                        <SelectItem key={day} value={day.toLowerCase()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
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
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      What day are you available for the second class?
                    </FormLabel>
                    <div className="relative">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              fieldState.error &&
                                "border-[#E23353] focus-visible:ring-[#E23353]"
                            )}
                          >
                            <SelectValue placeholder="Select day for second class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {days?.map((day) => (
                            <SelectItem key={day} value={day.toLowerCase()}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
          <div className="w-full flex justify-center items-center">
            <div className="w-full h-12 lg:w-[414px] flex gap-4 pt-4">
              <Button
                type="button"
                onClick={prevStep}
                className="w-36 h-12 px-3.5 py-2.5 flex items-center justify-center gap-1 font-normal text-base leading-6 text-white bg-secondary hover:bg-secondary/80 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-64 h-12 px-3.5 py-2.5 flex items-center justify-center gap-1 font-normal text-base leading-6 text-white bg-primary hover:bg-primary/90 cursor-pointer"
              >
                {isSubmitting ? "Processing..." : "Continue"}{" "}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
