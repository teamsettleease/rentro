"use client"

import { SearchIcon } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardFilter } from "@/components/admin-dashboard/dashboard-filter"

const listings = [
  {
    title: "Downtown Studio",
    type: "Housing",
    location: "New York, NY",
    price: "$1,600/m",
    status: "Active",
  },
  {
    title: "Garage Storage",
    type: "Storage",
    location: "Los Angeles, CA",
    price: "$150/mo",
    status: "Pending",
  },
  {
    title: "Beachside Apartment",
    type: "Housing",
    location: "Miami, FL",
    price: "$2,400/m",
    status: "Active",
  },
  {
    title: "Climate-Controlled Unit",
    type: "Storage",
    location: "Houston, TX",
    price: "$200/mo",
    status: "Inactive",
  },
  {
    title: "Suburban House",
    type: "Housing",
    location: "Chicago, IL",
    price: "$2,200/m",
    status: "Active",
  },
  {
    title: "Luxury Penthouse",
    type: "Housing",
    location: "San Francisco, CA",
    price: "$4,500/m",
    status: "Active",
  },
  {
    title: "Storage Unit A1",
    type: "Storage",
    location: "Phoenix, AZ",
    price: "$120/mo",
    status: "Active",
  },
  {
    title: "Cozy Cottage",
    type: "Housing",
    location: "Portland, OR",
    price: "$1,800/m",
    status: "Pending",
  },
  {
    title: "Industrial Warehouse",
    type: "Storage",
    location: "Detroit, MI",
    price: "$800/mo",
    status: "Active",
  },
  {
    title: "Modern Loft",
    type: "Housing",
    location: "Seattle, WA",
    price: "$2,800/m",
    status: "Inactive",
  },
  {
    title: "Riverside Cabin",
    type: "Housing",
    location: "Austin, TX",
    price: "$1,900/m",
    status: "Active",
  },
  {
    title: "Mini Storage Unit",
    type: "Storage",
    location: "Denver, CO",
    price: "$80/mo",
    status: "Pending",
  },
  {
    title: "City View Apartment",
    type: "Housing",
    location: "Boston, MA",
    price: "$2,100/m",
    status: "Active",
  },
  {
    title: "Secure Storage",
    type: "Storage",
    location: "Atlanta, GA",
    price: "$180/mo",
    status: "Active",
  },
  {
    title: "Garden Villa",
    type: "Housing",
    location: "San Diego, CA",
    price: "$3,200/m",
    status: "Inactive",
  },
]

export function ListingsTable() {
  const [activeFilters, setActiveFilters] = useState({})

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters)
    // In a real app, you would filter the data here
    console.log("Filters applied:", filters)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Listings</CardTitle>
        <div className="flex gap-2 mt-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search listings" className="pl-10" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <DashboardFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="max-h-80 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{listing.title}</TableCell>
                  <TableCell>{listing.type}</TableCell>
                  <TableCell>{listing.location}</TableCell>
                  <TableCell>{listing.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        listing.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                          : listing.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                      }
                    >
                      {listing.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
