import * as React from "react"
import { cn } from "@/lib/utils"

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type = "text", value, defaultValue, ...rest }, ref) => {
    const isControlled = value !== undefined

    // Strip value/defaultValue from rest so we control what gets passed
    const { ...props } = rest

    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "flex h-10 w-full border border-gray-100 bg-white px-3 py-1 text-base text-black",
          "transition-colors placeholder:text-[#BDC1CA]",
          "focus-visible:outline-none focus:outline-0 focus-visible:border-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...(isControlled
          ? { value: value ?? "" } // never undefined
          : { defaultValue: defaultValue ?? "" })}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"
export { Input }
