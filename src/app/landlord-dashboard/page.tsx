"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BuildingIcon,
  CalendarIcon,
  DollarSignIcon,
  UsersIcon,
  TrendingUpIcon,
  MapPinIcon,
  StarIcon,
  MessageSquareIcon,
  PlusIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ActivityIcon,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SpacePartnerDashboard() {
  const [quickActions, setQuickActions] = useState({
    addRoom: false,
    viewBookings: false,
    checkRevenue: false,
  })

  const [animatedValues, setAnimatedValues] = useState({
    spaces: 0,
    bookings: 0,
    revenue: 0,
    members: 0,
  })

  // Animate numbers on load
  useEffect(() => {
    const targets = { spaces: 24, bookings: 156, revenue: 45230, members: 1234 }
    const duration = 2000
    const steps = 60

    const intervals = Object.keys(targets).map((key) => {
      const target = targets[key]
      const increment = target / steps
      let current = 0

      return setInterval((interval) => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(intervals.find((i) => i === interval))
        }
        setAnimatedValues((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, duration / steps)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  const handleQuickAction = (action: string) => {
    setQuickActions((prev) => ({ ...prev, [action]: true }))
    toast({
      title: "Action Initiated",
      description: `${action.replace(/([A-Z])/g, " $1").toLowerCase()} process started.`,
    })
    setTimeout(() => {
      setQuickActions((prev) => ({ ...prev, [action]: false }))
    }, 2000)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between animate-in slide-in-from-top duration-500">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-800 to-amber-700 bg-clip-text text-transparent">
            Welcome back, Alex!
          </h1>
          <p className="text-orange-700 text-lg mt-2">Here's what's happening with your rooms today.</p>
        </div>
        <Button
          onClick={() => handleQuickAction("addRoom")}
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Room
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Rooms",
            value: animatedValues.spaces,
            change: "+2",
            changeType: "increase",
            icon: BuildingIcon,
            color: "orange",
            description: "from last month",
          },
          {
            title: "Active Bookings",
            value: animatedValues.bookings,
            change: "+12%",
            changeType: "increase",
            icon: CalendarIcon,
            color: "blue",
            description: "from last week",
          },
          {
            title: "Monthly Revenue",
            value: `$${animatedValues.revenue.toLocaleString()}`,
            change: "+8.2%",
            changeType: "increase",
            icon: DollarSignIcon,
            color: "green",
            description: "from last month",
          },
          {
            title: "Total Clients",
            value: animatedValues.members.toLocaleString(),
            change: "+15",
            changeType: "increase",
            icon: UsersIcon,
            color: "purple",
            description: "new this week",
          },
        ].map((metric, index) => (
          <Card
            key={metric.title}
            className={`border-l-4 border-l-${metric.color}-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-in slide-in-from-bottom`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">{metric.title}</CardTitle>
              <metric.icon className={`h-5 w-5 text-${metric.color}-600`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
              <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                {metric.changeType === "increase" ? (
                  <ArrowUpIcon className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 text-red-600" />
                )}
                <span className={metric.changeType === "increase" ? "text-green-600" : "text-red-600"}>
                  {metric.change}
                </span>
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Top Performing Spaces */}
          <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUpIcon className="h-6 w-6 text-orange-600" />
                Top Performing Rooms
              </CardTitle>
              <CardDescription className="text-orange-700">Your highest earning spaces this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Downtown Business Hub",
                    location: "Manhattan, NY",
                    revenue: "$8,450",
                    occupancy: 95,
                    rating: 4.9,
                    trend: "up",
                  },
                  {
                    name: "Executive Meeting Center",
                    location: "Brooklyn, NY",
                    revenue: "$6,230",
                    occupancy: 88,
                    rating: 4.8,
                    trend: "up",
                  },
                  {
                    name: "Corporate Conference Suite",
                    location: "Queens, NY",
                    revenue: "$5,890",
                    occupancy: 82,
                    rating: 4.7,
                    trend: "stable",
                  },
                ].map((space, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-orange-100 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-300 transform hover:scale-102 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center shadow-md">
                        <BuildingIcon className="h-7 w-7 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{space.name}</h3>
                        <p className="text-sm text-orange-700 flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {space.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600 text-lg">{space.revenue}</div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Progress value={space.occupancy} className="w-16 h-2" />
                          <span className="font-medium">{space.occupancy}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{space.rating}</span>
                        </div>
                        {space.trend === "up" && <TrendingUpIcon className="h-3 w-3 text-green-500" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-6 border-orange-200 text-orange-700 hover:bg-orange-50 transition-all duration-300"
                onClick={() => handleQuickAction("viewBookings")}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                View All Rooms
              </Button>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-left delay-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
                Recent Bookings
              </CardTitle>
              <CardDescription className="text-orange-700">Latest space reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "Sarah Johnson",
                    company: "Tech Innovations Inc.",
                    space: "Downtown Business Hub",
                    time: "2 hours ago",
                    amount: "$245",
                    status: "confirmed",
                    duration: "Full Day",
                  },
                  {
                    user: "Mike Chen",
                    company: "Creative Solutions LLC",
                    space: "Executive Meeting Center",
                    time: "4 hours ago",
                    amount: "$420",
                    status: "pending",
                    duration: "Half Day",
                  },
                  {
                    user: "Emma Davis",
                    company: "Global Consulting Group",
                    space: "Corporate Conference Suite",
                    time: "6 hours ago",
                    amount: "$180",
                    status: "confirmed",
                    duration: "4 Hours",
                  },
                ].map((booking, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-orange-100 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-orange-200">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 font-semibold">
                          {booking.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-gray-900">{booking.user}</p>
                        <p className="text-sm text-orange-600 font-medium">{booking.company}</p>
                        <p className="text-xs text-gray-600">
                          {booking.space} • {booking.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600 text-lg">{booking.amount}</div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={booking.status === "confirmed" ? "default" : "secondary"}
                          className={`text-xs ${booking.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {booking.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{booking.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
              <CardDescription className="text-orange-700">Manage your business efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: PlusIcon, label: "Add New Room", action: "addRoom" },
                { icon: CalendarIcon, label: "View All Bookings", action: "viewBookings" },
                { icon: DollarSignIcon, label: "Check Revenue", action: "checkRevenue" },
                { icon: MessageSquareIcon, label: "View Messages", action: "messages" },
              ].map((item, index) => (
                <Button
                  key={item.action}
                  className="w-full justify-start bg-gradient-to-r from-orange-50 to-amber-50 text-orange-800 border border-orange-200 hover:from-orange-100 hover:to-amber-100 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  variant="outline"
                  onClick={() =>
                    item.action === "messages"
                      ? toast({ title: "Messages", description: "Opening messages..." })
                      : handleQuickAction(item.action)
                  }
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Community Activity */}
          <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right delay-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ActivityIcon className="h-6 w-6 text-orange-600" />
                Rooms Activity
              </CardTitle>
              <CardDescription className="text-orange-700">Recent member interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "Lisa Park", company: "StartUp Ventures", action: "joined Business Hub", time: "1h ago" },
                  { user: "Tom Wilson", company: "Design Studio Pro", action: "left a 5-star review", time: "2h ago" },
                  {
                    user: "Anna Smith",
                    company: "Marketing Experts",
                    action: "booked Executive Center",
                    time: "3h ago",
                  },
                  { user: "David Lee", company: "Tech Consultancy", action: "joined community", time: "4h ago" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-orange-200">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 font-semibold text-sm">
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-bold text-gray-900">{activity.user}</span>
                        <span className="text-orange-600 text-xs ml-1">({activity.company})</span>
                      </p>
                      <p className="text-sm text-gray-700">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right delay-200">
            <CardHeader>
              <CardTitle className="text-xl">This Month's Performance</CardTitle>
              <CardDescription className="text-orange-700">Key business metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Occupancy Rate", value: 87, color: "bg-orange-500" },
                { label: "Customer Satisfaction", value: 96, color: "bg-green-500" },
                { label: "Revenue Goal", value: 90, color: "bg-blue-500" },
              ].map((metric, index) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700">{metric.label}</span>
                    <span className="text-gray-900">
                      {metric.label === "Customer Satisfaction"
                        ? "4.8/5"
                        : metric.label === "Revenue Goal"
                          ? "$45K/$50K"
                          : `${metric.value}%`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
