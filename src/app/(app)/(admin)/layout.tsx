import type React from "react"
import { AdminLayout } from "./_components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
