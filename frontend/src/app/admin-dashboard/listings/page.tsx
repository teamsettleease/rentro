"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListingsFilter } from "@/components/admin-dashboard/listings-filter"
import { ListingsTable } from "@/components/admin-dashboard/listings-table-advanced"
import { ListingsGrid } from "@/components/admin-dashboard/listings-grid"
import { ListingsMap } from "@/components/admin-dashboard/listings-map"
import { PageHeader } from "@/components/admin-dashboard/page-header"

export default function ListingsPage() {
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
        title="Listings"
        description="Manage all your property listings"
        actions={
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Listing
          </Button>
        }
      />
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Property Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ListingsFilter onFilterChange={handleFilterChange} />

              <Tabs defaultValue="table" value={view} onValueChange={setView} className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="table">Table</TabsTrigger>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="map">Map</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">15 listings</span>
                  </div>
                </div>
                <TabsContent value="table" className="mt-4">
                  <ListingsTable filters={activeFilters} />
                </TabsContent>
                <TabsContent value="grid" className="mt-4">
                  <ListingsGrid filters={activeFilters} />
                </TabsContent>
                <TabsContent value="map" className="mt-4">
                  <ListingsMap filters={activeFilters} />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
