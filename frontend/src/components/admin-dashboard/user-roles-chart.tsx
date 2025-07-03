"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Tenants", value: 45, color: "#3b82f6" },
  { name: "Landlords", value: 30, color: "#f59e0b" },
  { name: "Admins", value: 15, color: "#6366f1" },
  { name: "Frotal", value: 10, color: "#6b7280" },
]

export function UserRolesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Roles</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
