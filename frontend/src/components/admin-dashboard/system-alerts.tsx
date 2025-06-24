import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, XCircleIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const alerts = [
  {
    type: "warning",
    title: "Server Maintenance",
    message: "Scheduled maintenance tonight at 2 AM",
    time: "1 hour ago",
    icon: AlertTriangleIcon,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    type: "success",
    title: "Backup Completed",
    message: "Daily backup completed successfully",
    time: "3 hours ago",
    icon: CheckCircleIcon,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    type: "info",
    title: "New Feature",
    message: "Advanced filtering now available",
    time: "1 day ago",
    icon: InfoIcon,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    type: "error",
    title: "Payment Failed",
    message: "3 payment failures detected",
    time: "2 days ago",
    icon: XCircleIcon,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
]

export function SystemAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          System Alerts
          <Badge variant="outline" className="bg-red-100 text-red-800">
            4 New
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-3 rounded-lg ${alert.bgColor} border`}>
              <div className="flex items-start gap-3">
                <div className={`p-1 rounded-full ${alert.iconColor}`}>
                  <alert.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">{alert.title}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
