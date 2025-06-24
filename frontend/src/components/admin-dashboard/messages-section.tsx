"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const messages = [
  {
    name: "Emily Davis",
    message: "Booking Inquiry",
    time: "2 hours ago",
    avatar: "ED",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "David Martinez",
    message: "Listing Activation Request",
    time: "1 day ago",
    avatar: "DM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Jessica Lee",
    message: "Payment Issue",
    time: "3 days ago",
    avatar: "JL",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Daniel Taylor",
    message: "New Storage Listing",
    time: "5 days ago",
    avatar: "DT",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const allMessages = [
  ...messages,
  {
    name: "Sarah Wilson",
    message: "Property Maintenance Request",
    time: "1 week ago",
    avatar: "SW",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Brown",
    message: "Lease Renewal Inquiry",
    time: "1 week ago",
    avatar: "MB",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Lisa Chen",
    message: "Security Deposit Question",
    time: "2 weeks ago",
    avatar: "LC",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Robert Johnson",
    message: "Move-out Notice",
    time: "2 weeks ago",
    avatar: "RJ",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function MessagesSection() {
  const [expanded, setExpanded] = useState(false)
  const displayMessages = expanded ? allMessages : messages

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Messages</CardTitle>
        <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "View all"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className={`space-y-4 ${expanded ? "max-h-96 overflow-y-auto" : ""}`}>
          {displayMessages.map((message, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={message.image || "/placeholder.svg"} alt={message.name} />
                <AvatarFallback className="bg-gray-100 text-gray-600">{message.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{message.name}</p>
                <p className="text-sm text-gray-600">{message.message}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{message.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
