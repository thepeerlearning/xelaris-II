"use client"

import { Button } from "@/components/ui/button"
import {
  ErrorMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addChild, updateUserData } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const personalInfoSchema = z.object({
  childFullName: z
    .string({ required_error: "Please enter your child's full name" })
    .min(2, {
      message: "Please enter your child's full name (at least 2 characters)",
    })
    .max(50, {
      message: "Name is too long (maximum 50 characters)",
    })
    .refine((name) => /^[a-zA-Z\s'-]+$/.test(name), {
      message:
        "Name should only contain letters, spaces, hyphens, and apostrophes",
    }),
  password: z
    .string({ required_error: "Please enter a password" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[^A-Za-z0-9]/.test(password), {
      message: "Password must contain at least one special character",
    }),
})
// Define the type from the schema
type PersonalInfoValues = z.infer<typeof personalInfoSchema>

interface PersonalInfoStepProps {
  nextStep: () => void
}

export function PersonalInfoStep({ nextStep }: PersonalInfoStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { userData }: any = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  // Initialize the form with React Hook Form and Zod validation
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      childFullName: userData?.child_full_name ?? "",
      password: userData?.password ?? "",
    },
    mode: "onBlur", // Validate on blur for better user experience
  })

  const { formState } = form
  const { isValid } = formState

  // Handle form submission
  function onSubmit(values: PersonalInfoValues) {
    const { password, childFullName } = values
    const inputData = {
      child_full_name: childFullName,
      username: childFullName.split(" ")?.[0]?.trim(),
      password: password?.trim(),
    }

    setIsSubmitting(true)
    dispatch(addChild({ inputData }))
      .unwrap()
      .then(() => {
        dispatch(updateUserData({ data: inputData }))
        setIsSubmitting(false)
        nextStep()
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="w-full h-full space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full xl:w-[420px] grid grid-cols-1 gap-[10px]"
        >
          <FormField
            control={form.control}
            name="childFullName"
            render={({ field, fieldState }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor="childFullName">Child Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id="childFullName"
                      placeholder="Jane Doe"
                      className={cn(
                        fieldState.error &&
                          "border-[#E23353] focus-visible:ring-[#E23353]"
                      )}
                      {...field}
                    />
                  </FormControl>

                  {fieldState.error && (
                    <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                  )}
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={cn(
                      fieldState.error &&
                        "border-[#E23353] focus-visible:ring-[#E23353]"
                    )}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full h-[46px] py-[9px] px-[13px] flex gap-1 font-inter font-normal text-[17px]/[24px] text-[#FFFAF3] tracking-normal mt-8"
          >
            {isSubmitting ? "Processing..." : "Continue"}{" "}
            {!isSubmitting && <ArrowRight />}
          </Button>
        </form>
      </Form>
    </div>
  )
}
