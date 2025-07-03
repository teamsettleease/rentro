"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  BuildingIcon,
  UsersIcon,
  CalendarIcon,
  DollarSignIcon,
  BarChart3Icon,
  MessageSquareIcon,
  HandshakeIcon,
  MapPinIcon,
  SettingsIcon,
  BellIcon,
  UserIcon,
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
    url: "/landlord-dashboard",
  },
  {
    title: "My Spaces",
    icon: BuildingIcon,
    url: "/landlord-dashboard/spaces",
  },
  {
    title: "Bookings",
    icon: CalendarIcon,
    url: "/landlord-dashboard/bookings",
  },
  {
    title: "Community",
    icon: UsersIcon,
    url: "/landlord-dashboard/community",
  },
  {
    title: "Partners",
    icon: HandshakeIcon,
    url: "/landlord-dashboard/partners",
  },
  {
    title: "Revenue",
    icon: DollarSignIcon,
    url: "/landlord-dashboard/revenue",
  },
  {
    title: "Analytics",
    icon: BarChart3Icon,
    url: "/landlord-dashboard/analytics",
  },
  {
    title: "Messages",
    icon: MessageSquareIcon,
    url: "/landlord-dashboard/messages",
  },
  {
    title: "Locations",
    icon: MapPinIcon,
    url: "/landlord-dashboard/locations",
  },
]

const accountItems = [
  {
    title: "Notifications",
    icon: BellIcon,
    url: "/landlord-dashboard/notifications",
  },
  {
    title: "My Profile",
    icon: UserIcon,
    url: "/landlord-dashboard/profile",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    url: "/landlord-dashboard/settings",
  },
]

export function SpacePartnerSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      className="border-r bg-gradient-to-b from-orange-950 via-orange-900 to-amber-900 shadow-2xl"
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-to-b from-orange-950 via-orange-900 to-amber-900 overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-200 text-xs font-semibold px-3 py-2 tracking-wide uppercase">
            Business Management
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
                        <span className="text-sm font-medium">{item.title}</span>
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
              {accountItems.map((item) => {
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
