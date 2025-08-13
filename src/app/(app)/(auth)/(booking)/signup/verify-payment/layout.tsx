import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payment verification - TechChild",
  description: "Payment verification page",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
