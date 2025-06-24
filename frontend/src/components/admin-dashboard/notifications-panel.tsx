"use client"

import type React from "react"

import { useState } from "react"
import {
  BellIcon,
  CheckIcon,
  ClockIcon,
  DollarSignIcon,
  HomeIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const notifications = [
  {
    id: 1,
    type: "booking",
    title: "New Booking Request",
    message: "Alice Johnson requested to book Downtown Studio for June 10-17",
    time: "2 minutes ago",
    read: false,
    icon: HomeIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    message: "$1,200 payment received for Beachfront Villa booking",
    time: "15 minutes ago",
    read: false,
    icon: DollarSignIcon,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    message: "John Smith sent you a message about property availability",
    time: "1 hour ago",
    read: true,
    icon: MessageSquareIcon,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: 4,
    type: "user",
    title: "New User Registration",
    message: "Sara Brown just created an account and is browsing properties",
    time: "2 hours ago",
    read: true,
    icon: UserIcon,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: 5,
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance will begin tonight at 2:00 AM EST",
    time: "3 hours ago",
    read: false,
    icon: SettingsIcon,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
  {
    id: 6,
    type: "booking",
    title: "Booking Cancelled",
    message: "Michael Wilson cancelled his booking for City Center Studio",
    time: "1 day ago",
    read: true,
    icon: XIcon,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    id: 7,
    type: "payment",
    title: "Payout Processed",
    message: "$850 payout has been processed to your account",
    time: "1 day ago",
    read: true,
    icon: DollarSignIcon,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 8,
    type: "booking",
    title: "Check-in Reminder",
    message: "Guest Emma Davis will check in tomorrow at 3:00 PM",
    time: "2 days ago",
    read: false,
    icon: HomeIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

export function NotificationsPanel() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [activeTab, setActiveTab] = useState("all")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogPage, setDialogPage] = useState(1)
  const notificationsPerPage = 5

  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id))
  }

  const filteredNotifications = notificationList.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // For dialog pagination
  const startIndex = (dialogPage - 1) * notificationsPerPage
  const endIndex = startIndex + notificationsPerPage
  const paginatedNotifications = notificationList.slice(startIndex, endIndex)
  const totalPages = Math.ceil(notificationList.length / notificationsPerPage)

  const handleDialogPageChange = (newPage: number) => {
    setDialogPage(newPage)
  }

  const openDialog = () => {
    // Close dropdown first to prevent UI freeze
    setIsDropdownOpen(false)
    // Small delay to ensure dropdown is closed before opening dialog
    setTimeout(() => {
      setDialogOpen(true)
      setDialogPage(1) // Reset to first page when opening
    }, 100)
  }

  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openDialog()
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs flex items-center justify-center p-0 border-0">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-96 p-0">
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 mx-4 mb-4">
                  <TabsTrigger value="all" className="text-xs">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">
                    Unread
                  </TabsTrigger>
                  <TabsTrigger value="booking" className="text-xs">
                    Bookings
                  </TabsTrigger>
                  <TabsTrigger value="system" className="text-xs">
                    System
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-0">
                  <ScrollArea className="h-96">
                    <div className="space-y-1">
                      {filteredNotifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          <BellIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No notifications</p>
                        </div>
                      ) : (
                        filteredNotifications.slice(0, 6).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${notification.bgColor}`}>
                                <notification.icon className={`h-4 w-4 ${notification.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className={`font-medium text-sm ${!notification.read ? "text-blue-900" : ""}`}>
                                    {notification.title}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    {!notification.read && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          markAsRead(notification.id)
                                        }}
                                      >
                                        <CheckIcon className="h-3 w-3" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteNotification(notification.id)
                                      }}
                                    >
                                      <XIcon className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <ClockIcon className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                  {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button variant="ghost" className="w-full justify-center" onClick={handleViewAll}>
              View All Notifications
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          // Reset page when closing dialog
          if (!open) setDialogPage(1)
        }}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>All Notifications</DialogTitle>
            <DialogDescription>Manage all your notifications here.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{notificationList.length} Total</Badge>
              <Badge variant="destructive">{unreadCount} Unread</Badge>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark All Read
              </Button>
            )}
          </div>
          <ScrollArea className="h-[400px]">
            <div className="divide-y divide-border">
              {paginatedNotifications.map((notification) => (
                <div key={notification.id} className="py-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${notification.bgColor}`}>
                      <notification.icon className={`h-4 w-4 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium text-sm ${!notification.read ? "text-blue-900" : ""}`}>
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckIcon className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <XIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <ClockIcon className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <Button
              variant="outline"
              disabled={dialogPage === 1}
              onClick={() => handleDialogPageChange(dialogPage - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {dialogPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={dialogPage === totalPages}
              onClick={() => handleDialogPageChange(dialogPage + 1)}
            >
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
