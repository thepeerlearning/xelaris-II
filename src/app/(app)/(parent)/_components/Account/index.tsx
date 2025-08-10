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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader } from "@/components/ui/card"
import { countries } from "@/lib/data"
import { updateParentProfile, updateUserData } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, X } from "lucide-react"
import moment from "moment-timezone"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import { ExclamationMarkIcon } from "@/components/svgs"

const SUPPORTED_FORMAT = ["PNG", "JPEG", "JPG"].map((x) => "." + x).join(",")

const personalInfoSchema = z.object({
  parentFullName: z
    .string({ required_error: "Please enter your full name" })
    .min(2, {
      message: "Please enter your full name (at least 2 characters)",
    })
    .max(50, {
      message: "Name is too long (maximum 50 characters)",
    })
    .refine((name) => /^[a-zA-Z\s'-]+$/.test(name), {
      message:
        "Name should only contain letters, spaces, hyphens, and apostrophes",
    }),

  email: z.string({ required_error: "Please enter your email address" }).email({
    message: "Please enter a valid email address",
  }),

  country: z
    .string({
      required_error: "Please select your country code from the dropdown",
    })
    .min(1, { message: "Please select your country code from the dropdown" }),

  phoneNumber: z
    .string({ required_error: "Please enter your phone number" })
    .min(6, { message: "Phone number is too short (minimum 6 digits)" })
    .max(15, { message: "Phone number is too long (maximum 15 digits)" })
    .refine((phone) => /^[0-9\-$$$$\s]+$/.test(phone), {
      message:
        "Phone number can only contain digits, spaces, hyphens, and parentheses",
    }),

  timezone: z.string().optional(),
  img: z.any().optional(),
})

// Define the type from the schema
type PersonalInfoValues = z.infer<typeof personalInfoSchema>

export function PersonalInfo() {
  const dispatch = useAppDispatch()
  const { userData }: any = useAppSelector((state) => state.signup)
  const { profile }: any = useAppSelector((state) => state.parent)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editPhoto, setEditPhoto] = useState(false)
  const timezones = moment.tz.names()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Initialize the form with React Hook Form and Zod validation
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      parentFullName: userData?.parent_full_name ?? "",
      email: userData?.email ?? "",
      phoneNumber: userData?.phone ?? "",
      country: profile?.country ?? "",
      timezone: profile?.timezone ?? "",
    },
    mode: "onBlur", // Validate on blur for better user experience
  })

  const {
    formState,
    setValue,
    watch,
    register,
    reset,
    formState: { errors },
  } = form
  const { isValid } = formState
  const img = watch("img")

  const convert2Base64 = (file: File) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result?.toString() as string
        setPreviewUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (img && img?.length > 0) {
      convert2Base64(img[0])
    }
  }, [img])

  useEffect(() => {
    setValue("timezone", profile?.timezone)
    setValue("country", profile?.country)

    // Set the profile photo if available
    if (profile?.link) {
      setPreviewUrl(profile.link)
    }
  }, [profile, setValue])

  // Handle form submission
  function onSubmit(values: PersonalInfoValues) {
    const { country, timezone } = values

    const inputData = {
      image: img?.[0],
      country: country,
      timezone: timezone,
    }

    setIsSubmitting(true)
    dispatch(updateParentProfile({ inputData }))
      .unwrap()
      .then(() => {
        dispatch(updateUserData({ data: inputData }))
        setIsSubmitting(false)
        setEditPhoto(false)
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  }

  const cancelPhotoEdit = () => {
    // Reset the image field
    reset({ ...form.getValues(), img: undefined })
    setPreviewUrl(profile?.link || null)
    setEditPhoto(false)
  }

  return (
    <div className="w-full h-full space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full xl:w-[420px] grid grid-cols-1 gap-[10px]"
        >
          <FormField
            control={form.control}
            name="parentFullName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="parentFullName">Parent Full Name</FormLabel>
                <FormControl>
                  <Input
                    id="parentFullName"
                    placeholder="John Doe"
                    className={cn(
                      "bg-gray-100",
                      fieldState.error &&
                        "border-[#E23353] focus-visible:ring-[#E23353]"
                    )}
                    {...field}
                    disabled={true}
                  />
                </FormControl>
                {fieldState.error && (
                  <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className={cn(
                      "bg-gray-100",
                      fieldState.error &&
                        "border-[#E23353] focus-visible:ring-[#E23353]"
                    )}
                    {...field}
                    disabled={true}
                  />
                </FormControl>

                {fieldState.error && (
                  <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <Label htmlFor="phone">Phone Number</Label>
                <FormControl>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="123-456-7890"
                    className={cn(
                      "w-full bg-gray-100",
                      fieldState.error &&
                        "border-[#E23353] focus-visible:ring-[#E23353]"
                    )}
                    {...field}
                    disabled={true}
                  />
                </FormControl>
                {fieldState.error && (
                  <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label htmlFor="country">Country</Label>

                <div className="relative">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries?.map((country, index) => (
                        <SelectItem key={index} value={country.label}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label htmlFor="timezone">Timezone</Label>

                <div className="relative">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timezones?.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormItem>
            )}
          />

          {/* Profile Picture Section */}
          <div className="w-full mt-6 mb-2">
            <Label className="mb-2 block">Profile Picture</Label>

            <div className="flex items-start gap-4">
              {/* Profile Image Preview */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                <Image
                  src={previewUrl || "/images/avatar-placeholder.webp"}
                  alt="Profile picture"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Edit Controls */}
              <div className="flex-1">
                {!editPhoto ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditPhoto(true)}
                    className="h-10 text-sm hover:bg-transparent"
                  >
                    Edit profile picture
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Card className="w-full shadow-none border border-dashed">
                      <CardHeader className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">
                            Upload new picture
                          </p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={cancelPhotoEdit}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <label className="flex flex-col items-center p-4 border border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                          <ExclamationMarkIcon />
                          <span className="mt-2 text-sm font-medium">
                            Click to upload
                          </span>
                          <span className="text-xs text-gray-500">
                            PNG or JPG (max. 800x800px)
                          </span>
                          <input
                            id="img"
                            type="file"
                            accept={SUPPORTED_FORMAT}
                            {...register("img")}
                            className="hidden"
                          />
                        </label>

                        {img && img.length > 0 && (
                          <div className="text-sm text-center mt-2">
                            <span className="font-medium">{img[0].name}</span>
                            <span className="text-xs text-gray-500 block">
                              {Math.round(img[0].size / 1024)} KB
                            </span>
                          </div>
                        )}
                      </CardHeader>
                    </Card>

                    {errors.img && (
                      <p className="text-red-500 text-sm">
                        {errors.img?.message as string}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full h-[46px] py-[9px] px-[13px] flex gap-1 font-inter font-normal text-[17px]/[24px] text-[#FFFAF3] tracking-normal mt-6"
          >
            {isSubmitting ? "Processing..." : "Continue"}{" "}
            {!isSubmitting && <ArrowRight />}
          </Button>
        </form>
      </Form>
    </div>
  )
}
