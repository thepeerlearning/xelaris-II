"use client"
import Lottie from "lottie-react"
import noDataJson from "./no-data.json"

const NoDataFound = () => {
  return (
    <Lottie
      loop={true}
      autoPlay={true}
      animationData={noDataJson}
      style={{ height: 120, width: 120 }}
    />
  )
}

export default NoDataFound
