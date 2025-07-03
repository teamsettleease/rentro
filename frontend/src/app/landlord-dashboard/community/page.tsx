"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  UsersIcon,
  PlusIcon,
  MessageSquareIcon,
  CalendarIcon,
  StarIcon,
  TrendingUpIcon,
  UserPlusIcon,
  MailIcon,
  MapPinIcon,
  BellIcon,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function CommunityPage() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2023-08-15",
      status: "active",
      membershipType: "premium",
      totalBookings: 24,
      totalSpent: 2400,
      favoriteSpaces: ["Downtown Co-Working Hub", "Creative Studio Space"],
      lastActivity: "2024-01-14",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      notes: "Regular customer, prefers morning slots",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@example.com",
      phone: "+1 (555) 234-5678",
      joinDate: "2023-09-22",
      status: "active",
      membershipType: "standard",
      totalBookings: 18,
      totalSpent: 1800,
      favoriteSpaces: ["Creative Studio Space"],
      lastActivity: "2024-01-13",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      notes: "Photographer, often books for extended sessions",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1 (555) 345-6789",
      joinDate: "2023-10-10",
      status: "inactive",
      membershipType: "basic",
      totalBookings: 8,
      totalSpent: 640,
      favoriteSpaces: ["Meeting Room Complex"],
      lastActivity: "2023-12-20",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      notes: "Corporate client, books meeting rooms",
    },
  ])

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Community Networking Event",
      date: "2024-01-20",
      time: "18:00",
      location: "Downtown Co-Working Hub",
      attendees: 25,
      maxAttendees: 30,
      type: "networking",
      description: "Monthly networking event for community members",
    },
    {
      id: 2,
      title: "Creative Workshop",
      date: "2024-01-25",
      time: "14:00",
      location: "Creative Studio Space",
      attendees: 12,
      maxAttendees: 15,
      type: "workshop",
      description: "Photography and design workshop for beginners",
    },
  ])

  const [selectedMember, setSelectedMember] = useState(null)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMembership, setFilterMembership] = useState("all")

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    type: "",
    description: "",
  })

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || member.status === filterStatus
    const matchesMembership = filterMembership === "all" || member.membershipType === filterMembership
    return matchesSearch && matchesStatus && matchesMembership
  })

  const handleMemberAction = (memberId, action) => {
    const updatedMembers = members.map((member) => {
      if (member.id === memberId) {
        switch (action) {
          case "activate":
            return { ...member, status: "active" }
          case "deactivate":
            return { ...member, status: "inactive" }
          default:
            return member
        }
      }
      return member
    })
    setMembers(updatedMembers)
    toast({
      title: "Member Updated",
      description: `Member has been ${action}d successfully.`,
    })
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const event = {
      id: events.length + 1,
      ...newEvent,
      maxAttendees: Number.parseInt(newEvent.maxAttendees),
      attendees: 0,
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: "",
      type: "",
      description: "",
    })
    setIsAddingEvent(false)
    toast({
      title: "Event Created",
      description: "Community event has been created successfully.",
    })
  }

  const getMembershipColor = (type) => {
    switch (type) {
      case "premium":
        return "bg-purple-500"
      case "standard":
        return "bg-blue-500"
      case "basic":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status) => {
    return status === "active" ? "bg-green-500" : "bg-red-500"
  }

  const activeMembers = members.filter((m) => m.status === "active").length
  const totalRevenue = members.reduce((sum, m) => sum + m.totalSpent, 0)
  const avgRating = members.reduce((sum, m) => sum + m.rating, 0) / members.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Management</h1>
          <p className="text-gray-600">Manage your community members and events</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Community Event</DialogTitle>
                <DialogDescription>Organize an event for your community members</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Select
                    value={newEvent.location}
                    onValueChange={(value) => setNewEvent({ ...newEvent, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Downtown Co-Working Hub">Downtown Co-Working Hub</SelectItem>
                      <SelectItem value="Creative Studio Space">Creative Studio Space</SelectItem>
                      <SelectItem value="Meeting Room Complex">Meeting Room Complex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxAttendees">Max Attendees</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={newEvent.maxAttendees}
                      onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Event Type</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Event description..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>Create Event</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <MailIcon className="h-4 w-4 mr-2" />
            Send Newsletter
          </Button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold">{members.length}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold">{activeMembers}</p>
              </div>
              <UserPlusIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Community Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
              </div>
              <StarIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterMembership} onValueChange={setFilterMembership}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Members List */}
          <div className="grid gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>Joined {member.joinDate}</span>
                          <span>{member.totalBookings} bookings</span>
                          <span>${member.totalSpent} spent</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                        <Badge className={getMembershipColor(member.membershipType)}>{member.membershipType}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{member.rating}</span>
                      </div>
                    </div>
                  </div>

                  {member.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{member.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">Last activity: {member.lastActivity}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedMember(member)}>
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toast({ title: "Message", description: `Opening chat with ${member.name}...` })}
                      >
                        <MessageSquareIcon className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      {member.status === "active" ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleMemberAction(member.id, "deactivate")}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleMemberAction(member.id, "activate")}
                        >
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {event.date} at {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <UsersIcon className="h-3 w-3" />
                          {event.attendees}/{event.maxAttendees} attendees
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit Event
                      </Button>
                      <Button variant="outline" size="sm">
                        <BellIcon className="h-3 w-3 mr-1" />
                        Notify Members
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Growth</CardTitle>
                <CardDescription>New members over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Member growth chart would go here
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Membership Distribution</CardTitle>
                <CardDescription>Breakdown by membership type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Premium</span>
                    <span className="font-semibold">1 member</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Standard</span>
                    <span className="font-semibold">1 member</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Basic</span>
                    <span className="font-semibold">1 member</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Member Profile Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Member Profile</DialogTitle>
            <DialogDescription>Detailed member information</DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedMember.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedMember.name}</h3>
                  <p className="text-gray-600">{selectedMember.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getStatusColor(selectedMember.status)}>{selectedMember.status}</Badge>
                    <Badge className={getMembershipColor(selectedMember.membershipType)}>
                      {selectedMember.membershipType}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phone</Label>
                  <p className="mt-1">{selectedMember.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Join Date</Label>
                  <p className="mt-1">{selectedMember.joinDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Total Bookings</Label>
                  <p className="mt-1 font-semibold">{selectedMember.totalBookings}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Total Spent</Label>
                  <p className="mt-1 font-semibold text-green-600">${selectedMember.totalSpent}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Rating</Label>
                  <div className="flex items-center gap-1 mt-1">
                    <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedMember.rating}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Last Activity</Label>
                  <p className="mt-1">{selectedMember.lastActivity}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Favorite Spaces</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedMember.favoriteSpaces.map((space, index) => (
                    <Badge key={index} variant="outline">
                      {space}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedMember.notes && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Notes</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedMember.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedMember(null)}>
                  Close
                </Button>
                <Button>
                  <MessageSquareIcon className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
