import LandingRootLayoutWrapper from "."

export default function LandingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LandingRootLayoutWrapper>{children}</LandingRootLayoutWrapper>
}
