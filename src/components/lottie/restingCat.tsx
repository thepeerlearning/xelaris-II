"use client"
import Lottie from "lottie-react"
import noActivity from "./resting-cat.json"

const NoActivity = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center place-content-center">
      <Lottie
        loop={true}
        autoPlay={true}
        animationData={noActivity}
        style={{ height: 120, width: 120 }}
      />
    </div>
  )
}

export default NoActivity
