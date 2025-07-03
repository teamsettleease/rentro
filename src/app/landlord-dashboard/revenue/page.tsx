"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSignIcon,
  TrendingUpIcon,
  CalendarIcon,
  DownloadIcon,
  FilterIcon,
  CreditCardIcon,
  PieChartIcon,
  BarChart3Icon,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function RevenuePage() {
  const [dateRange, setDateRange] = useState("thisMonth")
  const [spaceFilter, setSpaceFilter] = useState("all")

  const revenueData = {
    thisMonth: {
      total: 45230,
      growth: 8.2,
      transactions: 156,
      avgBooking: 290,
    },
    lastMonth: {
      total: 41800,
      growth: 5.1,
      transactions: 144,
      avgBooking: 275,
    },
  }

  const spaceRevenue = [
    {
      name: "Downtown Business Hub",
      revenue: 18450,
      bookings: 63,
      growth: 12.5,
      avgRate: 293,
    },
    {
      name: "Executive Meeting Center",
      revenue: 15230,
      bookings: 52,
      growth: 8.7,
      avgRate: 293,
    },
    {
      name: "Corporate Conference Suite",
      revenue: 11550,
      bookings: 41,
      growth: 3.2,
      avgRate: 282,
    },
  ]

  const monthlyTrends = [
    { month: "Jan", revenue: 38500, bookings: 125 },
    { month: "Feb", revenue: 41200, bookings: 138 },
    { month: "Mar", revenue: 39800, bookings: 132 },
    { month: "Apr", revenue: 43600, bookings: 148 },
    { month: "May", revenue: 45230, bookings: 156 },
  ]

  const paymentMethods = [
    { method: "Credit Card", amount: 32450, percentage: 71.8 },
    { method: "Bank Transfer", amount: 8920, percentage: 19.7 },
    { method: "Digital Wallet", amount: 3860, percentage: 8.5 },
  ]

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Revenue report is being generated...",
    })
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between animate-in slide-in-from-top duration-500">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-800 to-amber-700 bg-clip-text text-transparent">
            Revenue Analytics
          </h1>
          <p className="text-orange-700 text-lg mt-2">Track your business performance and financial growth</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleExportData}
            className="border-orange-200 text-orange-700 hover:bg-orange-50 transition-all duration-300"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <FilterIcon className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="animate-in slide-in-from-top duration-500 delay-100">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="last3Months">Last 3 Months</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={spaceFilter} onValueChange={setSpaceFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Spaces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Spaces</SelectItem>
                <SelectItem value="downtown">Downtown Business Hub</SelectItem>
                <SelectItem value="executive">Executive Meeting Center</SelectItem>
                <SelectItem value="corporate">Corporate Conference Suite</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Search transactions..." className="flex-1 min-w-[200px]" />
          </div>
        </CardContent>
      </Card>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            value: `$${revenueData.thisMonth.total.toLocaleString()}`,
            change: `+${revenueData.thisMonth.growth}%`,
            icon: DollarSignIcon,
            color: "green",
          },
          {
            title: "Total Bookings",
            value: revenueData.thisMonth.transactions,
            change: "+12",
            icon: CalendarIcon,
            color: "blue",
          },
          {
            title: "Average Booking",
            value: `$${revenueData.thisMonth.avgBooking}`,
            change: "+5.4%",
            icon: TrendingUpIcon,
            color: "orange",
          },
          {
            title: "Payment Success",
            value: "98.5%",
            change: "+0.3%",
            icon: CreditCardIcon,
            color: "purple",
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
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUpIcon className="h-3 w-3" />
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-orange-50 border border-orange-200">
          <TabsTrigger value="overview" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="spaces" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            By Spaces
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Trends
          </TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3Icon className="h-5 w-5 text-orange-600" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spaceRevenue.map((space, index) => (
                    <div key={space.name} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{space.name}</h4>
                        <p className="text-sm text-gray-600">{space.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">${space.revenue.toLocaleString()}</div>
                        <div className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUpIcon className="h-3 w-3" />+{space.growth}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-orange-600" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div key={method.method} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{method.method}</span>
                        <span className="text-gray-900">
                          ${method.amount.toLocaleString()} ({method.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${method.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spaces" className="space-y-6">
          <div className="grid gap-6">
            {spaceRevenue.map((space, index) => (
              <Card key={space.name} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{space.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>{space.bookings} bookings this month</span>
                        <span>Avg rate: ${space.avgRate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">${space.revenue.toLocaleString()}</div>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <TrendingUpIcon className="h-3 w-3" />+{space.growth}% growth
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Monthly Revenue Trends</CardTitle>
              <CardDescription>Revenue and booking trends over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((month, index) => (
                  <div
                    key={month.month}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">{month.month} 2024</h4>
                      <p className="text-sm text-gray-600">{month.bookings} bookings</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${month.revenue.toLocaleString()}</div>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full"
                          style={{ width: `${(month.revenue / 50000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Payment Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">98.5%</div>
                  <p className="text-gray-600">Successful payments this month</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Successful</span>
                      <span className="text-green-600">154 payments</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Failed</span>
                      <span className="text-red-600">2 payments</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Average Transaction Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">$290</div>
                  <p className="text-gray-600">Per booking this month</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Highest</span>
                      <span className="text-green-600">$850</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Lowest</span>
                      <span className="text-orange-600">$45</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
