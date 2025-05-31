"use client"

import { useState, useEffect } from "react"
import { HeroSkeleton } from "./skeleton-loader"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return <HeroSkeleton />
  }

  return (
    <div className="text-center mb-6 md:mb-8 max-w-4xl px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-3 leading-tight">
        Flexible Storage and Housing Solutions
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal">
        Store your belongings securely or find your next rental with ease.
      </p>
    </div>
  )
}
