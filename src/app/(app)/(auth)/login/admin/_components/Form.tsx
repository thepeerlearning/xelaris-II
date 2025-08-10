"use client"

import Form from "@/components/form/Form"
import FormField from "@/components/form/FormField"
import { Button } from "@/components/ui/button"
import { adminLogin } from "@/lib/redux/features/auth/authSlice"
import { useAppDispatch } from "@/lib/redux/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
})

type FormData = z.infer<typeof schema>

export function AdminInformation() {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    const { password, email } = data

    const inputData = {
      email: email?.trim(),
      password: password,
    }
    setLoading(true)
    dispatch(adminLogin({ inputData }))
      .unwrap()
      .then(() => {
        setLoading(false)
        router.push("/admin/dashboard")
      })
      .catch(() => {
        setLoading(false)
      })
    return false
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6 w-full text-black">
        <FormField
          control={form.control}
          name="email"
          label="Email address"
          placeholder="alexaplex@gmail.co"
        />

        <div>
          <FormField
            fieldType="input"
            type="password"
            control={form.control}
            name="password"
            label="Password"
            placeholder="*******"
          />
          <Link
            href="/#"
            className="text-black mt-2 text-sm hover:underline block"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="flex">
          <Button type="submit" className="flex-1">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
