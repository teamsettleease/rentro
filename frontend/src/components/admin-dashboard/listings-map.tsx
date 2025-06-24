"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

const listings = [
  {
    id: 1,
    title: "Downtown Studio",
    type: "Housing",
    location: "New York, NY",
    price: "$1,600/m",
    status: "Active",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    title: "Garage Storage",
    type: "Storage",
    location: "Los Angeles, CA",
    price: "$150/mo",
    status: "Pending",
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: 3,
    title: "Beachside Apartment",
    type: "Housing",
    location: "Miami, FL",
    price: "$2,400/m",
    status: "Active",
    lat: 25.7617,
    lng: -80.1918,
  },
  {
    id: 4,
    title: "Climate-Controlled Unit",
    type: "Storage",
    location: "Houston, TX",
    price: "$200/mo",
    status: "Inactive",
    lat: 29.7604,
    lng: -95.3698,
  },
  {
    id: 5,
    title: "Suburban House",
    type: "Housing",
    location: "Chicago, IL",
    price: "$2,200/m",
    status: "Active",
    lat: 41.8781,
    lng: -87.6298,
  },
]

export function ListingsMap() {
  const [selectedListing, setSelectedListing] = useState<number | null>(null)

  // In a real app, you would apply filters here
  const filteredListings = listings

  return (
    <div className="flex h-[600px] border rounded-md overflow-hidden">
      <div className="w-1/4 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h3 className="font-medium">Listings on Map</h3>
          <p className="text-sm text-gray-500">{filteredListings.length} properties</p>
        </div>
        <div>
          {filteredListings.map((listing) => (
            <div 
              key={listing.id} 
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedListing === listing.id ? 'bg-gray-50' : ''}`}
              onClick={() => setSelectedListing(listing.id)}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{listing.title}</h4>
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
              </div>
              <p className="text-sm text-gray-500 mt-1">{listing.location}</p>
              <p className="font-medium mt-2">{listing.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 bg-gray-100 relative flex items-center justify-center">
        {/* In a real app, this would be a map component like Google Maps or Mapbox */}
        <p className="text-gray-400">Map view placeholder</p>
      </div>
    </div>
  )
}
