import AnalyticsTags from "@/components/Analytics"
import StoreProvider from "@/lib/redux/providers"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Inter, Spectral } from "next/font/google"
import Image from "next/image"
import { Slide, ToastContainer } from "react-toastify"
import "./globals.css"

const spectral = Spectral({
  subsets: ["latin"],

  weight: ["400", "500", "600", "700"],

  display: "swap",
  variable: "--font-spectral",
})
const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

// Environment check for server URL
const dev = process.env.NODE_ENV !== "production"
export const server = dev ? "http://localhost:3000" : "https://www.xelaris.co"

export const metadata: Metadata = {
  metadataBase: new URL(server),
  title: "Xelaris",
  description:
    "Empowering Your Child for the Future with Coding, AI, and Design Skills on Their Preferred Schedule",
  openGraph: {
    title: "Xelaris",
    description:
      "Empowering Your Child for the Future with Coding, AI, and Design Skills on Their Preferred Schedule",
    url: server,
    siteName: "Xelaris",
    images: [
      {
        url: "/xelaris.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@xelaris",
    title: "Xelaris",
    description:
      "Empowering Your Child for the Future with Coding, AI, and Design Skills on Their Preferred Schedule",
    images: [
      {
        url: "/xelaris.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <AnalyticsTags />
      </head>
      <body
        className={` ${interSans.variable}  ${spectral.variable}  antialiased flex flex-col min-h-screen`}
      >
        <noscript>
          <Image
            alt="facebook pixel alt"
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=758264646305524&ev=PageView&noscript=1"
          />
        </noscript>
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
        <Analytics />
      </body>
    </html>
  )
}
