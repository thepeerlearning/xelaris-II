"use client"
import Lottie from "lottie-react"
import accessDenied from "./access-denied.json"

const AccessDenied = () => {
  return (
    <Lottie
      loop={true}
      autoPlay={true}
      animationData={accessDenied}
      style={{ height: 250, width: 250 }}
    />
  )
}

export default AccessDenied
