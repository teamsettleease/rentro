"use client"

import { useState } from "react"
import { CalendarIcon, ListIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingsTable } from "@/components/admin-dashboard/bookings-table"
import { BookingsCalendar } from "@/components/admin-dashboard/bookings-calendar"
import { PageHeader } from "@/components/admin-dashboard/page-header"
import { BookingsFilter } from "@/components/admin-dashboard/bookings-filter"

export default function BookingsPage() {
  const [activeFilters, setActiveFilters] = useState({})
  const [view, setView] = useState("table")

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters)
    // In a real app, you would filter the data here
    console.log("Filters applied:", filters)
  }

  return (
    <>
      <PageHeader
        title="Bookings"
        description="Manage all property bookings and reservations"
        actions={
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            New Booking
          </Button>
        }
      />
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <BookingsFilter onFilterChange={handleFilterChange} />

              <Tabs defaultValue="table" value={view} onValueChange={setView} className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="table" className="flex items-center gap-1">
                      <ListIcon className="h-4 w-4" />
                      List
                    </TabsTrigger>
                    <TabsTrigger value="calendar" className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      Calendar
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">120 bookings</span>
                  </div>
                </div>
                <TabsContent value="table" className="mt-4">
                  <BookingsTable filters={activeFilters} />
                </TabsContent>
                <TabsContent value="calendar" className="mt-4">
                  <BookingsCalendar filters={activeFilters} />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
