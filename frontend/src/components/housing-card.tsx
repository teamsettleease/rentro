"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { SearchCardSkeleton } from "./skeleton-loader"

export function HousingCard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 350)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return <SearchCardSkeleton />
  }

  return (
    <Card className="flex-1 bg-white rounded-lg shadow-lg">
      <CardContent className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900">Housing</h3>
        <div className="space-y-2 md:space-y-3">
          <Select>
            <SelectTrigger className="h-9 md:h-10 text-xs md:text-sm">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="suburbs">Suburbs</SelectItem>
              <SelectItem value="university">University Area</SelectItem>
              <SelectItem value="waterfront">Waterfront</SelectItem>
            </SelectContent>
          </Select>

          {/* Spacers to match storage card height */}
          <div className="h-9 md:h-10"></div>
          <div className="h-9 md:h-10"></div>

          <Button className="w-full h-9 md:h-10 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs md:text-sm transition-colors">
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
