"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MessageSquareIcon, SendIcon, PlusIcon, SearchIcon, PaperclipIcon, PhoneIcon, MailIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Landlord",
      lastMessage: "I'll have the maintenance team check the faucet tomorrow morning.",
      time: "2 hours ago",
      unread: 0,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Maintenance",
      lastMessage: "The AC repair is scheduled for Friday at 10 AM.",
      time: "1 day ago",
      unread: 2,
      avatar: "MC",
    },
    {
      id: 3,
      name: "Property Management",
      role: "Office",
      lastMessage: "Your lease renewal documents are ready for review.",
      time: "3 days ago",
      unread: 1,
      avatar: "PM",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      content: "Hi Sarah, the kitchen faucet has been dripping for the past few days. Could someone take a look at it?",
      time: "Yesterday 3:30 PM",
      isOwn: true,
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      content: "Hi John! Thanks for letting me know. I'll contact our maintenance team right away.",
      time: "Yesterday 4:15 PM",
      isOwn: false,
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content:
        "I'll have the maintenance team check the faucet tomorrow morning. They should be there around 10 AM. Will that work for you?",
      time: "2 hours ago",
      isOwn: false,
    },
  ]

  const sendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      })
      setNewMessage("")
    }
  }

  const startNewConversation = () => {
    toast({
      title: "New Conversation",
      description: "Starting a new conversation with property management.",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Messages
          </h2>
          <p className="text-gray-600 mt-1">Communicate with your landlord and property management</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md">
              <PlusIcon className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>Send a message to property management</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter message subject" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." rows={4} />
              </div>
              <Button onClick={startNewConversation} className="w-full">
                Send Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages Interface */}
      <div className="grid gap-6 lg:grid-cols-3 h-[600px]">
        {/* Conversations List */}
        <Card className="border-0 shadow-lg lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareIcon className="h-5 w-5 text-purple-600" />
              Conversations
            </CardTitle>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                    selectedConversation === conversation.id ? "border-purple-500 bg-purple-50" : "border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900 truncate">{conversation.name}</p>
                        {conversation.unread > 0 && (
                          <Badge className="bg-purple-600 text-white text-xs">{conversation.unread}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-purple-600">{conversation.role}</p>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-gray-500">{conversation.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="border-0 shadow-lg lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">SJ</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                  <CardDescription>Landlord • Online</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <PhoneIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MailIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] ${message.isOwn ? "order-2" : "order-1"}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.isOwn ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-3">{message.time}</p>
                  </div>
                  {!message.isOwn && (
                    <Avatar className="h-8 w-8 order-1 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">SJ</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} className="bg-purple-600 hover:bg-purple-700 text-white">
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <PhoneIcon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold text-blue-900 mb-2">Emergency Contact</h3>
            <p className="text-sm text-blue-700 mb-3">24/7 emergency maintenance line</p>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <MailIcon className="h-8 w-8 mx-auto mb-3 text-green-600" />
            <h3 className="font-semibold text-green-900 mb-2">Property Office</h3>
            <p className="text-sm text-green-700 mb-3">General inquiries and support</p>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              Send Email
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquareIcon className="h-8 w-8 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold text-purple-900 mb-2">Live Chat</h3>
            <p className="text-sm text-purple-700 mb-3">Instant support during office hours</p>
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
