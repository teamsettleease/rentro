"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MessageSquareIcon,
  SendIcon,
  SearchIcon,
  PlusIcon,
  PaperclipIcon,
  MoreVerticalIcon,
  PhoneIcon,
  VideoIcon,
  StarIcon,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isComposing, setIsComposing] = useState(false)

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Tech Innovations Inc.",
      lastMessage: "Thank you for the excellent service! The meeting room was perfect for our presentation.",
      timestamp: "2 min ago",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      rating: 5,
      messages: [
        {
          id: 1,
          sender: "Sarah Johnson",
          content: "Hi! I'd like to book the Downtown Business Hub for next Tuesday.",
          timestamp: "10:30 AM",
          type: "received",
        },
        {
          id: 2,
          sender: "You",
          content: "Hello Sarah! I'd be happy to help you with that booking. What time would work best for you?",
          timestamp: "10:32 AM",
          type: "sent",
        },
        {
          id: 3,
          sender: "Sarah Johnson",
          content: "We need it from 9 AM to 5 PM for a full-day workshop with our team.",
          timestamp: "10:35 AM",
          type: "received",
        },
        {
          id: 4,
          sender: "You",
          content:
            "Perfect! The Downtown Business Hub is available for that time slot. The rate would be $240 for the full day. Shall I proceed with the booking?",
          timestamp: "10:37 AM",
          type: "sent",
        },
        {
          id: 5,
          sender: "Sarah Johnson",
          content: "Yes, please go ahead with the booking. We'll need the projector and whiteboard setup as well.",
          timestamp: "10:40 AM",
          type: "received",
        },
        {
          id: 6,
          sender: "You",
          content:
            "Excellent! I've confirmed your booking and included the projector and whiteboard setup. You'll receive a confirmation email shortly.",
          timestamp: "10:42 AM",
          type: "sent",
        },
        {
          id: 7,
          sender: "Sarah Johnson",
          content: "Thank you for the excellent service! The meeting room was perfect for our presentation.",
          timestamp: "2 min ago",
          type: "received",
        },
      ],
    },
    {
      id: 2,
      name: "Mike Chen",
      company: "Creative Solutions LLC",
      lastMessage: "Is the Executive Meeting Center available this Friday afternoon?",
      timestamp: "1 hour ago",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      rating: 4,
      messages: [
        {
          id: 1,
          sender: "Mike Chen",
          content: "Hi there! I'm interested in booking a space for a client meeting.",
          timestamp: "2:15 PM",
          type: "received",
        },
        {
          id: 2,
          sender: "You",
          content:
            "Hello Mike! I'd be happy to help you find the perfect space. What type of meeting are you planning?",
          timestamp: "2:18 PM",
          type: "sent",
        },
        {
          id: 3,
          sender: "Mike Chen",
          content:
            "It's a creative presentation for about 8 people. We'll need good lighting and presentation equipment.",
          timestamp: "2:20 PM",
          type: "received",
        },
        {
          id: 4,
          sender: "Mike Chen",
          content: "Is the Executive Meeting Center available this Friday afternoon?",
          timestamp: "1 hour ago",
          type: "received",
        },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      company: "Global Consulting Group",
      lastMessage: "Could we schedule a tour of your facilities?",
      timestamp: "3 hours ago",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      rating: 5,
      messages: [
        {
          id: 1,
          sender: "Emma Davis",
          content: "Hello! We're looking for a regular meeting space for our weekly team meetings.",
          timestamp: "11:00 AM",
          type: "received",
        },
        {
          id: 2,
          sender: "You",
          content: "Hi Emma! That sounds great. How many people typically attend your meetings?",
          timestamp: "11:05 AM",
          type: "sent",
        },
        {
          id: 3,
          sender: "Emma Davis",
          content: "Usually around 12-15 people. We'd prefer a space with natural light if possible.",
          timestamp: "11:10 AM",
          type: "received",
        },
        {
          id: 4,
          sender: "Emma Davis",
          content: "Could we schedule a tour of your facilities?",
          timestamp: "3 hours ago",
          type: "received",
        },
      ],
    },
  ]

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message = {
      id: selectedConversation.messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "sent",
    }

    // Update the conversation with the new message
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      timestamp: "now",
    }

    setSelectedConversation(updatedConversation)
    setNewMessage("")

    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedConversation.name}`,
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between animate-in slide-in-from-top duration-500">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-800 to-amber-700 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-orange-700 text-lg mt-2">Communicate with your customers and partners</p>
        </div>
        <Dialog open={isComposing} onOpenChange={setIsComposing}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <PlusIcon className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Compose New Message</DialogTitle>
              <DialogDescription>Send a message to a customer or partner</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">To:</label>
                <Input placeholder="Enter email or name..." />
              </div>
              <div>
                <label className="text-sm font-medium">Subject:</label>
                <Input placeholder="Message subject..." />
              </div>
              <div>
                <label className="text-sm font-medium">Message:</label>
                <Textarea placeholder="Type your message..." rows={4} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsComposing(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsComposing(false)
                    toast({ title: "Message Sent", description: "Your message has been sent successfully." })
                  }}
                >
                  <SendIcon className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 animate-in slide-in-from-left duration-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquareIcon className="h-5 w-5 text-orange-600" />
                Conversations
              </CardTitle>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {conversations.reduce((sum, conv) => sum + conv.unread, 0)} unread
              </Badge>
            </div>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-1 p-3">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-orange-50 ${
                      selectedConversation?.id === conversation.id
                        ? "bg-gradient-to-r from-orange-100 to-amber-100 border-l-4 border-l-orange-500"
                        : "hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 ring-2 ring-orange-200">
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 font-semibold">
                            {conversation.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(conversation.status)} rounded-full border-2 border-white`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900 truncate">{conversation.name}</h4>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-orange-600 font-medium">{conversation.company}</p>
                        <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-3 w-3 ${
                                  i < conversation.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          {conversation.unread > 0 && (
                            <Badge className="bg-orange-500 text-white text-xs">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 animate-in slide-in-from-right duration-500">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-orange-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-orange-200">
                        <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 font-semibold">
                          {selectedConversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(selectedConversation.status)} rounded-full border-2 border-white`}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{selectedConversation.name}</h3>
                      <p className="text-sm text-orange-600">{selectedConversation.company}</p>
                      <p className="text-xs text-gray-500 capitalize">{selectedConversation.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <PhoneIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <VideoIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-420px)] p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            message.type === "sent"
                              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                              : "bg-gray-100 text-gray-900"
                          } rounded-lg p-3 shadow-sm`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${message.type === "sent" ? "text-orange-100" : "text-gray-500"}`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t border-orange-100 p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white"
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquareIcon className="h-16 w-16 text-orange-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
