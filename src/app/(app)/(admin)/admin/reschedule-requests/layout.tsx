import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reschedule requests - xelaris",
  description: "xelaris reschedule requests",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
