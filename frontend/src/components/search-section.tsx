"use client"

import { StorageCard } from "./storage-card"
import { HousingCard } from "./housing-card"

export function SearchSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 md:gap-4 mb-4 md:mb-6 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <StorageCard />
      <HousingCard />
    </div>
  )
}
