import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin-dashboard/app-sidebar"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
    <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="lg:hidden" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
