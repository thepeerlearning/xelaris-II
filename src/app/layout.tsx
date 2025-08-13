import AnalyticsTags from "@/components/Analytics"
import StoreProvider from "@/lib/redux/providers"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import localFont from "next/font/local"
import Image from "next/image"
import { Slide, ToastContainer } from "react-toastify"
import "./globals.css"

// const spectral = Spectral({
//   subsets: ["latin"],

//   weight: ["400", "500", "600", "700"],

//   display: "swap",
//   variable: "--font-spectral",
// })
// const interSans = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
//   display: "swap",
// })

const interSans = localFont({
  src: [
    { path: "/fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "/fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "/fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
    {
      path: "/fonts/Inter-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
})

const spectral = localFont({
  src: [
    {
      path: "/fonts/spectral-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/spectral-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/spectral-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/spectral-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-spectral",
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
