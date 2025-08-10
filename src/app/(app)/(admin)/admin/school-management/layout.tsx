import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "School management - xelaris",
  description: "xelaris school management",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
