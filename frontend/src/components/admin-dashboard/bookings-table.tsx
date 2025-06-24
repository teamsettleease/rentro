"use client"

import { useState, useCallback } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  XIcon,
  DownloadIcon,
  MailIcon,
  PrinterIcon,
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  MessageSquareIcon,
  CreditCardIcon,
  CalendarIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const bookings = [
  {
    id: 1,
    property: "Downtown Studio",
    guest: "Alice Johnson",
    guestEmail: "alice@example.com",
    guestPhone: "+1 (555) 123-4567",
    checkIn: "2025-06-10",
    checkOut: "2025-06-17",
    status: "Confirmed",
    amount: "$1,200",
    nights: 7,
    paymentStatus: "Paid",
    bookingDate: "2025-05-15",
  },
  {
    id: 2,
    property: "Beachfront Villa",
    guest: "John Smith",
    guestEmail: "john@example.com",
    guestPhone: "+1 (555) 234-5678",
    checkIn: "2025-07-15",
    checkOut: "2025-07-22",
    status: "Pending",
    amount: "$2,400",
    nights: 7,
    paymentStatus: "Pending",
    bookingDate: "2025-05-20",
  },
  {
    id: 3,
    property: "Mountain View Cabin",
    guest: "Sara Brown",
    guestEmail: "sara@example.com",
    guestPhone: "+1 (555) 345-6789",
    checkIn: "2025-05-01",
    checkOut: "2025-05-08",
    status: "Completed",
    amount: "$950",
    nights: 7,
    paymentStatus: "Paid",
    bookingDate: "2025-04-10",
  },
  {
    id: 4,
    property: "City Center Studio",
    guest: "Michael Wilson",
    guestEmail: "michael@example.com",
    guestPhone: "+1 (555) 456-7890",
    checkIn: "2025-06-05",
    checkOut: "2025-06-12",
    status: "Cancelled",
    amount: "$780",
    nights: 7,
    paymentStatus: "Refunded",
    bookingDate: "2025-05-01",
  },
  {
    id: 5,
    property: "Lakeside Cottage",
    guest: "Emily Davis",
    guestEmail: "emily@example.com",
    guestPhone: "+1 (555) 567-8901",
    checkIn: "2025-08-10",
    checkOut: "2025-08-17",
    status: "Confirmed",
    amount: "$1,100",
    nights: 7,
    paymentStatus: "Paid",
    bookingDate: "2025-05-25",
  },
  {
    id: 6,
    property: "Modern Loft",
    guest: "David Martinez",
    guestEmail: "david@example.com",
    guestPhone: "+1 (555) 678-9012",
    checkIn: "2025-06-20",
    checkOut: "2025-06-27",
    status: "Confirmed",
    amount: "$950",
    nights: 7,
    paymentStatus: "Paid",
    bookingDate: "2025-05-18",
  },
  {
    id: 7,
    property: "Seaside Bungalow",
    guest: "Jessica Lee",
    guestEmail: "jessica@example.com",
    guestPhone: "+1 (555) 789-0123",
    checkIn: "2025-07-05",
    checkOut: "2025-07-12",
    status: "Pending",
    amount: "$1,300",
    nights: 7,
    paymentStatus: "Pending",
    bookingDate: "2025-05-22",
  },
  {
    id: 8,
    property: "Historic Townhouse",
    guest: "Daniel Taylor",
    guestEmail: "daniel@example.com",
    guestPhone: "+1 (555) 890-1234",
    checkIn: "2025-05-15",
    checkOut: "2025-05-22",
    status: "Completed",
    amount: "$1,450",
    nights: 7,
    paymentStatus: "Paid",
    bookingDate: "2025-04-20",
  },
]

interface BookingsTableProps {
  filters: any
}

