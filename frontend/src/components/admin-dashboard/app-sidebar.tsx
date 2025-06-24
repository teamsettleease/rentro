"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3Icon,
  BuildingIcon,
  CalendarIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  UsersIcon,
  SettingsIcon,
  HelpCircleIcon,
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
    icon: LayoutDashboardIcon,
    url: "/admin-dashboard/dashboard",
  },
  {
    title: "Listings",
    icon: BuildingIcon,
    url: "/admin-dashboard/listings",
  },
  {
    title: "Bookings",
    icon: CalendarIcon,
    url: "/admin-dashboard/bookings",
  },
  {
    title: "Users",
    icon: UsersIcon,
    url: "/admin-dashboard/users",
  },
  {
    title: "Messages",
    icon: MessageSquareIcon,
    url: "/admin-dashboard/messages",
  },
  {
    title: "Analytics",
    icon: BarChart3Icon,
    url: "/admin-dashboard/analytics",
  },
]

const settingsItems = [
  {
    title: "Settings",
    icon: SettingsIcon,
    url: "/admin-dashboard/settings",
  },
  {
    title: "Help & Support",
    icon: HelpCircleIcon,
    url: "/admin-dashboard/help",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r bg-[#2c3e50]" collapsible="icon">
      <SidebarContent className="bg-[#2c3e50] overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-white hover:bg-slate-600 data-[active=true]:bg-slate-600 data-[active=true]:text-white"
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-slate-600/50" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-white hover:bg-slate-600 data-[active=true]:bg-slate-600 data-[active=true]:text-white"
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
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
