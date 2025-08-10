import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateKey(str: string) {
  if (typeof str !== "string") return ""
  return str.trim().toLowerCase().replace(/\s+/g, "-")
}

export function getInitials(name: string) {
  if (!name) return ""
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("")
}

type TimeInput = string | Date | null | undefined

export function convert24To12(time: TimeInput): string | null {
  if (!time) return null

  let hours: number | null = null
  let minutes: number | null = null

  if (time instanceof Date) {
    hours = time.getHours()
    minutes = time.getMinutes()
  } else if (typeof time === "string") {
    const match = time.match(/^(\d{1,2}):(\d{2})$/)
    if (!match) return null
    hours = Number(match[1])
    minutes = Number(match[2])
  } else {
    return null
  }

  if (
    hours == null ||
    minutes == null ||
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null
  }

  const period = hours >= 12 ? "PM" : "AM"
  const twelveHour = hours % 12 || 12
  const mm = String(minutes).padStart(2, "0")
  return `${twelveHour}:${mm} ${period}`
}

type DayLong =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

const DAY_MAPPING: Record<DayLong, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
}

export function convertDayToShortForm(day: string): string {
  const key = day.toLowerCase() as DayLong
  return DAY_MAPPING[key] ?? day
}

export function convertToSubcurrency(amount: number, factor = 100): number {
  return Math.round(amount * factor)
}

export default convertToSubcurrency
