"use client"
import Lottie from "lottie-react"
import loader from "./loader.json"

const DataLoader = () => {
  return (
    <Lottie
      loop={true}
      autoPlay={true}
      animationData={loader}
      style={{ height: 120, width: 120 }}
    />
  )
}

export default DataLoader
