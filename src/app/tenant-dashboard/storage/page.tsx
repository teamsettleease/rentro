"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  PackageIcon,
  ThermometerIcon,
  ShieldIcon,
  ClockIcon,
  CameraIcon,
  KeyIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StoragePage() {
  const [items, setItems] = useState([
    { id: 1, name: "Winter Clothes", category: "Clothing", addedDate: "Dec 1, 2024" },
    { id: 2, name: "Holiday Decorations", category: "Seasonal", addedDate: "Nov 15, 2024" },
    { id: 3, name: "Old Furniture", category: "Furniture", addedDate: "Oct 20, 2024" },
  ])
  const [newItem, setNewItem] = useState({ name: "", category: "", description: "" })
  const { toast } = useToast()
  const [deletedItems, setDeletedItems] = useState<Array<{ item: any; timestamp: number }>>([])

  const addItem = () => {
    if (newItem.name) {
      setItems([
        ...items,
        {
          id: items.length + 1,
          name: newItem.name,
          category: newItem.category || "Other",
          addedDate: new Date().toLocaleDateString(),
        },
      ])
      setNewItem({ name: "", category: "", description: "" })
      toast({
        title: "Item Added",
        description: `${newItem.name} has been added to your storage inventory.`,
      })
    }
  }

  const removeItem = (id: number) => {
    const itemToDelete = items.find((item) => item.id === id)
    if (itemToDelete) {
      setItems(items.filter((item) => item.id !== id))
      setDeletedItems((prev) => [...prev, { item: itemToDelete, timestamp: Date.now() }])

      toast({
        title: "Item Removed",
        description: "Item has been removed from your storage inventory.",
        action: (
          <Button variant="outline" size="sm" onClick={() => undoDelete(itemToDelete)}>
            Undo
          </Button>
        ),
      })

      // Auto-remove from deleted items after 10 seconds
      setTimeout(() => {
        setDeletedItems((prev) => prev.filter((deleted) => deleted.item.id !== id))
      }, 10000)
    }
  }

  const undoDelete = (item: any) => {
    setItems((prev) => [...prev, item])
    setDeletedItems((prev) => prev.filter((deleted) => deleted.item.id !== item.id))
    toast({
      title: "Item Restored",
      description: `${item.name} has been restored to your inventory.`,
    })
  }

  const requestAccess = () => {
    toast({
      title: "Access Requested",
      description: "Your storage access request has been sent. You'll receive a confirmation shortly.",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-900 to-amber-700 bg-clip-text text-transparent">
            My Storage
          </h2>
          <p className="text-gray-600 mt-1">Manage your storage unit and inventory</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={requestAccess}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <KeyIcon className="h-4 w-4 mr-2" />
            Request Access
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Storage Item</DialogTitle>
                <DialogDescription>Keep track of what you store</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    placeholder="e.g., Furniture, Clothing, Electronics"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Additional details about the item"
                  />
                </div>
                <Button onClick={addItem} className="w-full">
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Storage Unit Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-purple-700">Unit Size</CardTitle>
            <PackageIcon className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">5x10</div>
            <p className="text-xs text-purple-600">50 sq ft • Building A</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-blue-700">Climate Control</CardTitle>
            <ThermometerIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">72°F</div>
            <p className="text-xs text-blue-600">Humidity: 45%</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-green-700">Security</CardTitle>
            <ShieldIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">24/7</div>
            <p className="text-xs text-green-600">Monitored & Secure</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-orange-700">Access Hours</CardTitle>
            <ClockIcon className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">24/7</div>
            <p className="text-xs text-orange-600">Keypad Access</p>
          </CardContent>
        </Card>
      </div>

      {/* Storage Details */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="access">Access Log</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PackageIcon className="h-5 w-5 text-purple-600" />
                  Storage Utilization
                </CardTitle>
                <CardDescription>How much space you're using</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Space Used</span>
                    <span>40 sq ft (80%)</span>
                  </div>
                  <Progress value={80} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Monthly Rate</p>
                    <p className="font-semibold text-purple-900">$85</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Unit Number</p>
                    <p className="font-semibold text-purple-900">A-127</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CameraIcon className="h-5 w-5 text-blue-600" />
                  Unit Photos
                </CardTitle>
                <CardDescription>Recent photos of your storage unit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <CameraIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <CameraIcon className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {
                    toast({
                      title: "Camera Opened",
                      description: "Camera interface opened to take a new photo.",
                    })
                  }}
                >
                  Take New Photo
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Storage Inventory</CardTitle>
              <CardDescription>Keep track of items in your storage unit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-xs text-gray-500">Added: {item.addedDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Edit Item",
                          description: `Editing ${item.name}...`,
                        })
                      }}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <PackageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No items in your inventory yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Access History</CardTitle>
              <CardDescription>Recent visits to your storage unit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { date: "Dec 15, 2024", time: "2:30 PM", duration: "45 minutes" },
                { date: "Dec 10, 2024", time: "11:15 AM", duration: "1 hour 20 minutes" },
                { date: "Dec 5, 2024", time: "4:45 PM", duration: "30 minutes" },
                { date: "Nov 28, 2024", time: "9:20 AM", duration: "2 hours" },
              ].map((access, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <p className="font-semibold text-gray-900">{access.date}</p>
                    <p className="text-sm text-gray-600">Accessed at {access.time}</p>
                  </div>
                  <Badge variant="secondary">{access.duration}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Storage Billing</CardTitle>
              <CardDescription>Your storage unit payment history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { month: "December 2024", amount: "$85", status: "Paid", date: "Dec 1, 2024" },
                { month: "November 2024", amount: "$85", status: "Paid", date: "Nov 1, 2024" },
                { month: "October 2024", amount: "$85", status: "Paid", date: "Oct 1, 2024" },
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <p className="font-semibold text-gray-900">{payment.month}</p>
                    <p className="text-sm text-gray-600">Paid on {payment.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-900">{payment.amount}</p>
                    <Badge className="bg-green-100 text-green-800">{payment.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
