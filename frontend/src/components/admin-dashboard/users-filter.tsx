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
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
]

const roles = [
  { value: "admin", label: "Admin" },
  { value: "landlord", label: "Landlord" },
  { value: "tenant", label: "Tenant" },
]

export function UsersFilter({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [openStatus, setOpenStatus] = useState(false)
  const [openRole, setOpenRole] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    applyFilters(e.target.value, selectedStatuses, selectedRoles)
  }

  const toggleStatus = (value: string) => {
    const newSelectedStatuses = selectedStatuses.includes(value)
      ? selectedStatuses.filter((status) => status !== value)
      : [...selectedStatuses, value]
    setSelectedStatuses(newSelectedStatuses)
    applyFilters(searchTerm, newSelectedStatuses, selectedRoles)
  }

  const toggleRole = (value: string) => {
    const newSelectedRoles = selectedRoles.includes(value)
      ? selectedRoles.filter((role) => role !== value)
      : [...selectedRoles, value]
    setSelectedRoles(newSelectedRoles)
    applyFilters(searchTerm, selectedStatuses, newSelectedRoles)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedStatuses([])
    setSelectedRoles([])
    applyFilters("", [], [])
  }

  const applyFilters = (search: string, statuses: string[], roles: string[]) => {
    onFilterChange({
      search,
      statuses,
      roles,
    })
  }

  const hasActiveFilters = searchTerm !== "" || selectedStatuses.length > 0 || selectedRoles.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search users" className="pl-10" value={searchTerm} onChange={handleSearch} />
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

        <Popover open={openRole} onOpenChange={setOpenRole}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Role
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search roles..." />
              <CommandList>
                <CommandEmpty>No role found.</CommandEmpty>
                <CommandGroup>
                  {roles.map((role) => (
                    <CommandItem
                      key={role.value}
                      onSelect={() => toggleRole(role.value)}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          selectedRoles.includes(role.value)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted"
                        }`}
                      >
                        {selectedRoles.includes(role.value) && <CheckIcon className="h-3 w-3" />}
                      </div>
                      <span>{role.label}</span>
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
          {selectedRoles.map((role) => (
            <Badge key={role} variant="secondary" className="flex gap-1 items-center">
              {roles.find((r) => r.value === role)?.label}
              <XIcon className="h-3 w-3 cursor-pointer" onClick={() => toggleRole(role)} />
            </Badge>
          ))}
          <Button variant="link" className="text-xs h-auto p-0" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
