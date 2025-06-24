"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AnalyticsBookingsProps {
  dateRange: { from: Date; to: Date }
}

export function AnalyticsBookings({ dateRange }: AnalyticsBookingsProps) {
  const bookingStats = [
    { label: "Total Bookings", value: "1,245", change: "+12%", trend: "up" },
    { label: "Confirmed", value: "987", change: "+8%", trend: "up" },
    { label: "Pending", value: "156", change: "+25%", trend: "up" },
    { label: "Cancelled", value: "102", change: "-5%", trend: "down" },
  ]

  const recentBookings = [
    {
      id: 1,
      property: "Downtown Studio",
      guest: "Alice Johnson",
      checkIn: "2025-06-10",
      amount: "$1,200",
      status: "Confirmed",
    },
    {
      id: 2,
      property: "Beachfront Villa",
      guest: "John Smith",
      checkIn: "2025-07-15",
      amount: "$2,400",
      status: "Pending",
    },
    {
      id: 3,
      property: "Mountain View Cabin",
      guest: "Sara Brown",
      checkIn: "2025-05-01",
      amount: "$950",
      status: "Completed",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bookingStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    stat.trend === "up"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }
                >
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Booking trends chart would go here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{booking.property}</p>
                    <p className="text-sm text-gray-500">{booking.guest}</p>
                    <p className="text-sm text-gray-500">{booking.checkIn}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{booking.amount}</p>
                    <Badge
                      variant="outline"
                      className={
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
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
    </div>
  )
}
