"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  CreditCardIcon,
  WrenchIcon,
  FileTextIcon,
  MessageSquareIcon,
  UserIcon,
  BellIcon,
  SettingsIcon,
  PackageIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    url: "/tenant-dashboard",
  },
  {
    title: "Rent & Payments",
    icon: CreditCardIcon,
    url: "/tenant-dashboard/payments",
  },
  {
    title: "My Storage",
    icon: PackageIcon,
    url: "/tenant-dashboard/storage",
  },
  {
    title: "Maintenance",
    icon: WrenchIcon,
    url: "/tenant-dashboard/maintenance",
  },
  {
    title: "Documents",
    icon: FileTextIcon,
    url: "/tenant-dashboard/documents",
  },
  {
    title: "Messages",
    icon: MessageSquareIcon,
    url: "/tenant-dashboard/messages",
  },
  {
    title: "Notifications",
    icon: BellIcon,
    url: "/tenant-dashboard/notifications",
  },
]

const profileItems = [
  {
    title: "My Profile",
    icon: UserIcon,
    url: "/tenant-dashboard/profile",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    url: "/tenant-dashboard/settings",
  },
]

export function TenantSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0 bg-gradient-to-b from-orange-950 via-orange-900 to-amber-900 shadow-2xl" collapsible="icon">
      <SidebarContent className="bg-gradient-to-b from-orange-950 via-orange-900 to-amber-900 overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-200 text-xs font-semibold px-3 py-2 tracking-wide uppercase">
            My Space
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 mx-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-white hover:bg-orange-800/60 data-[active=true]:bg-gradient-to-r data-[active=true]:from-orange-600 data-[active=true]:to-amber-600 data-[active=true]:text-white data-[active=true]:shadow-lg py-2.5 px-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-orange-700/50 mx-3 my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-200 text-xs font-semibold px-3 py-2 tracking-wide uppercase">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 mx-1">
              {profileItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-white hover:bg-orange-800/60 data-[active=true]:bg-gradient-to-r data-[active=true]:from-orange-600 data-[active=true]:to-amber-600 data-[active=true]:text-white data-[active=true]:shadow-lg py-2.5 px-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span className="text-sm font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
