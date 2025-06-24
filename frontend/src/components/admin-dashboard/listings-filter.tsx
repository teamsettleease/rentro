"use client"

import type React from "react"
import { useState } from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

const propertyTypes = [
  { value: "housing", label: "Housing" },
  { value: "storage", label: "Storage" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "land", label: "Land" },
]

const statuses = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
]

const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Miami, FL",
  "San Francisco, CA",
  "Boston, MA",
  "Seattle, WA",
  "Austin, TX",
  "Denver, CO",
]

const amenities = [
  { value: "wifi", label: "WiFi" },
  { value: "parking", label: "Parking" },
  { value: "pool", label: "Pool" },
  { value: "gym", label: "Gym" },
  { value: "laundry", label: "Laundry" },
  { value: "ac", label: "Air Conditioning" },
  { value: "heating", label: "Heating" },
  { value: "balcony", label: "Balcony" },
]

const propertySizes = [
  { value: "studio", label: "Studio" },
  { value: "1br", label: "1 Bedroom" },
  { value: "2br", label: "2 Bedrooms" },
  { value: "3br", label: "3 Bedrooms" },
  { value: "4br+", label: "4+ Bedrooms" },
]

export function ListingsFilter({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [rating, setRating] = useState<number | null>(null)
  const [availability, setAvailability] = useState("")
  const [owner, setOwner] = useState("")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  const [openType, setOpenType] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)
  const [openAmenities, setOpenAmenities] = useState(false)
  const [openSize, setOpenSize] = useState(false)
  const [openAdvanced, setOpenAdvanced] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    applyFilters(e.target.value)
  }

  const toggleType = (value: string) => {
    const newSelectedTypes = selectedTypes.includes(value)
      ? selectedTypes.filter((type) => type !== value)
      : [...selectedTypes, value]
    setSelectedTypes(newSelectedTypes)
    applyFilters(searchTerm)
  }

  const toggleStatus = (value: string) => {
    const newSelectedStatuses = selectedStatuses.includes(value)
      ? selectedStatuses.filter((status) => status !== value)
      : [...selectedStatuses, value]
    setSelectedStatuses(newSelectedStatuses)
    applyFilters(searchTerm)
  }

  const toggleAmenity = (value: string) => {
    const newSelectedAmenities = selectedAmenities.includes(value)
      ? selectedAmenities.filter((amenity) => amenity !== value)
      : [...selectedAmenities, value]
    setSelectedAmenities(newSelectedAmenities)
    applyFilters(searchTerm)
  }

  const toggleSize = (value: string) => {
    const newSelectedSizes = selectedSizes.includes(value)
      ? selectedSizes.filter((size) => size !== value)
      : [...selectedSizes, value]
    setSelectedSizes(newSelectedSizes)
    applyFilters(searchTerm)
  }

  const selectLocation = (location: string) => {
    setSelectedLocation(location)
    setOpenLocation(false)
    applyFilters(searchTerm)
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    applyFilters(searchTerm)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTypes([])
    setSelectedStatuses([])
    setSelectedLocation(null)
    setSelectedAmenities([])
    setSelectedSizes([])
    setPriceRange([0, 5000])
    setRating(null)
    setAvailability("")
    setOwner("")
    setDateRange({ from: "", to: "" })
    applyFilters("")
  }

  const applyFilters = (search: string) => {
    onFilterChange({
      search,
      types: selectedTypes,
      statuses: selectedStatuses,
      location: selectedLocation,
      amenities: selectedAmenities,
      sizes: selectedSizes,
      price: priceRange,
      rating,
      availability,
      owner,
      dateRange,
    })
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedTypes.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedLocation !== null ||
    selectedAmenities.length > 0 ||
    selectedSizes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000 ||
    rating !== null ||
    availability !== "" ||
    owner !== "" ||
    dateRange.from !== "" ||
    dateRange.to !== ""

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search listings" className="pl-10" value={searchTerm} onChange={handleSearch} />
        </div>

        <Popover open={openType} onOpenChange={setOpenType}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
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

        <Popover open={openAmenities} onOpenChange={setOpenAmenities}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Amenities
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search amenities..." />
              <CommandList>
                <CommandEmpty>No amenity found.</CommandEmpty>
                <CommandGroup>
                  {amenities.map((amenity) => (
                    <CommandItem
                      key={amenity.value}
                      onSelect={() => toggleAmenity(amenity.value)}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          selectedAmenities.includes(amenity.value)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted"
                        }`}
                      >
                        {selectedAmenities.includes(amenity.value) && <CheckIcon className="h-3 w-3" />}
                      </div>
                      <span>{amenity.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={openSize} onOpenChange={setOpenSize}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Size
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search sizes..." />
              <CommandList>
                <CommandEmpty>No size found.</CommandEmpty>
                <CommandGroup>
                  {propertySizes.map((size) => (
                    <CommandItem
                      key={size.value}
                      onSelect={() => toggleSize(size.value)}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          selectedSizes.includes(size.value)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted"
                        }`}
                      >
                        {selectedSizes.includes(size.value) && <CheckIcon className="h-3 w-3" />}
                      </div>
                      <span>{size.label}</span>
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

        <Popover open={openAdvanced} onOpenChange={setOpenAdvanced}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              More Filters
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4 p-2">
              <div>
                <label className="text-sm font-medium">Rating</label>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={rating || ""}
                  onChange={(e) => {
                    setRating(e.target.value === "" ? null : Number.parseInt(e.target.value))
                    applyFilters(searchTerm)
                  }}
                >
                  <option value="">All Ratings</option>
                  <option value="1">1+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Availability</label>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={availability}
                  onChange={(e) => {
                    setAvailability(e.target.value)
                    applyFilters(searchTerm)
                  }}
                >
                  <option value="">All</option>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Owner/Landlord</label>
                <Input
                  className="mt-1"
                  value={owner}
                  onChange={(e) => {
                    setOwner(e.target.value)
                    applyFilters(searchTerm)
                  }}
                  placeholder="Enter owner name"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Available From</label>
                  <Input
                    type="date"
                    className="mt-1"
                    value={dateRange.from}
                    onChange={(e) => {
                      setDateRange((prev) => ({ ...prev, from: e.target.value }))
                      applyFilters(searchTerm)
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Available To</label>
                  <Input
                    type="date"
                    className="mt-1"
                    value={dateRange.to}
                    onChange={(e) => {
                      setDateRange((prev) => ({ ...prev, to: e.target.value }))
                      applyFilters(searchTerm)
                    }}
                  />
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
          {selectedAmenities.map((amenity) => (
            <Badge key={amenity} variant="secondary" className="flex gap-1 items-center">
              {amenities.find((a) => a.value === amenity)?.label}
              <XIcon className="h-3 w-3 cursor-pointer" onClick={() => toggleAmenity(amenity)} />
            </Badge>
          ))}
          {selectedSizes.map((size) => (
            <Badge key={size} variant="secondary" className="flex gap-1 items-center">
              {propertySizes.find((s) => s.value === size)?.label}
              <XIcon className="h-3 w-3 cursor-pointer" onClick={() => toggleSize(size)} />
            </Badge>
          ))}
          {selectedLocation && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              {selectedLocation}
              <XIcon
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSelectedLocation(null)
                  applyFilters(searchTerm)
                }}
              />
            </Badge>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 5000) && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              ${priceRange[0]} - ${priceRange[1]}
              <XIcon
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setPriceRange([0, 5000])
                  applyFilters(searchTerm)
                }}
              />
            </Badge>
          )}
          {rating && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              {rating}+ Stars
              <XIcon
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setRating(null)
                  applyFilters(searchTerm)
                }}
              />
            </Badge>
          )}
          {availability && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              {availability}
              <XIcon
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setAvailability("")
                  applyFilters(searchTerm)
                }}
              />
            </Badge>
          )}
          {owner && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              Owner: {owner}
              <XIcon
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setOwner("")
                  applyFilters(searchTerm)
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
