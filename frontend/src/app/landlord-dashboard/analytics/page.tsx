"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3Icon,
  TrendingUpIcon,
  UsersIcon,
  CalendarIcon,
  StarIcon,
  ClockIcon,
  ActivityIcon,
  EyeIcon,
  DownloadIcon,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("thisMonth")
  const [selectedMetric, setSelectedMetric] = useState("occupancy")

  const analyticsData = {
    occupancy: {
      current: 87,
      previous: 82,
      trend: "up",
      spaces: [
        { name: "Downtown Business Hub", rate: 95, bookings: 63 },
        { name: "Executive Meeting Center", rate: 88, bookings: 52 },
        { name: "Corporate Conference Suite", rate: 82, bookings: 41 },
      ],
    },
    satisfaction: {
      current: 4.8,
      previous: 4.6,
      trend: "up",
      breakdown: [
        { rating: 5, count: 89, percentage: 68 },
        { rating: 4, count: 32, percentage: 24 },
        { rating: 3, count: 8, percentage: 6 },
        { rating: 2, count: 2, percentage: 2 },
        { rating: 1, count: 0, percentage: 0 },
      ],
    },
    usage: {
      peakHours: [
        { hour: "9:00 AM", usage: 85 },
        { hour: "10:00 AM", usage: 92 },
        { hour: "11:00 AM", usage: 88 },
        { hour: "2:00 PM", usage: 95 },
        { hour: "3:00 PM", usage: 90 },
      ],
      peakDays: [
        { day: "Monday", usage: 88 },
        { day: "Tuesday", usage: 92 },
        { day: "Wednesday", usage: 95 },
        { day: "Thursday", usage: 89 },
        { day: "Friday", usage: 85 },
      ],
    },
  }

  const customerInsights = [
    {
      segment: "Corporate Clients",
      percentage: 45,
      avgSpend: 420,
      frequency: "Weekly",
      growth: 12.5,
    },
    {
      segment: "Startups",
      percentage: 30,
      avgSpend: 180,
      frequency: "Bi-weekly",
      growth: 8.7,
    },
    {
      segment: "Freelancers",
      percentage: 25,
      avgSpend: 95,
      frequency: "Monthly",
      growth: 15.2,
    },
  ]

  const competitorAnalysis = [
    {
      competitor: "WeWork",
      marketShare: 35,
      avgPrice: 350,
      rating: 4.2,
    },
    {
      competitor: "Regus",
      marketShare: 28,
      avgPrice: 320,
      rating: 4.0,
    },
    {
      competitor: "Your Business",
      marketShare: 15,
      avgPrice: 290,
      rating: 4.8,
    },
  ]

  const handleExportAnalytics = () => {
    toast({
      title: "Export Started",
      description: "Analytics report is being generated...",
    })
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between animate-in slide-in-from-top duration-500">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-800 to-amber-700 bg-clip-text text-transparent">
            Business Analytics
          </h1>
          <p className="text-orange-700 text-lg mt-2">
            Deep insights into your space performance and customer behavior
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleExportAnalytics}
            className="border-orange-200 text-orange-700 hover:bg-orange-50 transition-all duration-300"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Analytics
          </Button>
          <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <EyeIcon className="h-4 w-4 mr-2" />
            Live Dashboard
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="animate-in slide-in-from-top duration-500 delay-100">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
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
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="occupancy">Occupancy Rate</SelectItem>
                <SelectItem value="satisfaction">Customer Satisfaction</SelectItem>
                <SelectItem value="revenue">Revenue Performance</SelectItem>
                <SelectItem value="usage">Usage Patterns</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Occupancy Rate",
            value: "87%",
            change: "+5%",
            icon: BarChart3Icon,
            color: "orange",
          },
          {
            title: "Customer Satisfaction",
            value: "4.8/5",
            change: "+0.2",
            icon: StarIcon,
            color: "yellow",
          },
          {
            title: "Repeat Customers",
            value: "68%",
            change: "+12%",
            icon: UsersIcon,
            color: "blue",
          },
          {
            title: "Avg Session Time",
            value: "4.2h",
            change: "+0.5h",
            icon: ClockIcon,
            color: "green",
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

      {/* Main Analytics */}
      <Tabs defaultValue="occupancy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-orange-50 border border-orange-200">
          <TabsTrigger value="occupancy" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Occupancy
          </TabsTrigger>
          <TabsTrigger
            value="satisfaction"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Satisfaction
          </TabsTrigger>
          <TabsTrigger value="usage" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Usage Patterns
          </TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Customers
          </TabsTrigger>
          <TabsTrigger value="competition" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Competition
          </TabsTrigger>
        </TabsList>

        <TabsContent value="occupancy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3Icon className="h-5 w-5 text-orange-600" />
                  Space Occupancy Rates
                </CardTitle>
                <CardDescription>Current month performance by space</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.occupancy.spaces.map((space, index) => (
                    <div key={space.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{space.name}</span>
                        <span className="text-gray-900">
                          {space.rate}% ({space.bookings} bookings)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${space.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Occupancy Trends</CardTitle>
                <CardDescription>Monthly comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">87%</div>
                  <p className="text-gray-600 mb-4">Current occupancy rate</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>This Month</span>
                      <span className="font-semibold text-orange-600">87%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Month</span>
                      <span className="text-gray-600">82%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>3 Months Ago</span>
                      <span className="text-gray-600">79%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  Rating Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.satisfaction.breakdown.map((rating, index) => (
                    <div key={rating.rating} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{rating.rating}</span>
                        <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${rating.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">{rating.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Customer Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">4.8</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on 131 reviews</p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">"Excellent facilities and professional environment"</p>
                    <p className="text-xs text-green-600 mt-1">- Corporate Client</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">"Perfect for our team meetings and presentations"</p>
                    <p className="text-xs text-blue-600 mt-1">- Startup Team</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-orange-600" />
                  Peak Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.usage.peakHours.map((hour, index) => (
                    <div key={hour.hour} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{hour.hour}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full"
                            style={{ width: `${hour.usage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">{hour.usage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-orange-600" />
                  Peak Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.usage.peakDays.map((day, index) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{day.day}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full"
                            style={{ width: `${day.usage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">{day.usage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid gap-6">
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-orange-600" />
                  Customer Segments
                </CardTitle>
                <CardDescription>Analysis of your customer base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {customerInsights.map((segment, index) => (
                    <div
                      key={segment.segment}
                      className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">{segment.segment}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Market Share</span>
                          <span className="font-medium">{segment.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg Spend</span>
                          <span className="font-medium">${segment.avgSpend}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Frequency</span>
                          <span className="font-medium">{segment.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Growth</span>
                          <span className="font-medium text-green-600">+{segment.growth}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competition" className="space-y-6">
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="h-5 w-5 text-orange-600" />
                Competitive Analysis
              </CardTitle>
              <CardDescription>How you compare to competitors in your market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitorAnalysis.map((competitor, index) => (
                  <div
                    key={competitor.competitor}
                    className="flex items-center justify-between p-4 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          competitor.competitor === "Your Business"
                            ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {competitor.competitor === "Your Business" ? "YB" : competitor.competitor.substring(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{competitor.competitor}</h4>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{competitor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{competitor.marketShare}% market share</div>
                      <div className="text-sm text-gray-600">Avg: ${competitor.avgPrice}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
