import { BuildingIcon, CalendarIcon, DollarSignIcon, UsersIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const metrics = [
  {
    title: "Total Listings",
    value: "358",
    icon: BuildingIcon,
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    title: "Total Bookings",
    value: "1,245",
    icon: CalendarIcon,
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Users",
    value: "832",
    icon: UsersIcon,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Total Revenue",
    value: "$56,478",
    icon: DollarSignIcon,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className={`${metric.bgColor} border-0`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${metric.iconColor} bg-white/50`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
