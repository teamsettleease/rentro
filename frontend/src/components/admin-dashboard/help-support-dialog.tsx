"use client"

import type React from "react"

import { useState } from "react"
import {
  BookOpenIcon,
  HelpCircleIcon,
  LifeBuoyIcon,
  MessageCircleIcon,
  PhoneIcon,
  SendIcon,
  VideoIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

interface HelpSupportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const faqs = [
  {
    question: "How do I add a new property listing?",
    answer:
      "Go to the Listings page and click the 'Add New Listing' button. Fill in all required property details, upload photos, and set your pricing and availability.",
  },
  {
    question: "How can I manage booking requests?",
    answer:
      "Navigate to the Bookings page where you can view all pending requests. You can approve, decline, or request more information from potential guests.",
  },
  {
    question: "How do I update my payout settings?",
    answer:
      "Go to Settings > Payment Methods to update your bank account information and payout preferences. Changes may take 1-2 business days to process.",
  },
  {
    question: "What should I do if a guest cancels?",
    answer:
      "Cancelled bookings will automatically update in your dashboard. Depending on your cancellation policy, refunds will be processed according to the terms set for that booking.",
  },
  {
    question: "How can I improve my listing's visibility?",
    answer:
      "Ensure your listing has high-quality photos, detailed descriptions, competitive pricing, and maintain good reviews. Regular updates and quick response times also help.",
  },
]

const contactMethods = [
  {
    icon: MessageCircleIcon,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    available: "24/7",
  },
  {
    icon: PhoneIcon,
    title: "Phone Support",
    description: "Call us directly",
    action: "Call Now",
    available: "Mon-Fri 9AM-6PM",
  },
  {
    icon: VideoIcon,
    title: "Video Call",
    description: "Schedule a video consultation",
    action: "Schedule Call",
    available: "By appointment",
  },
]

export function HelpSupportDialog({ open, onOpenChange }: HelpSupportDialogProps) {
  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "",
    message: "",
    priority: "medium",
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate form submission
    toast({
      title: "Support Ticket Created",
      description: "We've received your request and will respond within 24 hours.",
    })

    // Reset form
    setSupportForm({
      subject: "",
      category: "",
      message: "",
      priority: "medium",
    })

    onOpenChange(false)
  }

  const handleContactMethod = (method: string) => {
    toast({
      title: `${method} Initiated`,
      description: `Connecting you to our ${method.toLowerCase()} support...`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LifeBuoyIcon className="h-5 w-5" />
            Help & Support
          </DialogTitle>
          <DialogDescription>
            Get help with your dashboard, find answers to common questions, or contact our support team.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="ticket">Support Ticket</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <HelpCircleIcon className="h-4 w-4" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Support</h3>
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleContactMethod(method.title)}
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <method.icon className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{method.title}</h4>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm">
                          {method.action}
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">{method.available}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Emergency Support</h4>
                <p className="text-sm text-blue-700 mb-3">
                  For urgent issues affecting your bookings or payments, call our emergency line:
                </p>
                <Button variant="outline" className="bg-white">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  +1 (555) 123-HELP
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Help Guides & Documentation</h3>

              <div className="grid gap-4">
                <Card className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <BookOpenIcon className="h-8 w-8 text-green-600" />
                      <div>
                        <h4 className="font-medium">Getting Started Guide</h4>
                        <p className="text-sm text-gray-600">Complete setup guide for new users</p>
                      </div>
                    </div>
                    <Badge variant="secondary">New</Badge>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <BookOpenIcon className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Property Management</h4>
                        <p className="text-sm text-gray-600">Learn how to manage your listings effectively</p>
                      </div>
                    </div>
                    <Badge variant="outline">Popular</Badge>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <BookOpenIcon className="h-8 w-8 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Booking Management</h4>
                        <p className="text-sm text-gray-600">Handle reservations and guest communications</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <BookOpenIcon className="h-8 w-8 text-orange-600" />
                      <div>
                        <h4 className="font-medium">Payment & Payouts</h4>
                        <p className="text-sm text-gray-600">Understanding payments and financial settings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <BookOpenIcon className="h-8 w-8 text-red-600" />
                      <div>
                        <h4 className="font-medium">API Documentation</h4>
                        <p className="text-sm text-gray-600">Technical documentation for developers</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Technical</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ticket" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Create Support Ticket</h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={supportForm.subject}
                      onChange={(e) => setSupportForm((prev) => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border rounded-md"
                      value={supportForm.category}
                      onChange={(e) => setSupportForm((prev) => ({ ...prev, category: e.target.value }))}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="booking">Booking Management</option>
                      <option value="listing">Listing Management</option>
                      <option value="account">Account Settings</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    className="w-full p-2 border rounded-md"
                    value={supportForm.priority}
                    onChange={(e) => setSupportForm((prev) => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={supportForm.message}
                    onChange={(e) => setSupportForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Please describe your issue in detail..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <SendIcon className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
