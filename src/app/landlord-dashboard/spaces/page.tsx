"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PlusIcon,
  EditIcon,
  EyeIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
  WifiIcon,
  CoffeeIcon,
  CarIcon,
  AirVentIcon,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SpacesPage() {
  const [spaces, setSpaces] = useState([
    {
      id: 1,
      name: "Downtown Co-Working Hub",
      type: "Co-Working",
      location: "Manhattan, NY",
      capacity: 50,
      hourlyRate: 25,
      dailyRate: 180,
      status: "active",
      rating: 4.9,
      reviews: 127,
      occupancy: 95,
      amenities: ["WiFi", "Coffee", "Parking", "AC"],
      image: "/placeholder.svg?height=200&width=300",
      description: "Modern co-working space in the heart of Manhattan with all amenities.",
    },
    {
      id: 2,
      name: "Creative Studio Space",
      type: "Studio",
      location: "Brooklyn, NY",
      capacity: 20,
      hourlyRate: 35,
      dailyRate: 250,
      status: "active",
      rating: 4.8,
      reviews: 89,
      occupancy: 88,
      amenities: ["WiFi", "Equipment", "Natural Light"],
      image: "/placeholder.svg?height=200&width=300",
      description: "Bright creative studio perfect for photo shoots and art projects.",
    },
    {
      id: 3,
      name: "Meeting Room Complex",
      type: "Meeting Room",
      location: "Queens, NY",
      capacity: 12,
      hourlyRate: 45,
      dailyRate: 320,
      status: "maintenance",
      rating: 4.7,
      reviews: 64,
      occupancy: 82,
      amenities: ["WiFi", "Projector", "Whiteboard", "AC"],
      image: "/placeholder.svg?height=200&width=300",
      description: "Professional meeting rooms with state-of-the-art presentation equipment.",
    },
  ])

  const [selectedSpace, setSelectedSpace] = useState(null)
  const [isAddingSpace, setIsAddingSpace] = useState(false)
  const [isEditingSpace, setIsEditingSpace] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [newSpace, setNewSpace] = useState({
    name: "",
    type: "",
    location: "",
    capacity: "",
    hourlyRate: "",
    dailyRate: "",
    description: "",
    amenities: [],
  })

  const spaceTypes = ["Co-Working", "Studio", "Meeting Room", "Event Space", "Office", "Workshop"]
  const amenityOptions = [
    "WiFi",
    "Coffee",
    "Parking",
    "AC",
    "Projector",
    "Whiteboard",
    "Equipment",
    "Natural Light",
    "Kitchen",
    "Printer",
  ]

  const filteredSpaces = spaces.filter((space) => {
    const matchesSearch =
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || space.type === filterType
    const matchesStatus = filterStatus === "all" || space.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddSpace = () => {
    if (!newSpace.name || !newSpace.type || !newSpace.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const space = {
      id: spaces.length + 1,
      ...newSpace,
      capacity: Number.parseInt(newSpace.capacity),
      hourlyRate: Number.parseFloat(newSpace.hourlyRate),
      dailyRate: Number.parseFloat(newSpace.dailyRate),
      status: "active",
      rating: 0,
      reviews: 0,
      occupancy: 0,
      image: "/placeholder.svg?height=200&width=300",
    }

    setSpaces([...spaces, space])
    setNewSpace({
      name: "",
      type: "",
      location: "",
      capacity: "",
      hourlyRate: "",
      dailyRate: "",
      description: "",
      amenities: [],
    })
    setIsAddingSpace(false)
    toast({
      title: "Space Added",
      description: "Your new space has been added successfully.",
    })
  }

  const handleEditSpace = (space) => {
    setSelectedSpace(space)
    setNewSpace({
      name: space.name,
      type: space.type,
      location: space.location,
      capacity: space.capacity.toString(),
      hourlyRate: space.hourlyRate.toString(),
      dailyRate: space.dailyRate.toString(),
      description: space.description,
      amenities: space.amenities,
    })
    setIsEditingSpace(true)
  }

  const handleUpdateSpace = () => {
    const updatedSpaces = spaces.map((space) =>
      space.id === selectedSpace.id
        ? {
            ...space,
            ...newSpace,
            capacity: Number.parseInt(newSpace.capacity),
            hourlyRate: Number.parseFloat(newSpace.hourlyRate),
            dailyRate: Number.parseFloat(newSpace.dailyRate),
          }
        : space,
    )
    setSpaces(updatedSpaces)
    setIsEditingSpace(false)
    setSelectedSpace(null)
    toast({
      title: "Space Updated",
      description: "Space details have been updated successfully.",
    })
  }

  const toggleSpaceStatus = (spaceId) => {
    const updatedSpaces = spaces.map((space) =>
      space.id === spaceId ? { ...space, status: space.status === "active" ? "inactive" : "active" } : space,
    )
    setSpaces(updatedSpaces)
    toast({
      title: "Status Updated",
      description: "Space status has been changed.",
    })
  }

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "WiFi":
        return <WifiIcon className="h-3 w-3" />
      case "Coffee":
        return <CoffeeIcon className="h-3 w-3" />
      case "Parking":
        return <CarIcon className="h-3 w-3" />
      case "AC":
        return <AirVentIcon className="h-3 w-3" />
      default:
        return <span className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Spaces</h1>
          <p className="text-gray-600">Manage your space listings and availability</p>
        </div>
        <Dialog open={isAddingSpace} onOpenChange={setIsAddingSpace}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Space
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Space</DialogTitle>
              <DialogDescription>Create a new space listing for your community</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Space Name *</Label>
                <Input
                  id="name"
                  value={newSpace.name}
                  onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                  placeholder="Enter space name"
                />
              </div>
              <div>
                <Label htmlFor="type">Space Type *</Label>
                <Select value={newSpace.type} onValueChange={(value) => setNewSpace({ ...newSpace, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {spaceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newSpace.location}
                  onChange={(e) => setNewSpace({ ...newSpace, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newSpace.capacity}
                  onChange={(e) => setNewSpace({ ...newSpace, capacity: e.target.value })}
                  placeholder="Max people"
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={newSpace.hourlyRate}
                  onChange={(e) => setNewSpace({ ...newSpace, hourlyRate: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="dailyRate">Daily Rate ($)</Label>
                <Input
                  id="dailyRate"
                  type="number"
                  value={newSpace.dailyRate}
                  onChange={(e) => setNewSpace({ ...newSpace, dailyRate: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSpace.description}
                  onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                  placeholder="Describe your space..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddingSpace(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSpace}>Add Space</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search spaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {spaceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpaces.map((space) => (
          <Card key={space.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={space.image || "/placeholder.svg"} alt={space.name} className="w-full h-48 object-cover" />
              <Badge
                className={`absolute top-2 right-2 ${
                  space.status === "active"
                    ? "bg-green-500"
                    : space.status === "maintenance"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                }`}
              >
                {space.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{space.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3" />
                    {space.location}
                  </p>
                </div>
                <Badge variant="outline">{space.type}</Badge>
              </div>

              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <UsersIcon className="h-3 w-3" />
                  {space.capacity}
                </span>
                <span className="flex items-center gap-1">
                  <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {space.rating} ({space.reviews})
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {space.amenities.slice(0, 4).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </div>
                ))}
                {space.amenities.length > 4 && (
                  <span className="text-xs text-gray-500">+{space.amenities.length - 4} more</span>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-lg font-semibold text-green-600">${space.hourlyRate}/hr</span>
                  <span className="text-sm text-gray-500 ml-2">${space.dailyRate}/day</span>
                </div>
                <span className="text-sm text-gray-600">{space.occupancy}% occupied</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => toast({ title: "Viewing Space", description: `Opening ${space.name} details...` })}
                >
                  <EyeIcon className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditSpace(space)}>
                  <EditIcon className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => toggleSpaceStatus(space.id)}>
                  {space.status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Space Dialog */}
      <Dialog open={isEditingSpace} onOpenChange={setIsEditingSpace}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Space</DialogTitle>
            <DialogDescription>Update your space details</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Space Name *</Label>
              <Input
                id="edit-name"
                value={newSpace.name}
                onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Space Type *</Label>
              <Select value={newSpace.type} onValueChange={(value) => setNewSpace({ ...newSpace, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {spaceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-location">Location *</Label>
              <Input
                id="edit-location"
                value={newSpace.location}
                onChange={(e) => setNewSpace({ ...newSpace, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-capacity">Capacity</Label>
              <Input
                id="edit-capacity"
                type="number"
                value={newSpace.capacity}
                onChange={(e) => setNewSpace({ ...newSpace, capacity: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="edit-hourlyRate"
                type="number"
                value={newSpace.hourlyRate}
                onChange={(e) => setNewSpace({ ...newSpace, hourlyRate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-dailyRate">Daily Rate ($)</Label>
              <Input
                id="edit-dailyRate"
                type="number"
                value={newSpace.dailyRate}
                onChange={(e) => setNewSpace({ ...newSpace, dailyRate: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newSpace.description}
                onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditingSpace(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSpace}>Update Space</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
