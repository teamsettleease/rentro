"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  DollarSignIcon,
  CheckIcon,
  XIcon,
  MessageSquareIcon,
  EyeIcon,
  FilterIcon,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function BookingsPage() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      user: "Sarah Johnson",
      userEmail: "sarah@example.com",
      space: "Downtown Co-Working Hub",
      date: "2024-01-15",
      startTime: "09:00",
      endTime: "17:00",
      duration: "8 hours",
      amount: 200,
      status: "confirmed",
      paymentStatus: "paid",
      notes: "Team meeting and workshop session",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      user: "Mike Chen",
      userEmail: "mike@example.com",
      space: "Creative Studio Space",
      date: "2024-01-16",
      startTime: "14:00",
      endTime: "18:00",
      duration: "4 hours",
      amount: 140,
      status: "pending",
      paymentStatus: "pending",
      notes: "Photography session for product catalog",
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      user: "Emma Davis",
      userEmail: "emma@example.com",
      space: "Meeting Room Complex",
      date: "2024-01-17",
      startTime: "10:00",
      endTime: "12:00",
      duration: "2 hours",
      amount: 90,
      status: "confirmed",
      paymentStatus: "paid",
      notes: "Client presentation",
      createdAt: "2024-01-11",
    },
    {
      id: 4,
      user: "Alex Rodriguez",
      userEmail: "alex@example.com",
      space: "Downtown Co-Working Hub",
      date: "2024-01-18",
      startTime: "13:00",
      endTime: "15:00",
      duration: "2 hours",
      amount: 50,
      status: "cancelled",
      paymentStatus: "refunded",
      notes: "Cancelled due to schedule conflict",
      createdAt: "2024-01-13",
    },
  ])

  const [selectedBooking, setSelectedBooking] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSpace, setFilterSpace] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())

  const spaces = ["Downtown Co-Working Hub", "Creative Studio Space", "Meeting Room Complex"]

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.space.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus
    const matchesSpace = filterSpace === "all" || booking.space === filterSpace
    return matchesSearch && matchesStatus && matchesSpace
  })

  const handleBookingAction = (bookingId, action) => {
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === bookingId) {
        switch (action) {
          case "approve":
            return { ...booking, status: "confirmed" }
          case "reject":
            return { ...booking, status: "cancelled" }
          case "cancel":
            return { ...booking, status: "cancelled", paymentStatus: "refunded" }
          default:
            return booking
        }
      }
      return booking
    })
    setBookings(updatedBookings)
    toast({
      title: "Booking Updated",
      description: `Booking has been ${action}d successfully.`,
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "refunded":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const todayBookings = bookings.filter((booking) => booking.date === new Date().toISOString().split("T")[0])
  const upcomingBookings = bookings.filter((booking) => new Date(booking.date) > new Date())
  const pendingBookings = bookings.filter((booking) => booking.status === "pending")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-600">Manage space reservations and customer bookings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button variant="outline">
            <FilterIcon className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                <p className="text-2xl font-bold">{todayBookings.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold">{pendingBookings.length}</p>
              </div>
              <UserIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${bookings.reduce((sum, b) => sum + b.amount, 0)}</p>
              </div>
              <DollarSignIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search bookings..."
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSpace} onValueChange={setFilterSpace}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Spaces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Spaces</SelectItem>
                {spaces.map((space) => (
                  <SelectItem key={space} value={space}>
                    {space}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>
                          {booking.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{booking.user}</h3>
                        <p className="text-sm text-gray-600">{booking.userEmail}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="h-3 w-3" />
                            {booking.space}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        <Badge className={getPaymentStatusColor(booking.paymentStatus)}>{booking.paymentStatus}</Badge>
                      </div>
                      <div className="text-lg font-semibold text-green-600">${booking.amount}</div>
                      <div className="text-sm text-gray-500">{booking.duration}</div>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{booking.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">Booked on {booking.createdAt}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                        <EyeIcon className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toast({ title: "Message", description: `Opening chat with ${booking.user}...` })}
                      >
                        <MessageSquareIcon className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      {booking.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleBookingAction(booking.id, "approve")}
                          >
                            <CheckIcon className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBookingAction(booking.id, "reject")}
                          >
                            <XIcon className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {booking.status === "confirmed" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleBookingAction(booking.id, "cancel")}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid gap-4">
            {pendingBookings.map((booking) => (
              <Card key={booking.id} className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>
                          {booking.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{booking.user}</h3>
                        <p className="text-sm text-gray-600">{booking.space}</p>
                        <p className="text-sm text-gray-500">
                          {booking.date} • {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleBookingAction(booking.id, "approve")}
                      >
                        <CheckIcon className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleBookingAction(booking.id, "reject")}>
                        <XIcon className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="today">
          <div className="grid gap-4">
            {todayBookings.map((booking) => (
              <Card key={booking.id} className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>
                          {booking.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{booking.user}</h3>
                        <p className="text-sm text-gray-600">{booking.space}</p>
                        <p className="text-sm text-gray-500">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="grid gap-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>
                          {booking.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{booking.user}</h3>
                        <p className="text-sm text-gray-600">{booking.space}</p>
                        <p className="text-sm text-gray-500">
                          {booking.date} • {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      <div className="text-lg font-semibold text-green-600 mt-1">${booking.amount}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Complete information about this booking</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Customer</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>
                        {selectedBooking.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedBooking.user}</p>
                      <p className="text-sm text-gray-600">{selectedBooking.userEmail}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Space</Label>
                  <p className="mt-1 font-medium">{selectedBooking.space}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Date & Time</Label>
                  <p className="mt-1">{selectedBooking.date}</p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.startTime} - {selectedBooking.endTime}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Duration & Amount</Label>
                  <p className="mt-1">{selectedBooking.duration}</p>
                  <p className="text-lg font-semibold text-green-600">${selectedBooking.amount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <div className="flex gap-2 mt-1">
                    <Badge className={getStatusColor(selectedBooking.status)}>{selectedBooking.status}</Badge>
                    <Badge className={getPaymentStatusColor(selectedBooking.paymentStatus)}>
                      {selectedBooking.paymentStatus}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Booked On</Label>
                  <p className="mt-1">{selectedBooking.createdAt}</p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Notes</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedBooking.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  Close
                </Button>
                <Button
                  onClick={() =>
                    toast({ title: "Message", description: `Opening chat with ${selectedBooking.user}...` })
                  }
                >
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
