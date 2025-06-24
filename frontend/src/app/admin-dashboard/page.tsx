import { DashboardHeader } from "@/components/admin-dashboard/dashboard-header"
import { ListingsTable } from "@/components/admin-dashboard/listings-table"
import { MessagesSection } from "@/components/admin-dashboard/messages-section"
import { MetricCards } from "@/components/admin-dashboard/metric-cards"
import { QuickStats } from "@/components/admin-dashboard/quick-stats"
import { RecentBookings } from "@/components/admin-dashboard/recent-bookings"
import { SystemAlerts } from "@/components/admin-dashboard/system-alerts"
import { UserRolesChart } from "@/components/admin-dashboard/user-roles-chart"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <div className="flex-1 overflow-auto">
        <MetricCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <ListingsTable />
              <QuickStats />
            </div>
            <RecentBookings />
          </div>
          <div className="space-y-6">
            <UserRolesChart />
            <MessagesSection />
            <SystemAlerts />
          </div>
        </div>
      </div>
    </>
  )
}
