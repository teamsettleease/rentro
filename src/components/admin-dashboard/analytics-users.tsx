"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserRolesChart } from "@/components/admin-dashboard/user-roles-chart"

interface AnalyticsUsersProps {
  dateRange: { from: Date; to: Date }
}

export function AnalyticsUsers({ dateRange }: AnalyticsUsersProps) {
  const userStats = [
    { label: "Total Users", value: "2,847", change: "+15%", trend: "up" },
    { label: "Active Users", value: "2,156", change: "+12%", trend: "up" },
    { label: "New Signups", value: "234", change: "+28%", trend: "up" },
    { label: "User Retention", value: "87%", change: "+3%", trend: "up" },
  ]

  const userActivity = [
    { action: "New user registration", user: "Alice Johnson", time: "2 min ago" },
    { action: "Property booking", user: "John Smith", time: "15 min ago" },
    { action: "Profile updated", user: "Sara Brown", time: "1 hour ago" },
    { action: "New listing created", user: "Michael Wilson", time: "2 hours ago" },
    { action: "Payment completed", user: "Emily Davis", time: "3 hours ago" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
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
        <UserRolesChart />

        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{activity.time}</p>
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
