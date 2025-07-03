"use client"

import type React from "react"

import { useState } from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const statuses = [
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

const properties = [
  "Downtown Studio",
  "Beachfront Villa",
  "Mountain View Cabin",
  "City Center Studio",
  "Lakeside Cottage",
  "Modern Loft",
  "Seaside Bungalow",
  "Historic Townhouse",
]

type BookingsFilterValues = {
  search: string
  statuses: string[]
  property: string | null
}

export function BookingsFilter({ onFilterChange }: { onFilterChange: (filters: BookingsFilterValues) => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [openStatus, setOpenStatus] = useState(false)
  const [openProperty, setOpenProperty] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    applyFilters(e.target.value, selectedStatuses, selectedProperty)
  }

  const toggleStatus = (value: string) => {
    const newSelectedStatuses = selectedStatuses.includes(value)
      ? selectedStatuses.filter((status) => status !== value)
      : [...selectedStatuses, value]
    setSelectedStatuses(newSelectedStatuses)
    applyFilters(searchTerm, newSelectedStatuses, selectedProperty)
  }

  const selectProperty = (property: string) => {
    setSelectedProperty(property)
    setOpenProperty(false)
    applyFilters(searchTerm, selectedStatuses, property)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedStatuses([])
    setSelectedProperty(null)
    applyFilters("", [], null)
  }

  const applyFilters = (search: string, statuses: string[], property: string | null) => {
    onFilterChange({
      search,
      statuses,
      property,
    })
  }

  const hasActiveFilters = searchTerm !== "" || selectedStatuses.length > 0 || selectedProperty !== null

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search bookings" className="pl-10" value={searchTerm} onChange={handleSearch} />
        </div>

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

        <Popover open={openProperty} onOpenChange={setOpenProperty}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Property
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search properties..." />
              <CommandList>
                <CommandEmpty>No property found.</CommandEmpty>
                <CommandGroup>
                  {properties.map((property) => (
                    <CommandItem key={property} onSelect={() => selectProperty(property)}>
                      {property}
                      {selectedProperty === property && <CheckIcon className="ml-auto h-4 w-4" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
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
          {selectedStatuses.map((status) => (
            <Badge key={status} variant="secondary" className="flex gap-1 items-center">
              {statuses.find((s) => s.value === status)?.label}
              <XIcon className="h-3 w-3 cursor-pointer" onClick={() => toggleStatus(status)} />
            </Badge>
          ))}
          {selectedProperty && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              {selectedProperty}
              <XIcon
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSelectedProperty(null)
                  applyFilters(searchTerm, selectedStatuses, null)
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
