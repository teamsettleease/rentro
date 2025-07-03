"use client"

import { useState } from "react"
import {
  ChevronDownIcon,
  DownloadIcon,
  ExpandIcon,
  HelpCircleIcon,
  MoreVerticalIcon,
  PrinterIcon,
  RefreshCwIcon,
  SettingsIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationsPanel } from "@/components/admin-dashboard/notifications-panel"
import { DashboardSettingsDialog } from "@/components/admin-dashboard/dashboard-settings-dialog"
import { HelpSupportDialog } from "@/components/admin-dashboard/help-support-dialog"
import { toast } from "@/hooks/use-toast"

export function DashboardHeader() {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const exportDashboardData = () => {
    // Close dropdown first to prevent UI freeze
    setIsMenuOpen(false)

    // Simulate data export
    const dashboardData = {
      metrics: {
        totalBookings: 1234,
        totalRevenue: 45678,
        activeListings: 89,
        totalUsers: 567,
      },
      listings: [
        { id: 1, title: "Downtown Studio", status: "Active", revenue: 1200 },
        { id: 2, title: "Beachfront Villa", status: "Active", revenue: 2500 },
        // Add more sample data
      ],
      bookings: [
        { id: 1, property: "Downtown Studio", guest: "Alice Johnson", amount: 1200 },
        { id: 2, property: "Beachfront Villa", guest: "John Smith", amount: 2500 },
        // Add more sample data
      ],
      exportDate: new Date().toISOString(),
      exportedBy: "Admin User",
    }

    const dataStr = JSON.stringify(dashboardData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `dashboard-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Data Exported",
      description: "Dashboard data has been exported successfully.",
    })
  }

  const printDashboard = () => {
    // Close dropdown first to prevent UI freeze
    setIsMenuOpen(false)

    // Hide sidebar and other non-essential elements for printing
    const sidebar = document.querySelector('[data-sidebar="sidebar"]')
    const header = document.querySelector("header")

    if (sidebar) {
      sidebar.setAttribute("data-print-hidden", "true")
      sidebar.setAttribute("style", "display: none !important")
    }

    if (header) {
      header.setAttribute("data-print-hidden", "true")
      header.setAttribute("style", "display: none !important")
    }

    // Add print styles
    const printStyles = document.createElement("style")
    printStyles.id = "print-styles"
    printStyles.textContent = `
      @media print {
        body * { visibility: hidden; }
        .print-area, .print-area * { visibility: visible; }
        .print-area { position: absolute; left: 0; top: 0; width: 100%; }
        .no-print { display: none !important; }
        [data-print-hidden="true"] { display: none !important; }
      }
    `
    document.head.appendChild(printStyles)

    // Add print-area class to main content
    const mainContent = document.querySelector("main")
    if (mainContent) mainContent.classList.add("print-area")

    window.print()

    // Restore elements after printing
    setTimeout(() => {
      if (sidebar) {
        sidebar.removeAttribute("data-print-hidden")
        sidebar.removeAttribute("style")
      }

      if (header) {
        header.removeAttribute("data-print-hidden")
        header.removeAttribute("style")
      }

      if (mainContent) mainContent.classList.remove("print-area")

      const printStylesElem = document.getElementById("print-styles")
      if (printStylesElem) document.head.removeChild(printStylesElem)
    }, 1000)

    toast({
      title: "Print Initiated",
      description: "Dashboard print dialog has been opened.",
    })
  }

  const refreshData = () => {
    // Close dropdown first to prevent UI freeze
    setIsMenuOpen(false)

    // Simulate data refresh
    toast({
      title: "Refreshing Data",
      description: "Dashboard data is being refreshed...",
    })

    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated successfully.",
      })
      // In a real app, you would trigger data refetch here
      window.location.reload()
    }, 2000)
  }

  const toggleFullScreen = () => {
    // Close dropdown first to prevent UI freeze
    setIsMenuOpen(false)

    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullScreen(true)
          toast({
            title: "Full Screen Mode",
            description: "Dashboard is now in full screen mode. Press ESC to exit.",
          })
        })
        .catch((err) => {
          toast({
            title: "Full Screen Error",
            description: "Unable to enter full screen mode.",
            variant: "destructive",
          })
        })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false)
        toast({
          title: "Exited Full Screen",
          description: "Dashboard has exited full screen mode.",
        })
      })
    }
  }

  const openSettings = () => {
    // Close dropdown first to prevent UI freeze
    setIsMenuOpen(false)
    // Small delay to ensure dropdown is closed before opening dialog
    setTimeout(() => {
      setSettingsOpen(true)
    }, 100)
  }

  const openHelp = () => {
    // Close dropdown first to prevent UI freeze
    setIsMenuOpen(false)
    // Small delay to ensure dropdown is closed before opening dialog
    setTimeout(() => {
      setHelpOpen(true)
    }, 100)
  }

  return (
    <>
      <header className="flex items-center justify-between p-6 bg-white border-b">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Admin
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NotificationsPanel />

          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar.png" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>

          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVerticalIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  exportDashboardData()
                }}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export Dashboard Data
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  printDashboard()
                }}
              >
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  openSettings()
                }}
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Dashboard Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  refreshData()
                }}
              >
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Refresh Data
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  toggleFullScreen()
                }}
              >
                <ExpandIcon className="h-4 w-4 mr-2" />
                {isFullScreen ? "Exit Full Screen" : "Full Screen Mode"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  openHelp()
                }}
              >
                <HelpCircleIcon className="h-4 w-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <DashboardSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <HelpSupportDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </>
  )
}
