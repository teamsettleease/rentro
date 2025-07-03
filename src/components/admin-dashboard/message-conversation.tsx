"use client"

import type React from "react"

import { useState } from "react"
import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const messages = [
  {
    id: 1,
    sender: "Alice Johnson",
    content: "Hi, I'm interested in the downtown studio apartment. Is it still available?",
    time: "10:30 AM",
    isOwn: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    sender: "You",
    content: "Hello Alice! Yes, the downtown studio is still available. Would you like to schedule a viewing?",
    time: "10:32 AM",
    isOwn: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    sender: "Alice Johnson",
    content: "That would be great! What times are available this week?",
    time: "10:35 AM",
    isOwn: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    sender: "You",
    content: "I have availability on Tuesday at 2 PM, Wednesday at 10 AM, or Friday at 4 PM. Which works best for you?",
    time: "10:37 AM",
    isOwn: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    sender: "Alice Johnson",
    content: "Tuesday at 2 PM works perfectly for me. Should I bring any documents?",
    time: "10:40 AM",
    isOwn: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

interface MessageConversationProps {
  conversationId: number
}

export function MessageConversation({ conversationId }: MessageConversationProps) {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send the message here
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alice Johnson" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Alice Johnson</h3>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
              <AvatarFallback>
                {message.sender
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className={`max-w-xs lg:max-w-md ${message.isOwn ? "text-right" : ""}`}>
              <div
                className={`p-3 rounded-lg ${message.isOwn ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"}`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <SmileIcon className="h-4 w-4" />
          </Button>
          <Button onClick={handleSendMessage} size="icon" className="h-8 w-8">
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
