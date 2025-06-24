"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AnalyticsRevenueProps {
  dateRange: { from: Date; to: Date }
}

export function AnalyticsRevenue({ dateRange }: AnalyticsRevenueProps) {
  const revenueStats = [
    { label: "Total Revenue", value: "$156,420", change: "+18%", trend: "up" },
    { label: "Monthly Recurring", value: "$89,340", change: "+12%", trend: "up" },
    { label: "Average Booking", value: "$1,245", change: "+5%", trend: "up" },
    { label: "Commission Earned", value: "$15,642", change: "+22%", trend: "up" },
  ]

  const topProperties = [
    { name: "Downtown Studio", revenue: "$24,800", bookings: 16 },
    { name: "Beachfront Villa", revenue: "$19,200", bookings: 8 },
    { name: "Modern Loft", revenue: "$16,800", bookings: 6 },
    { name: "Lakeside Cottage", revenue: "$13,200", bookings: 12 },
    { name: "Historic Townhouse", revenue: "$11,600", bookings: 8 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueStats.map((stat, index) => (
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
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Revenue trends chart would go here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Revenue Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProperties.map((property, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{property.name}</p>
                    <p className="text-sm text-gray-500">{property.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{property.revenue}</p>
                    <p className="text-sm text-gray-500">This month</p>
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
