"use client"

import { useState } from "react"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/admin-dashboard/page-header"
import { DateRangePicker } from "@/components/admin-dashboard/date-range-picker"
import { AnalyticsOverview } from "@/components/admin-dashboard/analytics-overview"
import { AnalyticsBookings } from "@/components/admin-dashboard/analytics-bookings"
import { AnalyticsRevenue } from "@/components/admin-dashboard/analytics-revenue"
import { AnalyticsUsers } from "@/components/admin-dashboard/analytics-users"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 5, 1),
    to: new Date(2025, 5, 30),
  })
  const [activeTab, setActiveTab] = useState("overview")

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range)
  }

  return (
    <>
      <PageHeader
        title="Analytics"
        description="View detailed performance metrics and reports"
        actions={
          <div className="flex items-center gap-3">
            <DateRangePicker date={dateRange} onDateChange={handleDateRangeChange} />
            <Button variant="outline" className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <AnalyticsOverview dateRange={dateRange} />
          </TabsContent>
          <TabsContent value="bookings">
            <AnalyticsBookings dateRange={dateRange} />
          </TabsContent>
          <TabsContent value="revenue">
            <AnalyticsRevenue dateRange={dateRange} />
          </TabsContent>
          <TabsContent value="users">
            <AnalyticsUsers dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
