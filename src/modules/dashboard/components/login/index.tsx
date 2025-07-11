/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Form from "@/components/form/Form";
import FormField from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const handleSubmit = form.handleSubmit((data) => {});

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
            Login
          </Button>
        </div>

        <p className="text-sm text-center">
          Need to create an account? 
          <Link href="/signup" className="hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
