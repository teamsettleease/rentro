"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { SearchCardSkeleton } from "./skeleton-loader"

export function StorageCard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return <SearchCardSkeleton />
  }

  return (
    <Card className="flex-1 bg-white rounded-lg shadow-lg">
      <CardContent className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900">Storage</h3>
        <div className="space-y-2 md:space-y-3">
          <Select>
            <SelectTrigger className="h-9 md:h-10 text-xs md:text-sm">
              <SelectValue placeholder="Type of goods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="documents">Documents</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="h-9 md:h-10 text-xs md:text-sm">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (5x5)</SelectItem>
              <SelectItem value="medium">Medium (10x10)</SelectItem>
              <SelectItem value="large">Large (10x20)</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="h-9 md:h-10 text-xs md:text-sm">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-month">1 Month</SelectItem>
              <SelectItem value="3-months">3 Months</SelectItem>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="1-year">1 Year</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full h-9 md:h-10 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs md:text-sm transition-colors">
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
