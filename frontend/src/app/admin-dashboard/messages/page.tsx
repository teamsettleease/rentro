"use client"

import type React from "react"

import { useState } from "react"
import { PlusIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/admin-dashboard/page-header"
import { MessagesInbox } from "@/components/admin-dashboard/messages-inbox"
import { MessageConversation } from "@/components/admin-dashboard/message-conversation"

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <PageHeader
        title="Messages"
        description="Manage all communications with users"
        actions={
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            New Message
          </Button>
        }
      />
      <div className="flex-1 overflow-hidden p-6">
        <Card className="h-full">
          <CardContent className="p-0 flex h-full">
            <div className="w-1/3 border-r h-full flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search messages" className="pl-10" value={searchTerm} onChange={handleSearch} />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <MessagesInbox
                  searchTerm={searchTerm}
                  selectedConversation={selectedConversation}
                  onSelectConversation={setSelectedConversation}
                />
              </div>
            </div>
            <div className="w-2/3 h-full flex flex-col">
              {selectedConversation ? (
                <MessageConversation conversationId={selectedConversation} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