export function BookingsTable({ filters }: BookingsTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>("checkIn")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const { toast } = useToast()

  const handleSort = useCallback(
    (column: string) => {
      setSortColumn((prevSortColumn) => {
        if (prevSortColumn === column) {
          setSortDirection((prevSortDirection) => (prevSortDirection === "asc" ? "desc" : "asc"))
          return column
        } else {
          setSortDirection("asc")
          return column
        }
      })
    },
    [setSortColumn, setSortDirection],
  )

  const toggleSelectAll = useCallback(() => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.length === bookings.length) {
        return []
      } else {
        return bookings.map((booking) => booking.id)
      }
    })
  }, [setSelectedRows])

  const toggleSelectRow = useCallback(
    (id: number) => {
      setSelectedRows((prevSelectedRows) => {
        if (prevSelectedRows.includes(id)) {
          return prevSelectedRows.filter((rowId) => rowId !== id)
        } else {
          return [...prevSelectedRows, id]
        }
      })
    },
    [setSelectedRows],
  )

  const handleViewBooking = useCallback((booking: any) => {
    setSelectedBooking(booking)
    setViewDialogOpen(true)
  }, [])

  const handleEditBooking = useCallback((booking: any) => {
    setSelectedBooking(booking)
    setEditDialogOpen(true)
  }, [])

  const handleCancelBooking = useCallback((booking: any) => {
    setSelectedBooking(booking)
    setCancelDialogOpen(true)
  }, [])

  const handleContactGuest = useCallback((booking: any) => {
    setSelectedBooking(booking)
    setContactDialogOpen(true)
  }, [])

  const handleConfirmBooking = useCallback(
    (booking: any) => {
      toast({
        title: "Booking Confirmed",
        description: `Booking for ${booking.guest} has been confirmed.`,
      })
    },
    [toast],
  )

  const handleCheckIn = useCallback(
    (booking: any) => {
      toast({
        title: "Check-in Processed",
        description: `${booking.guest} has been checked in.`,
      })
    },
    [toast],
  )

  const handleCheckOut = useCallback(
    (booking: any) => {
      toast({
        title: "Check-out Processed",
        description: `${booking.guest} has been checked out.`,
      })
    },
    [toast],
  )

  const handleProcessPayment = useCallback(
    (booking: any) => {
      toast({
        title: "Payment Processed",
        description: `Payment of ${booking.amount} has been processed.`,
      })
    },
    [toast],
  )

  const handleReschedule = useCallback(
    (booking: any) => {
      toast({
        title: "Reschedule Request",
        description: `Reschedule request sent for ${booking.guest}'s booking.`,
      })
    },
    [toast],
  )

  const handleBulkExport = useCallback(() => {
    const selectedBookings = bookings.filter((booking) => selectedRows.includes(booking.id))
    const dataStr = JSON.stringify(selectedBookings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `bookings-export-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: `${selectedRows.length} bookings exported successfully.`,
    })
  }, [selectedRows, toast])

  const handleBulkEmail = useCallback(() => {
    toast({
      title: "Emails Sent",
      description: `Emails sent to ${selectedRows.length} guests.`,
    })
  }, [selectedRows, toast])

  const confirmCancel = useCallback(() => {
    toast({
      title: "Booking Cancelled",
      description: `Booking for ${selectedBooking?.guest} has been cancelled.`,
    })
    setCancelDialogOpen(false)
    setSelectedBooking(null)
  }, [selectedBooking, toast])

  const saveEdit = useCallback(() => {
    toast({
      title: "Booking Updated",
      description: `Booking for ${selectedBooking?.guest} has been updated.`,
    })
    setEditDialogOpen(false)
    setSelectedBooking(null)
  }, [selectedBooking, toast])

  const sendMessage = useCallback(() => {
    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedBooking?.guest}.`,
    })
    setContactDialogOpen(false)
  }, [selectedBooking, toast])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
      case "Completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
    }
  }

  // Apply sorting
  const sortedBookings = [...bookings].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredBookings = sortedBookings

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedRows.length === bookings.length} onCheckedChange={toggleSelectAll} />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("property")}>
                <div className="flex items-center gap-1">
                  Property
                  {sortColumn === "property" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("guest")}>
                <div className="flex items-center gap-1">
                  Guest
                  {sortColumn === "guest" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("checkIn")}>
                <div className="flex items-center gap-1">
                  Check-in
                  {sortColumn === "checkIn" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("checkOut")}>
                <div className="flex items-center gap-1">
                  Check-out
                  {sortColumn === "checkOut" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Nights</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                <div className="flex items-center gap-1">
                  Amount
                  {sortColumn === "amount" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                <div className="flex items-center gap-1">
                  Status
                  {sortColumn === "status" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-2 p-4 bg-blue-50 border-b">
              <span className="text-sm text-blue-700">{selectedRows.length} selected</span>
              <Button variant="outline" size="sm" onClick={handleBulkExport}>
                <DownloadIcon className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkEmail}>
                <MailIcon className="h-4 w-4 mr-1" />
                Email Guests
              </Button>
              <Button variant="outline" size="sm">
                <PrinterIcon className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          )}
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id} className={selectedRows.includes(booking.id) ? "bg-muted/50" : ""}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(booking.id)}
                    onCheckedChange={() => toggleSelectRow(booking.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{booking.property}</TableCell>
                <TableCell>{booking.guest}</TableCell>
                <TableCell>
                  {new Date(booking.checkIn).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(booking.checkOut).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{booking.nights}</TableCell>
                <TableCell className="font-medium">{booking.amount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewBooking(booking)} className="flex items-center gap-2">
                        <EyeIcon className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleContactGuest(booking)} className="flex items-center gap-2">
                        <MessageSquareIcon className="h-4 w-4" />
                        Contact Guest
                      </DropdownMenuItem>
                      {booking.status === "Pending" && (
                        <>
                          <DropdownMenuItem
                            onClick={() => handleConfirmBooking(booking)}
                            className="flex items-center gap-2"
                          >
                            <CheckIcon className="h-4 w-4" />
                            Confirm Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditBooking(booking)}
                            className="flex items-center gap-2"
                          >
                            <PencilIcon className="h-4 w-4" />
                            Modify
                          </DropdownMenuItem>
                        </>
                      )}
                      {booking.status === "Confirmed" && (
                        <>
                          <DropdownMenuItem onClick={() => handleCheckIn(booking)} className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4" />
                            Check In
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleReschedule(booking)}
                            className="flex items-center gap-2"
                          >
                            <CalendarIcon className="h-4 w-4" />
                            Reschedule
                          </DropdownMenuItem>
                        </>
                      )}
                      {booking.paymentStatus === "Pending" && (
                        <DropdownMenuItem
                          onClick={() => handleProcessPayment(booking)}
                          className="flex items-center gap-2"
                        >
                          <CreditCardIcon className="h-4 w-4" />
                          Process Payment
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                        <DropdownMenuItem
                          onClick={() => handleCancelBooking(booking)}
                          className="flex items-center gap-2 text-red-600"
                        >
                          <XIcon className="h-4 w-4" />
                          Cancel Booking
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Booking Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Complete information about this booking</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Property</Label>
                  <p className="text-sm">{selectedBooking.property}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Guest</Label>
                  <p className="text-sm">{selectedBooking.guest}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedBooking.guestEmail}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm">{selectedBooking.guestPhone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Check-in</Label>
                  <p className="text-sm">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Check-out</Label>
                  <p className="text-sm">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Nights</Label>
                  <p className="text-sm">{selectedBooking.nights}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Amount</Label>
                  <p className="text-sm">{selectedBooking.amount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant="outline" className="w-fit">
                    {selectedBooking.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Payment Status</Label>
                  <Badge variant="outline" className="w-fit">
                    {selectedBooking.paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>Update booking information</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkIn">Check-in Date</Label>
                  <Input id="checkIn" type="date" defaultValue={selectedBooking.checkIn} />
                </div>
                <div>
                  <Label htmlFor="checkOut">Check-out Date</Label>
                  <Input id="checkOut" type="date" defaultValue={selectedBooking.checkOut} />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" defaultValue={selectedBooking.amount} />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedBooking.status.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add any notes about this booking..." />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel the booking for {selectedBooking?.guest}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Cancellation Reason</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guest-request">Guest Request</SelectItem>
                  <SelectItem value="property-unavailable">Property Unavailable</SelectItem>
                  <SelectItem value="payment-failed">Payment Failed</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Add any additional notes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={confirmCancel}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Guest Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Guest</DialogTitle>
            <DialogDescription>Send a message to {selectedBooking?.guest}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <PhoneIcon className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" className="flex-1">
                <MailIcon className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter message subject" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendMessage}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
