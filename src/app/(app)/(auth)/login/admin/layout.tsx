import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin signup | Xelaris",
  description: "Xelaris admin signup page",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
