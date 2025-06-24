"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { FeatureCardSkeleton } from "./skeleton-loader"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500 + delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!isLoaded) {
    return <FeatureCardSkeleton />
  }

  return (
    <Card className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-4 md:p-5 text-left">
        <div className="mb-2 md:mb-3">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" strokeWidth={2} />
        </div>
        <h4 className="text-sm md:text-base font-bold mb-1 md:mb-2 text-gray-900">{title}</h4>
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
