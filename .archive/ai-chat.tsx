"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Send, Sparkles, Bot, User, Paperclip, Mic, ImageIcon, Loader2, ChevronDown, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator, // Make sure this is imported
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { businessUnits } from "../DigitalColleagues/test-data"
import { cn } from "../../utils"
import type { AIAssistantType } from "../DigitalColleagues/types"

export type MessageType = "user" | "ai" | "system"

export interface Message {
  id: string
  content: string
  type: MessageType
  timestamp: Date
  isLoading?: boolean
  assistantId?: string
}

interface AIChatProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isLoading?: boolean
  assistants: AIAssistantType[]
  currentAssistant: AIAssistantType
  onChangeAssistant: (assistant: AIAssistantType) => void
  className?: string
}

export function AIChat({
  messages,
  onSendMessage,
  isLoading = false,
  assistants,
  currentAssistant,
  onChangeAssistant,
  className,
}: AIChatProps) {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [favoriteUnits, setFavoriteUnits] = useState<string[]>(["copilot"])

  const maxVisibleContextButtons = 4 // Copilot + 3 others (excluding the "More" button itself)
  const copilotUnit = businessUnits.find((unit) => unit.id === "copilot")!

  const favoriteBusinessUnits = ["copilot", "design", "marketing", "sales"] // Example declaration
  const otherBusinessUnits = ["hr", "it", "finance", "operations", "legal", "product"] // Example declaration

  // Determine which favorite units to show (excluding Copilot)
  const favoriteUnitsToShow = favoriteBusinessUnits
    .filter((unitId) => unitId !== "copilot")
    .map((id) => businessUnits.find((unit) => unit.id === id)!)
    .filter(Boolean) // Ensure all found units are valid
    .slice(0, maxVisibleContextButtons - 1) // -1 because Copilot is always shown

  // Determine which other (non-favorite) units to show
  const remainingSlotsForOthers = maxVisibleContextButtons - 1 - favoriteUnitsToShow.length
  const otherUnitsToShow = otherBusinessUnits
    .filter((unitId) => unitId !== "copilot" && !favoriteUnitsToShow.some((fav) => fav.id === unitId))
    .map((id) => businessUnits.find((unit) => unit.id === id)!)
    .filter(Boolean)
    .slice(0, remainingSlotsForOthers)

  const displayedContextButtons = [copilotUnit, ...favoriteUnitsToShow, ...otherUnitsToShow]

  const toggleFavorite = (unitId: string) => {
    if (unitId === "copilot") return // Copilot is always pinned and cannot be unfavorited

    setFavoriteUnits((prev) => (prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]))
  }

  const handleContextChange = (unitId: string) => {
    const unit = businessUnits.find((u) => u.id === unitId)
    if (unit) {
      const assistant = assistants.find((a) => a.id === unitId) || {
        id: unitId,
        name: unit.name,
        description: `${unit.name} assistant`,
        avatarFallback: unit.name.substring(0, 2).toUpperCase(),
        welcomeMessage: `Hi! I'm your ${unit.name} assistant. How can I help you today?`,
        accentColor: unit.color,
      }
      onChangeAssistant(assistant)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }

  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-xl border bg-background w-full", className)}>
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto no-scrollbar">
            {" "}
            {/* Allow horizontal scroll if needed */}
            {displayedContextButtons.map((unit) => (
              <Button
                key={unit.id}
                variant={currentAssistant.id === unit.id ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-all flex-shrink-0",
                  currentAssistant.id === unit.id && unit.color,
                )}
                onClick={() => handleContextChange(unit.id)}
              >
                {unit.name}
              </Button>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full px-3 py-1 text-xs flex-shrink-0">
                  More
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">All Business Units</div>
                <DropdownMenuSeparator />
                {businessUnits.map((unit) => (
                  <DropdownMenuItem
                    key={unit.id}
                    className="flex items-center justify-between" // Removed cursor-pointer, Radix handles it
                    onSelect={() => {
                      // This will be triggered when the item is clicked (excluding the star button area if event propagation is stopped)
                      handleContextChange(unit.id)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", unit.color)} />
                      <span>{unit.name}</span>
                      {currentAssistant.id === unit.id && <div className="w-1 h-1 rounded-full bg-primary ml-1" />}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon" // Make it an icon button for better sizing
                      className="h-6 w-6 p-0 rounded-full" // Explicitly size and round
                      onClick={(e) => {
                        e.preventDefault() // Prevent any default behavior
                        e.stopPropagation() // Crucial: Stop event from bubbling to DropdownMenuItem's onSelect
                        toggleFavorite(unit.id)
                      }}
                      aria-label={`Favorite ${unit.name}`}
                    >
                      <Star
                        className={cn(
                          "h-3 w-3",
                          favoriteUnits.includes(unit.id)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground hover:text-yellow-500",
                        )}
                      />
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <Avatar className={cn("h-6 w-6", currentAssistant.accentColor || "bg-primary")}>
            <AvatarFallback className="text-xs">{currentAssistant.avatarFallback}</AvatarFallback>
            {currentAssistant.avatarUrl && <AvatarImage src={currentAssistant.avatarUrl || "/placeholder.svg"} />}
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{currentAssistant.name}</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full",
                  currentAssistant.accentColor ? `${currentAssistant.accentColor} bg-opacity-10` : "bg-primary/10",
                )}
              >
                <Sparkles
                  className={cn(
                    "h-8 w-8",
                    currentAssistant.accentColor
                      ? currentAssistant.accentColor.replace("bg-", "text-")
                      : "text-primary",
                  )}
                />
              </div>
              <h3 className="mt-4 text-lg font-medium">{currentAssistant.name}</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">{currentAssistant.welcomeMessage}</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn("flex gap-3", message.type === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  {message.type === "user" ? (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    </Avatar>
                  ) : message.type === "ai" ? (
                    <Avatar
                      className={cn(
                        "h-8 w-8",
                        message.assistantId
                          ? assistants.find((a) => a.id === message.assistantId)?.accentColor || "bg-primary"
                          : currentAssistant.accentColor || "bg-primary",
                      )}
                    >
                      <AvatarFallback>
                        {message.assistantId
                          ? assistants.find((a) => a.id === message.assistantId)?.avatarFallback || "AI"
                          : currentAssistant.avatarFallback}
                      </AvatarFallback>
                      {message.assistantId && assistants.find((a) => a.id === message.assistantId)?.avatarUrl && (
                        <AvatarImage src={assistants.find((a) => a.id === message.assistantId)?.avatarUrl || ""} />
                      )}
                    </Avatar>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "relative max-w-[80%] rounded-2xl px-4 py-3",
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.type === "ai"
                          ? "bg-muted"
                          : "bg-muted/50 text-muted-foreground text-sm",
                    )}
                  >
                    {message.isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    )}
                    <div
                      className={cn(
                        "absolute bottom-1 text-[10px] opacity-70",
                        message.type === "user" ? "left-4" : "right-4",
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${currentAssistant.name.split(" ")[0]} anything...`}
              className="min-h-[52px] max-h-[200px] overflow-y-auto resize-none pr-12 py-3 rounded-2xl"
              disabled={isLoading}
            />
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" disabled={isLoading}>
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            size="icon"
            className="h-[52px] w-[52px] shrink-0 rounded-full"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 rounded-full" disabled={isLoading}>
              <ImageIcon className="mr-1 h-4 w-4" />
              <span className="text-xs">Image</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full" disabled={isLoading}>
              <Mic className="mr-1 h-4 w-4" />
              <span className="text-xs">Voice</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Powered by <span className="font-medium">Cortex Reply<br /></span>
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper for no-scrollbar utility if not globally defined
// You might need to add this to your globals.css or a utility CSS file
// .no-scrollbar::-webkit-scrollbar {
//   display: none;
// }
// .no-scrollbar {
//   -ms-overflow-style: none;  /* IE and Edge */
//   scrollbar-width: none;  /* Firefox */
// }
