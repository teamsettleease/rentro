"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCardIcon,
  CalendarIcon,
  DollarSignIcon,
  DownloadIcon,
  PlusIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<string>("")
  const [paymentAmount, setPaymentAmount] = useState<string>("")
  const { toast } = useToast()

  const handlePayment = () => {
    if (!selectedPayment || !paymentAmount) {
      toast({
        title: "Error",
        description: "Please select a payment type and enter an amount.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Payment Processed",
      description: `Payment of $${paymentAmount} has been successfully processed.`,
    })

    // Reset form
    setSelectedPayment("")
    setPaymentAmount("")
  }

  const handleDownloadReceipt = (month: string) => {
    toast({
      title: "Receipt Downloaded",
      description: `${month} payment receipt has been downloaded.`,
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-900 to-amber-700 bg-clip-text text-transparent">
            Rent & Payments
          </h2>
          <p className="text-orange-700 mt-1">Manage your rent payments and payment history</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <PlusIcon className="h-4 w-4 mr-2" />
              Make Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make a Payment</DialogTitle>
              <DialogDescription>Choose what you'd like to pay for</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="payment-type">Payment Type</Label>
                <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Monthly Rent - $1,200</SelectItem>
                    <SelectItem value="storage">Storage Unit - $85</SelectItem>
                    <SelectItem value="late-fee">Late Fee - $50</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
              <Button onClick={handlePayment} className="w-full">
                Process Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Balance */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-red-700">Amount Due</CardTitle>
            <AlertCircleIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-900">$1,200</div>
            <p className="text-xs text-red-600">Due in 5 days</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-green-700">Paid This Year</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">$14,400</div>
            <p className="text-xs text-green-600">12 payments made</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-blue-700">Next Payment</CardTitle>
            <ClockIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">Jan 1</div>
            <p className="text-xs text-blue-600">Auto-pay enabled</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Tabs */}
      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSignIcon className="h-5 w-5 text-green-600" />
                Payment History
              </CardTitle>
              <CardDescription>Your complete payment record</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  month: "December 2024",
                  amount: "$1,285",
                  status: "Paid",
                  date: "Dec 1, 2024",
                  type: "Rent + Storage",
                },
                {
                  month: "November 2024",
                  amount: "$1,285",
                  status: "Paid",
                  date: "Nov 1, 2024",
                  type: "Rent + Storage",
                },
                {
                  month: "October 2024",
                  amount: "$1,285",
                  status: "Paid",
                  date: "Oct 1, 2024",
                  type: "Rent + Storage",
                },
                {
                  month: "September 2024",
                  amount: "$1,335",
                  status: "Paid",
                  date: "Sep 3, 2024",
                  type: "Rent + Storage + Late Fee",
                },
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <p className="font-semibold text-gray-900">{payment.month}</p>
                    <p className="text-sm text-gray-600">{payment.type}</p>
                    <p className="text-xs text-gray-500">{payment.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{payment.amount}</p>
                      <Badge className="bg-green-100 text-green-800">{payment.status}</Badge>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadReceipt(payment.month)}>
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                Upcoming Payments
              </CardTitle>
              <CardDescription>Scheduled and upcoming payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-semibold text-red-900">January 2025 Rent</p>
                  <p className="text-sm text-red-700">Due in 5 days</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-red-900">$1,285</p>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      setSelectedPayment("rent")
                      setPaymentAmount("1285")
                      toast({
                        title: "Payment Form Opened",
                        description: "Payment form has been pre-filled with rent amount.",
                      })
                    }}
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p className="font-semibold text-blue-900">February 2025 Rent</p>
                  <p className="text-sm text-blue-700">Auto-pay scheduled</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-blue-900">$1,285</p>
                  <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5 text-purple-600" />
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your payment methods and auto-pay settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <CreditCardIcon className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="font-semibold text-purple-900">•••• •••• •••• 4242</p>
                    <p className="text-sm text-purple-700">Expires 12/26</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Primary</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Edit Payment Method",
                        description: "Payment method editing form opened.",
                      })
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Add Payment Method",
                    description: "New payment method form opened.",
                  })
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
