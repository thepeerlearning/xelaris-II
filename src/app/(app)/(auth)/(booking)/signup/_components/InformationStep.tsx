"use client"

import Form from "@/components/form/Form"
import FormField from "@/components/form/FormField"
import { Button } from "@/components/ui/button"
import { signup, updateUserData } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const schema = z.object({
  parentName: z.string().min(1, "Parent name is required"),
  childName: z.string().min(1, "Child name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type InformationFormData = z.infer<typeof schema>

interface InformationStepProps {
  formData: InformationFormData
  updateFormData: (data: InformationFormData) => void
  onNext: () => void
}

export function InformationStep({
  // formData,
  updateFormData,
  onNext,
}: InformationStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { userData }: any = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  const form = useForm<InformationFormData>({
    resolver: zodResolver(schema),
    // defaultValues: formData,
    defaultValues: {
      parentName: userData?.parent_full_name ?? "",
      childName: userData?.child_full_name ?? "",
      email: userData?.email ?? "",
      password: userData?.password ?? "",
      phone: userData?.phone ?? "",
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    updateFormData(data)
    const inputData = {
      child_full_name: data?.childName,
      parent_full_name: data?.parentName,
      email: data?.email?.trim(),
      username: data?.childName.split(" ")?.[0]?.trim(),
      password: data?.password?.trim(),
      phone: data?.phone,
    }
    setIsSubmitting(true)
    dispatch(signup({ inputData }))
      .unwrap()
      .then(() => {
        dispatch(updateUserData({ data: inputData }))
        setIsSubmitting(false)
        onNext()
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="parentName"
          label="Parent full name"
          placeholder="Alexa Plex"
          labelColor="text-black"
        />

        <FormField
          control={form.control}
          name="childName"
          label="Child full name"
          placeholder="Ryan Plex"
          labelColor="text-black"
        />

        <FormField
          control={form.control}
          name="email"
          label="Email address"
          type="email"
          placeholder="alexaplex@gmail.co"
          labelColor="text-black"
        />

        <FormField
          control={form.control}
          fieldType="phone"
          name="phone"
          label="Phone Number"
          defaultCountry="US"
          placeholder="+1 (415) 642-5372"
          labelColor="text-black"
        />

        <FormField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••••••"
          labelColor="text-black"
        />

        <div className="text-sm text-background">
          By clicking &apos;Continue&apos;, you agree to Xelaris&apos;s{" "}
          <Link href="#" className=" hover:underline font-semibold">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="#" className="hover:underline font-semibold">
            Terms Of Service
          </Link>
          .
        </div>

        <Button type="submit" className="w-full">
          {isSubmitting ? "Processing..." : "Continue"}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-background hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}
