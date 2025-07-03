"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArchiveIcon, StarIcon, TagIcon } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Alice Johnson",
    lastMessage: "Hi, I'm interested in the downtown studio apartment...",
    time: "2 min ago",
    unread: 2,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 2,
    name: "John Smith",
    lastMessage: "When can I schedule a viewing?",
    time: "1 hour ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
  },
  {
    id: 3,
    name: "Sara Brown",
    lastMessage: "Thank you for the quick response!",
    time: "3 hours ago",
    unread: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 4,
    name: "Michael Wilson",
    lastMessage: "Is the property still available?",
    time: "1 day ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
  },
  {
    id: 5,
    name: "Emily Davis",
    lastMessage: "I have some questions about the lease terms...",
    time: "2 days ago",
    unread: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
]

interface MessagesInboxProps {
  searchTerm: string
  selectedConversation: number | null
  onSelectConversation: (id: number) => void
}

export function MessagesInbox({ searchTerm, selectedConversation, onSelectConversation }: MessagesInboxProps) {
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleArchiveMessage = (id: number) => {
    console.log("Archiving message:", id)
    // In a real app, you would archive the message
  }

  const handleStarMessage = (id: number) => {
    console.log("Starring message:", id)
    // In a real app, you would star the message
  }

  const handleTagMessage = (id: number) => {
    console.log("Tagging message:", id)
    // In a real app, you would add tags to the message
  }

  return (
    <div>
      {filteredConversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
            selectedConversation === conversation.id ? "bg-blue-50 border-blue-200" : ""
          }`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                <AvatarFallback>
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {conversation.online && (
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm truncate">{conversation.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                  {conversation.unread > 0 && (
                    <Badge className="bg-blue-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleStarMessage(conversation.id)}>
              <StarIcon className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleArchiveMessage(conversation.id)}
            >
              <ArchiveIcon className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleTagMessage(conversation.id)}>
              <TagIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
