"use client"

import { useState } from "react"
import { UserPlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/admin-dashboard/users-table"
import { PageHeader } from "@/components/admin-dashboard/page-header"
import { UsersFilter } from "@/components/admin-dashboard/users-filter"

export default function UsersPage() {
  const [activeFilters, setActiveFilters] = useState({})
  const [activeTab, setActiveTab] = useState("all")

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters)
    // In a real app, you would filter the data here
    console.log("Filters applied:", filters)
  }

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage users, tenants, and administrators"
        actions={
          <Button className="flex items-center gap-2">
            <UserPlusIcon className="h-4 w-4" />
            Add User
          </Button>
        }
      />
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <UsersFilter onFilterChange={handleFilterChange} />

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="all">All Users</TabsTrigger>
                    <TabsTrigger value="tenants">Tenants</TabsTrigger>
                    <TabsTrigger value="landlords">Landlords</TabsTrigger>
                    <TabsTrigger value="admins">Admins</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">832 users</span>
                  </div>
                </div>
                <TabsContent value="all" className="mt-4">
                  <UsersTable filters={activeFilters} userType="all" />
                </TabsContent>
                <TabsContent value="tenants" className="mt-4">
                  <UsersTable filters={activeFilters} userType="tenant" />
                </TabsContent>
                <TabsContent value="landlords" className="mt-4">
                  <UsersTable filters={activeFilters} userType="landlord" />
                </TabsContent>
                <TabsContent value="admins" className="mt-4">
                  <UsersTable filters={activeFilters} userType="admin" />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
