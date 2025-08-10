"use client"

import { EyevisibilityOffIcon, EyeVisibilityOnIcon } from "@/components/svgs"
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
import { changeAdminPassword } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const infoSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "Please enter your old password" })
      .min(8, "Password must be at least 8 characters"),
    password: z
      .string({ required_error: "Please enter a password" })
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string({
      required_error: "Please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
// Define the type from the schema
type infoValues = z.infer<typeof infoSchema>

export function ChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useAppDispatch()

  // Initialize the form with React Hook Form and Zod validation
  const form = useForm<infoValues>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur", // Validate on blur for better user experience
  })

  const { formState } = form
  const { isValid } = formState

  // Handle form submission
  function onSubmit(values: infoValues) {
    const { confirmPassword, password, oldPassword } = values
    const inputData = {
      old_password: oldPassword?.trim(),
      password: password?.trim(),
      confirmPassword: confirmPassword?.trim(),
    }

    setIsSubmitting(true)
    dispatch(changeAdminPassword({ inputData }))
      .unwrap()
      .then(() => {
        setIsSubmitting(false)
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  }
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showPassword)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="w-full h-full space-y-4">
      <h2 className="text-[17px]/[26px] text-white font-bold mb-4">Password</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full xl:w-[420px] grid grid-cols-1 gap-4"
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="oldPassword">Old password</FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      id="oldPassword"
                      type={showOldPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "pr-10",
                        fieldState.error &&
                          "border-[#E23353] focus-visible:ring-[#E23353]"
                      )}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-0 h-full px-3 py-2 text-[#404452] hover:bg-transparent hover:text-[#404452] cursor-pointer"
                      onClick={toggleOldPasswordVisibility}
                    >
                      {showOldPassword ? (
                        <EyevisibilityOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeVisibilityOnIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showOldPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>

                {fieldState.error && (
                  <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="w-full h-[14px] flex justify-between items-center">
                  <FormLabel htmlFor="password">New password</FormLabel>
                </div>

                <FormControl>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "pr-10",
                        fieldState.error &&
                          "border-[#E23353] focus-visible:ring-[#E23353]"
                      )}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-0 h-full px-3 py-2 text-[#404452] hover:bg-transparent hover:text-[#404452] cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyevisibilityOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeVisibilityOnIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                {fieldState.error && (
                  <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="w-full h-[14px] flex justify-between items-center">
                  <FormLabel htmlFor="confirmPassword">
                    Confirm new password
                  </FormLabel>
                </div>

                <FormControl>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "pr-10",
                        fieldState.error &&
                          "border-[#E23353] focus-visible:ring-[#E23353]"
                      )}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-0 h-full px-3 py-2 text-[#404452] hover:bg-transparent hover:text-[#404452] cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <EyevisibilityOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeVisibilityOnIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "Hide password"
                          : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                {fieldState.error && (
                  <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                )}
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? "Saving..." : "Save"}{" "}
          </Button>
        </form>
      </Form>
    </div>
  )
}
