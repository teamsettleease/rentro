"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function CTASection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 400)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return <div className="h-10 md:h-12 w-32 bg-yellow-200 rounded mb-6 md:mb-8 animate-pulse" />
  }

  return (
    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 md:px-8 py-2 md:py-3 text-sm md:text-base mb-6 md:mb-8 transition-colors">
      Learn More
    </Button>
  )
}
