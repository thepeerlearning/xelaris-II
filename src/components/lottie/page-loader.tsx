"use client"

import Lottie from "lottie-react"
import pageLoaderJson from "./page-loader.json"

const PageLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center place-content-center">
      <Lottie
        loop={true}
        autoPlay={true}
        animationData={pageLoaderJson}
        style={{ height: 220, width: 220 }}
      />
    </div>
  )
}

export default PageLoader
