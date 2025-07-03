import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CalendarIcon,
  CreditCardIcon,
  WrenchIcon,
  AlertTriangleIcon,
  PackageIcon,
  HomeIcon,
  DollarSignIcon,
  ClockIcon,
} from "lucide-react"

export default function TenantDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-800 via-amber-700 to-orange-700 p-8 text-white shadow-xl">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
              <p className="text-white-700 text-lg">Here's what's happening with your space</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Lease expires in 4 months
              </Badge>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-blue-700">Next Rent Due</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <CreditCardIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">$1,200</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <ClockIcon className="h-3 w-3 mr-1" />
              Due in 5 days
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-orange-700">Maintenance</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg">
              <WrenchIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">2</div>
            <p className="text-xs text-orange-600">1 pending, 1 in progress</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-green-700">My Storage</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <PackageIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">1</div>
            <p className="text-xs text-green-600">5x10 unit • 80% full</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-purple-700">Messages</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <AlertTriangleIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">3</div>
            <p className="text-xs text-purple-600">2 unread messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Payments */}
        <Card className="lg:col-span-2 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <DollarSignIcon className="h-5 w-5" />
              Recent Payments
            </CardTitle>
            <CardDescription>Your payment history and upcoming dues</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-semibold text-green-900">December Rent</p>
                <p className="text-sm text-green-700">Paid on Dec 1, 2024</p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-300">$1,200</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-semibold text-gray-900">November Rent</p>
                <p className="text-sm text-gray-700">Paid on Nov 1, 2024</p>
              </div>
              <Badge variant="secondary">$1,200</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-semibold text-gray-900">Storage Unit</p>
                <p className="text-sm text-gray-700">Paid on Nov 1, 2024</p>
              </div>
              <Badge variant="secondary">$85</Badge>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md">
              View All Payments
            </Button>
          </CardContent>
        </Card>

        {/* Maintenance & Storage */}
        <div className="space-y-6">
          {/* Maintenance Requests */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <WrenchIcon className="h-5 w-5" />
                Maintenance
              </CardTitle>
              <CardDescription>Track your service requests</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-yellow-900">Kitchen Faucet</p>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">In Progress</Badge>
                  </div>
                  <p className="text-sm text-yellow-700 mb-2">Submitted 2 days ago</p>
                  <Progress value={60} className="h-2 bg-yellow-200" />
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">AC Maintenance</p>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Submitted 1 week ago</p>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
              <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50">
                Submit New Request
              </Button>
            </CardContent>
          </Card>

          {/* Storage Unit */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <PackageIcon className="h-5 w-5" />
                My Storage
              </CardTitle>
              <CardDescription>Unit 5x10 • Building A</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-700">Space Used</span>
                  <span className="text-sm text-green-600">80%</span>
                </div>
                <Progress value={80} className="h-3 bg-green-100" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Monthly Rate</p>
                    <p className="font-semibold text-green-900">$85</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Access Hours</p>
                    <p className="font-semibold text-green-900">24/7</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                Manage Storage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Property Info */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <HomeIcon className="h-5 w-5" />
            Your Rental Property
          </CardTitle>
          <CardDescription>123 Main Street, Apt 4B, New York, NY 10001</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-700">Monthly Rent</p>
              <p className="text-2xl font-bold text-blue-900">$1,200</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-700">Security Deposit</p>
              <p className="text-2xl font-bold text-green-900">$1,200</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm font-medium text-purple-700">Lease Term</p>
              <p className="text-2xl font-bold text-purple-900">12 months</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
