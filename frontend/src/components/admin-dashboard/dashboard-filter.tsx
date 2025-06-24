"use client"

import { useState } from "react"
import { CheckIcon, ChevronDownIcon, FilterIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

const propertyTypes = [
  { value: "housing", label: "Housing" },
  { value: "storage", label: "Storage" },
  { value: "commercial", label: "Commercial" },
]

const statuses = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
]

const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Miami, FL"]

export function DashboardFilter({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [openType, setOpenType] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)

  const toggleType = (value: string) => {
    const newSelectedTypes = selectedTypes.includes(value)
      ? selectedTypes.filter((type) => type !== value)
      : [...selectedTypes, value]
    setSelectedTypes(newSelectedTypes)
    applyFilters(newSelectedTypes, selectedStatuses, selectedLocation, priceRange)
  }

  const toggleStatus = (value: string) => {
    const newSelectedStatuses = selectedStatuses.includes(value)
      ? selectedStatuses.filter((status) => status !== value)
      : [...selectedStatuses, value]
    setSelectedStatuses(newSelectedStatuses)
    applyFilters(selectedTypes, newSelectedStatuses, selectedLocation, priceRange)
  }

  const selectLocation = (location: string) => {
    setSelectedLocation(location)
    setOpenLocation(false)
    applyFilters(selectedTypes, selectedStatuses, location, priceRange)
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    applyFilters(selectedTypes, selectedStatuses, selectedLocation, value)
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedStatuses([])
    setSelectedLocation(null)
    setPriceRange([0, 5000])
    applyFilters([], [], null, [0, 5000])
  }

  const applyFilters = (types: string[], statuses: string[], location: string | null, price: number[]) => {
    onFilterChange({
      types,
      statuses,
      location,
      price,
    })
  }

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedLocation !== null ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Popover open={openType} onOpenChange={setOpenType}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <FilterIcon className="h-4 w-4" />
              Type
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search property types..." />
              <CommandList>
                <CommandEmpty>No property type found.</CommandEmpty>
                <CommandGroup>
                  {propertyTypes.map((type) => (
                    <CommandItem
                      key={type.value}
                      onSelect={() => toggleType(type.value)}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          selectedTypes.includes(type.value)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted"
                        }`}
                      >
                        {selectedTypes.includes(type.value) && <CheckIcon className="h-3 w-3" />}
                      </div>
                      <span>{type.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={openStatus} onOpenChange={setOpenStatus}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Status
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search statuses..." />
              <CommandList>
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status.value}
                      onSelect={() => toggleStatus(status.value)}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          selectedStatuses.includes(status.value)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted"
                        }`}
                      >
                        {selectedStatuses.includes(status.value) && <CheckIcon className="h-3 w-3" />}
                      </div>
                      <span>{status.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={openLocation} onOpenChange={setOpenLocation}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Location
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search locations..." />
              <CommandList>
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem key={location} onSelect={() => selectLocation(location)}>
                      {location}
                      {selectedLocation === location && <CheckIcon className="ml-auto h-4 w-4" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Price
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4 p-2">
              <h4 className="font-medium text-sm">Price Range</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 5000]}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Min: <span className="font-medium">${priceRange[0]}</span>
                </div>
                <div className="text-sm">
                  Max: <span className="font-medium">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters} className="h-10 w-10">
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>
          {selectedTypes.map((type) => (
            <Badge key={type} variant="secondary" className="flex gap-1 items-center">
              {propertyTypes.find((t) => t.value === type)?.label}
              <XIcon className="h-3 w-3 cursor-pointer" onClick={() => toggleType(type)} />
            </Badge>
          ))}
          {selectedStatuses.map((status) => (
            <Badge key={status} variant="secondary" className="flex gap-1 items-center">
              {statuses.find((s) => s.value === status)?.label}
              <XIcon className="h-3 w-3 cursor-pointer" onClick={() => toggleStatus(status)} />
            </Badge>
          ))}
          {selectedLocation && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              {selectedLocation}
              <XIcon
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSelectedLocation(null)
                  applyFilters(selectedTypes, selectedStatuses, null, priceRange)
                }}
              />
            </Badge>
          )}
          <Button variant="link" className="text-xs h-auto p-0" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
