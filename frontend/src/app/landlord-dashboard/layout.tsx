import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { SpacePartnerSidebar } from "@/components/landlord-dashboard/landlord-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import "../globals.css";

export default function SpacePartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <SpacePartnerSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-orange-200 px-4 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 shadow-sm">
          <SidebarTrigger className="-ml-1 text-orange-800 hover:bg-orange-200 transition-colors duration-200" />
          <div className="h-4 w-px bg-orange-300" />
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">SP</span>
            </div> */}
            <span className="font-bold text-orange-900 text-lg tracking-tight">Rentro</span>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6 overflow-auto bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-orange-100/40 scroll-smooth">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
