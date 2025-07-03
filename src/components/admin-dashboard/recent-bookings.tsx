import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const bookings = [
  {
    title: "Garage Storage",
    user: "Alice Johnson",
    date: "04/17/2024",
    status: "Confirmed",
  },
  {
    title: "Downtown Studio",
    user: "John Smith",
    date: "04/15/2024",
    status: "Cancelled",
  },
  {
    title: "Beachside Apartment",
    user: "Sara Brown",
    date: "04/10/2024",
    status: "Confirmed",
  },
  {
    title: "Suburban House",
    user: "Michael Wilson",
    date: "04/08/2024",
    status: "Confirmed",
  },
]

export function RecentBookings() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Button variant="link" className="text-blue-600 gap-1 p-0 h-auto">
          View <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{booking.title}</TableCell>
                <TableCell>{booking.user}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
