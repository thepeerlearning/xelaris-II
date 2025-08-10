"use client"

import { SidebarFooter, SidebarInset } from "@/components/ui/sidebar"

import {
  CalendarSync,
  Home,
  LogOutIcon,
  LucideGraduationCap,
  Menu,
  Settings,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { logout } from "@/lib/redux/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { AppLogo } from "@/components/svgs/app-logo"

// Menu items with their respective icons
const menu = [
  {
    name: "Dashboard",
    title: "Dashboard",
    link: "/admin/dashboard",
    isReady: true,
    icon: Home,
  },
  {
    name: "School management",
    title: "School management",
    link: "/admin/school-management",
    isReady: true,
    icon: LucideGraduationCap,
  },
  {
    name: "Reschedule Requests",
    title: "Reschedule Requests",
    link: "/admin/reschedule-requests",
    isReady: true,
    icon: CalendarSync,
  },
  {
    name: "Settings",
    title: "Settings",
    link: "/admin/settings",
    icon: Settings,
    isReady: true,
  },
]

export function MobileNav({ user }: any) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg-md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] max-w-xs p-0">
        <SheetTitle></SheetTitle>
        <div className="flex h-16 items-center border-b px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-black font-bold">
              {getInitials(user?.name?.trim())}
            </div>
            <span className="text-lg font-semibold">Admin Portal</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1 bg-black z-50"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="py-4">
          <nav className="flex flex-col space-y-1 px-2">
            {menu.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.link
                    ? "bg-primary text-black font-bold"
                    : "hover:bg-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isLoggedIn }: any = useAppSelector((state) => state.auth)

  React.useEffect(() => {
    const role = user?.role?.toLowerCase()

    if (isLoggedIn === false && role !== "admin") {
      router.push("/login/admin")
    }
    if (isLoggedIn === true && role !== "admin") {
      router.push("/access-denied")
    }
    return () => {}
  }, [isLoggedIn, router, user])

  return (
    <div className="bg-[#1D1F24] flex flex-col min-h-screen">
      <div className="lg-md:hidden">
        <header className="flex h-16 items-center border-b px-4 bg-[#1D1F24]">
          <MobileNav user={user} />
          <h1 className="ml-2 text-xl font-semibold font-inter">
            Admin Portal
          </h1>
        </header>
        <main className="p-4 bg-[#1D1F24]">{children}</main>
      </div>

      <div className="hidden lg-md:block">
        <SidebarProvider>
          <AppSidebar user={user} />
          <SidebarInset>
            <header className="flex h-16 items-center border-b border-[#E5E9EB]/20 px-4 bg-[#1D1F24]">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold font-inter">Admin Portal</h1>
            </header>
            <main className="p-4 bg-[#1D1F24]">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}

function AppSidebar({ user }: any) {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  return (
    <Sidebar className="border-r border-[#1D1F24] bg-[#1D1F24]">
      <SidebarHeader className="flex items-center justify-center py-4 bg-[#1D1F24]">
        <AppLogo className="w-[200px] h-auto -ml-16" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menu.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.link}
                tooltip={item.title}
              >
                <Link href={item.link} className="flex items-center">
                  <item.icon className="mr-2 h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter
        onClick={() => dispatch(logout())}
        className="cursor-pointer px-2"
      >
        <div key={user?.id} className={`bg-transparent flex items-center`}>
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.photo} alt="user photo" />
            <AvatarFallback className="bg-[#F2F4F7] text-black font-medium font-inter text-sm">
              {getInitials(user?.name?.trim())}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p
              className={"text-black font-medium font-inter text-sm capitalize"}
            >
              {user?.name}
            </p>
            <p className={"text-secondary font-normal font-inter text-sm"}>
              {user?.email}
            </p>
          </div>

          <LogOutIcon className="text-primary h-6 w-6" />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
