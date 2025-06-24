import {
  TrendingDownIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  UsersIcon,
  CalendarIcon,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Monthly Revenue",
    value: "$45,230",
    change: "+12.5%",
    trend: "up",
    description: "vs last month",
    icon: DollarSignIcon,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-15%",
    trend: "down",
    description: "vs last week",
    icon: ClockIcon,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Occupancy Rate",
    value: "87%",
    change: "+5%",
    trend: "up",
    description: "this month",
    icon: CheckCircleIcon,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Pending Reviews",
    value: "23",
    change: "+8",
    trend: "up",
    description: "new this week",
    icon: AlertCircleIcon,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Active Users",
    value: "1,247",
    change: "+18%",
    trend: "up",
    description: "vs last month",
    icon: UsersIcon,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Bookings Today",
    value: "12",
    change: "+3",
    trend: "up",
    description: "vs yesterday",
    icon: CalendarIcon,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-100",
  },
]

const performanceMetrics = [
  { label: "Property Utilization", value: 78, color: "bg-blue-500" },
  { label: "Customer Satisfaction", value: 92, color: "bg-green-500" },
  { label: "Payment Success Rate", value: 96, color: "bg-purple-500" },
]

export function QuickStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats & Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className={`p-3 rounded-lg ${stat.bgColor} border`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-md ${stat.iconColor} bg-white`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUpIcon className="h-3 w-3" />
                    ) : (
                      <TrendingDownIcon className="h-3 w-3" />
                    )}
                    <span className="font-medium">{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Metrics */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Performance Metrics</h4>
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{metric.label}</span>
                  <span className="font-medium">{metric.value}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${metric.color}`} style={{ width: `${metric.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className="p-2 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
              View Reports
            </button>
            <button className="p-2 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
