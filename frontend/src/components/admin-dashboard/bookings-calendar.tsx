"use client"

import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const bookings = [
  {
    id: 1,
    property: "Downtown Studio",
    guest: "Alice Johnson",
    checkIn: "2025-06-10",
    checkOut: "2025-06-17",
    status: "Confirmed",
    amount: "$1,200",
  },
  {
    id: 2,
    property: "Beachfront Villa",
    guest: "John Smith",
    checkIn: "2025-06-15",
    checkOut: "2025-06-22",
    status: "Pending",
    amount: "$2,400",
  },
  {
    id: 3,
    property: "Mountain View Cabin",
    guest: "Sara Brown",
    checkIn: "2025-06-20",
    checkOut: "2025-06-27",
    status: "Confirmed",
    amount: "$950",
  },
]

interface BookingsCalendarProps {
  filters: any
}

export function BookingsCalendar({ filters }: BookingsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)) // June 2025

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getBookingsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return bookings.filter((booking) => {
      const checkIn = new Date(booking.checkIn)
      const checkOut = new Date(booking.checkOut)
      const currentDateObj = new Date(dateStr)
      return currentDateObj >= checkIn && currentDateObj <= checkOut
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="p-2 h-24"></div>
            ))}
            {days.map((day) => {
              const dayBookings = getBookingsForDate(day)
              return (
                <div key={day} className="p-1 h-24 border rounded-md bg-white">
                  <div className="text-sm font-medium mb-1">{day}</div>
                  <div className="space-y-1">
                    {dayBookings.slice(0, 2).map((booking) => (
                      <div
                        key={booking.id}
                        className={`text-xs p-1 rounded text-white truncate ${
                          booking.status === "Confirmed"
                            ? "bg-green-500"
                            : booking.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      >
                        {booking.property}
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <div className="text-xs text-gray-500">+{dayBookings.length - 2} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">{booking.property}</p>
                  <p className="text-sm text-gray-500">{booking.guest}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.amount}</p>
                  <Badge
                    variant="outline"
                    className={
                      booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
