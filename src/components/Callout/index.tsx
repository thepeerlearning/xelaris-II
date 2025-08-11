"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type * as React from "react"

interface CalloutProps {
  FirstActionButton?: string | React.ReactNode
  SecondActionButton?: string | React.ReactNode
  ThirdActionButton?: string | React.ReactNode
  FourthActionButton?: string | React.ReactNode
  icon?: React.ReactNode // Lucide React icons are preferred, but React.ReactNode allows flexibility
}

function Callout({
  FirstActionButton,
  SecondActionButton,
  ThirdActionButton,
  FourthActionButton,
  icon,
}: CalloutProps) {
  // Function to prevent dropdown from closing on item click
  const handleItemSelect = (event: Event) => {
    event.preventDefault()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost" // Use ghost variant for a subtle button, similar to IconButton
          size="icon" // Make it an icon button
          className="cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-800" // Custom hover style
          aria-label="More options"
        >
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "bg-gray-800 min-w-[150px] rounded-lg p-2 shadow-lg", // minWidth, borderRadius, padding, boxShadow
          "text-muted-foreground text-xs font-bold leading-none" // color, font, line-height
        )}
        align="start" // anchorOrigin vertical: "bottom", horizontal: "left" -> align="start"
        sideOffset={8} // Adjust offset from trigger
      >
        {FirstActionButton && (
          <>
            <DropdownMenuItem
              className="px-2 py-1.5 cursor-pointer"
              onSelect={handleItemSelect}
            >
              {FirstActionButton}
            </DropdownMenuItem>
            {SecondActionButton && (
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            )}
          </>
        )}
        {SecondActionButton && (
          <>
            <DropdownMenuItem
              className="px-2 py-1.5 cursor-pointer"
              onSelect={handleItemSelect}
            >
              {SecondActionButton}
            </DropdownMenuItem>
            {ThirdActionButton && (
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            )}
          </>
        )}
        {ThirdActionButton && (
          <>
            <DropdownMenuItem
              className="px-2 py-1.5 cursor-pointer"
              onSelect={handleItemSelect}
            >
              {ThirdActionButton}
            </DropdownMenuItem>
            {FourthActionButton && (
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            )}
          </>
        )}
        {FourthActionButton && (
          <DropdownMenuItem
            className="px-2 py-1.5 cursor-pointer"
            onSelect={handleItemSelect}
          >
            {FourthActionButton}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Callout
