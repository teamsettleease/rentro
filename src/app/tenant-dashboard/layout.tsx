import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { TenantSidebar } from "@/components/tenant-dashboard/tenant-siderbar"
import { Separator } from "@/components/ui/separator"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationsPanel } from "@/components/tenant-dashboard/notifications-panel"
import { Suspense } from "react"

export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <TenantSidebar />
      <SidebarInset>

        <header className="flex h-16 shrink-0 items-center justify-between gap-2 bg-orange-50 via-amber-50 border-b border-orange-200 px-4 shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-orange-800 hover:bg-orange-200 transition-colors duration-200" />
            {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
          <div className="h-4 w-px bg-orange-300" />
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">SP</span>
            </div> */}
            <span className="font-bold text-orange-900 text-lg tracking-tight">Rentro</span>
          </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 border-orange-200 focus:border-orange-300 focus:ring-orange-200"
              />
            </div> */}
            <NotificationsPanel />
            
            <Avatar className="h-10 w-10 text-orange-900 hover:bg-orange-100 hover:text-orange-600">
              <AvatarImage src="/avatar.png" alt="Admin" />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>
            
          </div>
        </header>
        <Suspense>
          <div className="flex flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-orange-50/30 via-white to-indigo-50/30 min-h-screen">
            {children}
          </div>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  )
}
