"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  WrenchIcon,
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  MessageSquareIcon,
  CameraIcon,
  CalendarIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MaintenancePage() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Kitchen Faucet Leak",
      status: "In Progress",
      priority: "Medium",
      submitted: "Dec 13, 2024",
      description: "Kitchen faucet is dripping constantly",
      progress: 60,
    },
    {
      id: 2,
      title: "AC Unit Maintenance",
      status: "Pending",
      priority: "Low",
      submitted: "Dec 8, 2024",
      description: "Annual AC maintenance check",
      progress: 20,
    },
  ])

  const [newRequest, setNewRequest] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    location: "",
  })

  const { toast } = useToast()

  const submitRequest = () => {
    if (!newRequest.title || !newRequest.description) {
      toast({
        title: "Error",
        description: "Please fill in the title and description fields.",
        variant: "destructive",
      })
      return
    }

    const request = {
      id: requests.length + 1,
      title: newRequest.title,
      status: "Pending",
      priority: newRequest.priority || "Medium",
      submitted: new Date().toLocaleDateString(),
      description: newRequest.description,
      progress: 0,
    }
    setRequests([request, ...requests])
    setNewRequest({ title: "", category: "", priority: "", description: "", location: "" })
    toast({
      title: "Request Submitted",
      description: "Your maintenance request has been submitted successfully.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Maintenance Requests
          </h2>
          <p className="text-gray-600 mt-1">Submit and track maintenance requests for your unit</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md">
              <PlusIcon className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Submit Maintenance Request</DialogTitle>
              <DialogDescription>Describe the issue you're experiencing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newRequest.category}
                  onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="appliances">Appliances</SelectItem>
                    <SelectItem value="general">General Maintenance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newRequest.priority}
                  onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High - Urgent</SelectItem>
                    <SelectItem value="Medium">Medium - Normal</SelectItem>
                    <SelectItem value="Low">Low - When convenient</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newRequest.location}
                  onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
                  placeholder="e.g., Kitchen, Bathroom, Living Room"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Detailed description of the issue"
                  rows={3}
                />
              </div>
              <Button onClick={submitRequest} className="w-full">
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-blue-700">Total Requests</CardTitle>
            <WrenchIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{requests.length}</div>
            <p className="text-xs text-blue-600">This year</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-yellow-700">In Progress</CardTitle>
            <ClockIcon className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900">
              {requests.filter((r) => r.status === "In Progress").length}
            </div>
            <p className="text-xs text-yellow-600">Active requests</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-green-700">Completed</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">8</div>
            <p className="text-xs text-green-600">This year</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-purple-700">Avg Response</CardTitle>
            <CalendarIcon className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">2.5</div>
            <p className="text-xs text-purple-600">Days</p>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Requests */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Requests</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {requests
            .filter((r) => r.status !== "Completed")
            .map((request) => (
              <Card key={request.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{request.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </div>
                  </div>
                  <CardDescription>Submitted on {request.submitted}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{request.description}</p>
                  {request.status === "In Progress" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{request.progress}%</span>
                      </div>
                      <Progress value={request.progress} className="h-2" />
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Message Sent",
                          description: `Message thread opened for ${request.title}`,
                        })
                      }}
                    >
                      <MessageSquareIcon className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Photo Upload",
                          description: `Photo upload opened for ${request.title}`,
                        })
                      }}
                    >
                      <CameraIcon className="h-4 w-4 mr-2" />
                      Add Photo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          {requests.filter((r) => r.status !== "Completed").length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <WrenchIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No active maintenance requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Completed Requests</CardTitle>
              <CardDescription>Your maintenance history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Bathroom Light Fixture", completed: "Nov 28, 2024", rating: 5 },
                { title: "Dishwasher Repair", completed: "Nov 15, 2024", rating: 4 },
                { title: "Window Screen Replacement", completed: "Oct 22, 2024", rating: 5 },
              ].map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <div>
                    <p className="font-semibold text-green-900">{request.title}</p>
                    <p className="text-sm text-green-700">Completed on {request.completed}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < request.rating ? "text-yellow-400" : "text-gray-300"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card className="border-0 shadow-lg bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-900">
                <AlertTriangleIcon className="h-5 w-5" />
                Emergency Maintenance
              </CardTitle>
              <CardDescription>For urgent issues that need immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-100 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">When to use emergency requests:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Water leaks or flooding</li>
                  <li>• Electrical hazards</li>
                  <li>• Heating/cooling failures in extreme weather</li>
                  <li>• Security issues (broken locks, doors)</li>
                  <li>• Gas leaks</li>
                </ul>
              </div>
              <div className="text-center">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    toast({
                      title: "Emergency Request Submitted",
                      description: "Your emergency request has been submitted. You will be contacted immediately.",
                      variant: "destructive",
                    })
                  }}
                >
                  <AlertTriangleIcon className="h-4 w-4 mr-2" />
                  Submit Emergency Request
                </Button>
                <p className="text-sm text-red-600 mt-2">Emergency line: (555) 911-HELP</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
