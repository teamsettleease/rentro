"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export function ResponsiveBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImage, setCurrentImage] = useState("/hero-image.png")

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setCurrentImage("/hero-mobile.png")
      } else if (window.innerWidth < 1024) {
        setCurrentImage("/hero-tablet.png")
      } else {
        setCurrentImage("/hero-image.png")
      }
    }

    updateImage()
    window.addEventListener("resize", updateImage)
    return () => window.removeEventListener("resize", updateImage)
  }, [])

  return (
    <>
      <div className="absolute inset-0">
        <Image
          src={currentImage || "/placeholder.svg"}
          alt="Man holding box in modern apartment"
          fill
          className={`object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          priority
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Loading skeleton for background */}
      {!isLoaded && <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 animate-pulse" />}
    </>
  )
}
