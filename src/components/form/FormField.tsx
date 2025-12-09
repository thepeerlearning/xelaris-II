import { cn } from "@/lib/utils"
import { Eye, EyeOff, TriangleAlert } from "lucide-react"
import { ComponentProps, ReactNode, useState } from "react"
import { Control, FieldPath, FieldValues, useController } from "react-hook-form"
import { Input } from "../ui/input"
import { PhoneInput } from "../ui/phone-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface SelectOptions {
  value: string
  label: string
  disabled?: boolean
}

interface SharedFormFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label?: string
  containerClassName?: string
  errorClassName?: string
  showError?: boolean
  required?: boolean
  className?: string
  renderLabelRight?: ReactNode
  disabled?: boolean
}

type InputFieldProps<T extends FieldValues> = SharedFormFieldProps<T> & {
  fieldType?: "input"
  type?: ComponentProps<typeof Input>["type"]
  placeholder?: string
  autoComplete?: string
  options?: never // explicitly disallow
}

type SelectFieldProps<T extends FieldValues> = SharedFormFieldProps<T> & {
  fieldType: "select"
  options: SelectOptions[]
  placeholder?: string
  type?: never
}

type PhoneFieldProps<T extends FieldValues> = SharedFormFieldProps<T> & {
  fieldType: "phone"
  options?: never
  type?: never
  placeholder?: string
  defaultCountry?: ComponentProps<typeof PhoneInput>["defaultCountry"]
}

type FormFieldProps<T extends FieldValues> =
  | InputFieldProps<T>
  | SelectFieldProps<T>
  | PhoneFieldProps<T>

const FormField = <T extends FieldValues>({
  name,
  label,
  containerClassName = "",
  showError = true,
  className,
  type,
  renderLabelRight,
  required,
  fieldType = "input",
  options,
  placeholder,
  ...props
}: FormFieldProps<T>) => {
  const {
    field: { value, onBlur, onChange, ref },
    fieldState: { error },
  } = useController({ name })

  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === "password"
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type

  const renderField = () => {
    switch (fieldType) {
      case "input":
        return (
          <div className="relative group">
            <Input
              id={name}
              className={cn(className, isPasswordField ? "pr-10" : "")}
              type={inputType}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              onBlur={onBlur}
              ref={ref}
              aria-invalid={error?.message ? "true" : "false"}
              {...props}
            />
            {isPasswordField && (
              <button
                type="button"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            )}
          </div>
        )
      case "select":
        return (
          <Select value={value as any} onValueChange={onChange} {...props}>
            <SelectTrigger
              id={name}
              className={cn(className)}
              ref={ref}
              onBlur={onBlur}
              aria-invalid={error?.message ? "true" : "false"}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "phone":
        return (
          <PhoneInput
            value={value as any}
            onChange={onChange as any}
            onBlur={onBlur}
            placeholder={placeholder}
            className={className}
            {...props}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("space-y-2 group", containerClassName)}>
      <div className="flex items-center justify-between">
        {label && (
          <label
            htmlFor={name}
            className={cn(
              "text-sm font-medium text-white",
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </label>
        )}
        {renderLabelRight}
      </div>
      {renderField()}
      {showError && error?.message && (
        <p className="text-red-500 text-sm space-x-2 flex items-center gap-1">
          <TriangleAlert className="size-4" />
          {error.message}
        </p>
      )}
    </div>
  )
}

export default FormField
