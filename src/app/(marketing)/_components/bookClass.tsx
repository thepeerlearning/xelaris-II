"use client"
import React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"

interface TrialClassButtonProps {
  className?: string
  buttonText?: string | React.ReactNode
}

const BookClassButton: React.FC<TrialClassButtonProps> = ({
  className = "",
  buttonText = "Book a Free Class",
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [open, setOpen] = React.useState(false)

  const calLink = "https://cal.com/xelaris/trial-class?user=xelaris"
  const fullUrl = calLink.startsWith("http")
    ? calLink
    : `https://cal.com/${calLink}`

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className={className}>{buttonText}</Button>
      </DrawerTrigger>

      <DrawerContent className="max-w-screen h-screen min-h-screen">
        <DrawerHeader>
          <DrawerTitle>Book a Free Class</DrawerTitle>
        </DrawerHeader>

        <DrawerClose className="absolute right-2 top-2 sm:right-4 sm:top-4 z-50 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all">
          <X className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          <span className="sr-only">Close</span>
        </DrawerClose>

        <div className="w-full min-h-[100vh] relative">
          <div className="w-full overflow-hidden rounded">
            <div className="w-full flex justify-center items-center">
              <div className="w-full flex flex-col gap-4 flex-1">
                <div className="w-full flex flex-col">
                  <div className="relative flex-1 h-[100vh]">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center rounded">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    )}
                    <iframe
                      src={fullUrl}
                      title="Book a Free Class"
                      className="w-full h-[100vh] border-none"
                      onLoad={() => setIsLoading(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default BookClassButton
