import { CalendarIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    type: "booking",
    title: "New booking confirmed",
    description: "Downtown Studio - Alice Johnson",
    time: "2 minutes ago",
    icon: CheckCircleIcon,
    iconColor: "text-green-600",
  },
  {
    type: "listing",
    title: "Listing updated",
    description: "Beachside Apartment - Price changed",
    time: "15 minutes ago",
    icon: CalendarIcon,
    iconColor: "text-blue-600",
  },
  {
    type: "cancellation",
    title: "Booking cancelled",
    description: "Suburban House - John Smith",
    time: "1 hour ago",
    icon: XCircleIcon,
    iconColor: "text-red-600",
  },
  {
    type: "pending",
    title: "Approval pending",
    description: "New storage listing - Review required",
    time: "2 hours ago",
    icon: ClockIcon,
    iconColor: "text-yellow-600",
  },
  {
    type: "booking",
    title: "Payment received",
    description: "Garage Storage - $150.00",
    time: "3 hours ago",
    icon: CheckCircleIcon,
    iconColor: "text-green-600",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`p-2 rounded-full bg-gray-100 ${activity.iconColor}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
