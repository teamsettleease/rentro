"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { EditIcon, MailIcon, PhoneIcon, MapPinIcon, CalendarIcon } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function TenantProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    emergency: "Jane Doe - (555) 987-6543",
    notes: "",
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <EditIcon className="h-4 w-4 mr-2" />
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Tenant since March 2023</CardDescription>
            <Badge variant="secondary" className="w-fit mx-auto">
              Active Lease
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <MailIcon className="h-4 w-4 text-muted-foreground" />
              <span>john.doe@email.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <PhoneIcon className="h-4 w-4 text-muted-foreground" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPinIcon className="h-4 w-4 text-muted-foreground" />
              <span>123 Main St, Apt 4B</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>Lease expires Mar 2025</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency">Emergency Contact</Label>
              <Input
                id="emergency"
                value={formData.emergency}
                onChange={(e) => setFormData({ ...formData, emergency: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <Button
              onClick={() => {
                setIsEditing(false)
                toast({
                  title: "Profile Updated",
                  description: "Your profile information has been saved successfully.",
                })
              }}
              disabled={!isEditing}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lease Information */}
      <Card>
        <CardHeader>
          <CardTitle>Lease Information</CardTitle>
          <CardDescription>Current lease details and terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Property Address</Label>
                <p className="text-sm text-muted-foreground">123 Main Street, Apartment 4B, New York, NY 10001</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Lease Start Date</Label>
                <p className="text-sm text-muted-foreground">March 15, 2023</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Lease End Date</Label>
                <p className="text-sm text-muted-foreground">March 14, 2025</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Lease Type</Label>
                <p className="text-sm text-muted-foreground">Fixed-term (24 months)</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Monthly Rent</Label>
                <p className="text-sm text-muted-foreground">$1,200.00</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Security Deposit</Label>
                <p className="text-sm text-muted-foreground">$1,200.00</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Pet Policy</Label>
                <p className="text-sm text-muted-foreground">No pets allowed</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Landlord</Label>
                <p className="text-sm text-muted-foreground">Sarah Johnson - (555) 456-7890</p>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/lease-agreement.pdf"
                link.download = "lease-agreement.pdf"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                toast({
                  title: "Download Started",
                  description: "Lease agreement is being downloaded.",
                })
              }}
            >
              Download Lease
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Renewal Request Sent",
                  description: "Your lease renewal request has been submitted to your landlord.",
                })
              }}
            >
              Request Lease Renewal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
