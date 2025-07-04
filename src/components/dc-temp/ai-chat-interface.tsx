"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { BusinessUnit } from "./business-units"

export interface ChatMessage {
  id: string
  content: string
  type: "user" | "ai"
  timestamp: Date
}

interface QuickSuggestion {
  label: string
  action: () => void
}

interface AIChatInterfaceProps {
  messages: ChatMessage[]
  input: string
  isTyping?: boolean
  selectedTeam: BusinessUnit
  currentSessionTitle?: string
  quickSuggestions?: QuickSuggestion[]
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  className?: string
}

export function AIChatInterface({
  messages,
  input,
  isTyping = false,
  selectedTeam,
  currentSessionTitle,
  quickSuggestions = [],
  onInputChange,
  onSendMessage,
  onKeyPress,
  className,
}: AIChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Card className={`h-full flex flex-col shadow-sm ${className || ""}`}>
      {/* Chat Header */}
      {/* <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-600 to-blue-600">
              <AvatarFallback className="text-white text-xs">AI</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{currentSessionTitle || `New ${selectedTeam.name} Chat`}</h2>
              <p className="text-sm text-muted-foreground">AI Assistant • {selectedTeam.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={cn("flex h-6 w-6 items-center justify-center rounded text-white text-xs", selectedTeam.color)}
            >
              {selectedTeam.icon}
            </div>
          </div>
        </div>
      </div> */}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-3", message.type === "user" ? "flex-row-reverse" : "flex-row")}
              >
                <Avatar className="h-8 w-8">
                  {message.type === "user" ? (
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="border-t p-4 bg-muted/20">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={`Ask me about ${selectedTeam.name.toLowerCase()}...`}
            className="flex-1 rounded-2xl bg-background shadow-sm"
            disabled={isTyping}
          />
          <Button
            onClick={onSendMessage}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="rounded-2xl h-10 w-10 shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Suggestions */}
        {quickSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
                onClick={suggestion.action}
              >
                {suggestion.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
