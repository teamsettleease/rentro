"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { NavigationSkeleton } from "./skeleton-loader"
import Link from "next/link"

export function Navigation() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return <NavigationSkeleton />
  }

  return (
    <nav className="relative z-10 flex justify-end items-center p-4 md:p-6">
      <div className="flex gap-2 md:gap-4">
        <Button variant="ghost" className="text-white hover:bg-white/20 text-xs md:text-sm font-medium px-3 md:px-4">
          List a Space
        </Button>

        <Button
          asChild
          className="bg-white/90 text-gray-900 hover:bg-white text-xs md:text-sm font-medium px-4 md:px-6">
            <Link href="/register">Sign in</Link>
          </Button>
        

      </div>
    </nav>
  )
}
