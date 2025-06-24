"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCards } from "@/components/admin-dashboard/metric-cards"
import { ChartAreaInteractive } from "@/components/admin-dashboard/chart-area-interactive"
import { RefreshCwIcon, DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnalyticsOverviewProps {
  dateRange: { from: Date; to: Date }
}

export function AnalyticsOverview({ dateRange }: AnalyticsOverviewProps) {
  const handleRefreshData = () => {
    console.log("Refreshing analytics data...")
    // In a real app, you would refresh the data
  }

  const handleExportData = () => {
    console.log("Exporting analytics data...")
    // In a real app, you would export the data
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Analytics Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCwIcon className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <DownloadIcon className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
      <MetricCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartAreaInteractive />
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Downtown Studio</p>
                  <p className="text-sm text-gray-500">New York, NY</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1,600/mo</p>
                  <p className="text-sm text-green-600">95% occupancy</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Beachfront Villa</p>
                  <p className="text-sm text-gray-500">Miami, FL</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$2,400/mo</p>
                  <p className="text-sm text-green-600">92% occupancy</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Modern Loft</p>
                  <p className="text-sm text-gray-500">Seattle, WA</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$2,800/mo</p>
                  <p className="text-sm text-green-600">88% occupancy</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
