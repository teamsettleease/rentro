import { EyeIcon, HeartIcon, MapPinIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const listings = [
  {
    id: 1,
    title: "Downtown Studio",
    type: "Housing",
    location: "New York, NY",
    price: "$1,600/m",
    status: "Active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Garage Storage",
    type: "Storage",
    location: "Los Angeles, CA",
    price: "$150/mo",
    status: "Pending",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Beachside Apartment",
    type: "Housing",
    location: "Miami, FL",
    price: "$2,400/m",
    status: "Active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Climate-Controlled Unit",
    type: "Storage",
    location: "Houston, TX",
    price: "$200/mo",
    status: "Inactive",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Suburban House",
    type: "Housing",
    location: "Chicago, IL",
    price: "$2,200/m",
    status: "Active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Luxury Penthouse",
    type: "Housing",
    location: "San Francisco, CA",
    price: "$4,500/m",
    status: "Active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Storage Unit A1",
    type: "Storage",
    location: "Phoenix, AZ",
    price: "$120/mo",
    status: "Active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Cozy Cottage",
    type: "Housing",
    location: "Portland, OR",
    price: "$1,800/m",
    status: "Pending",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 9,
    title: "Industrial Warehouse",
    type: "Storage",
    location: "Detroit, MI",
    price: "$800/mo",
    status: "Active",
    image: "/placeholder.svg?height=200&width=300",
  },
]

interface ListingsGridProps {
  filters: any
}

export function ListingsGrid({ filters }: ListingsGridProps) {
  // In a real app, you would apply filters here
  const filteredListings = listings

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredListings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="relative">
            <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="w-full h-48 object-cover" />
            <Badge
              className={`absolute top-2 right-2 ${
                listing.status === "Active"
                  ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                  : listing.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
              }`}
            >
              {listing.status}
            </Badge>
          </div>
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{listing.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <MapPinIcon className="h-3 w-3" />
                  {listing.location}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <EyeIcon className="h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <PencilIcon className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex justify-between items-center">
              <Badge variant="outline">{listing.type}</Badge>
              <p className="font-semibold text-lg">{listing.price}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <EyeIcon className="h-4 w-4" />
              View Details
            </Button>
            <Button variant="ghost" size="icon" className="ml-2">
              <HeartIcon className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
