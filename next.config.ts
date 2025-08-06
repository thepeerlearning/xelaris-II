import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
}

export default nextConfig
