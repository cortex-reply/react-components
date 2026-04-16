"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Send, Bot, User, Menu, X, Paperclip } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { BusinessUnit } from "../DigitalColleagues/types"
import { CapabilityMenu } from "../src/components/Chat/capability-menu"
import { getContextualActions } from "../src/test-data/capabilities"
import type { CapabilityContext, Capability, CapabilityAction } from "../src/test-data/capabilities"
import type { FileUpload } from "../src/components/Chat/types"

// Legacy interface for backward compatibility
export interface ChatMessage {
  id: string
  content: string
  type: "user" | "ai"
  timestamp: Date
}

// Enhanced message types that extend the original ChatMessage
export interface EnhancedChatMessage extends ChatMessage {
  role?: "user" | "assistant" | "system"
  messageType?: "text" | "image" | "file" | "card" | "reference" | "menu" | "tool-invocation"
  data?: any
  image?: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  file?: {
    name: string
    size: number
    type: string
    url: string
  }
  card?: {
    title: string
    description?: string
    data: any
    variant?: 'task' | 'artefact' | 'customer' | 'opportunity' | 'campaign' | 'generic'
  }
  references?: Array<{
    id: string
    title: string
    url?: string
    description?: string
    type?: 'document' | 'link' | 'internal'
  }>
  menu?: {
    title: string
    items: Array<{
      id: string
      label: string
      description?: string
      value: any
      action?: () => void
    }>
  }
}

interface AIChatInterfaceProps {
  messages: (ChatMessage | EnhancedChatMessage)[]
  input: string
  isTyping?: boolean
  selectedTeam?: BusinessUnit
  currentSessionTitle?: string
  capabilities: Capability[]
  showCapabilities?: boolean
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  fileUploads?: FileUpload[]
  isDragOver?: boolean
  enableFileUpload?: boolean
  onFileUpload?: (files: FileList | null) => void
  onRemoveFile?: (id: string) => void
  onDragOver?: (isDragOver: boolean) => void
  className?: string
}

export function AIChatInterface({
  messages,
  input,
  isTyping = false,
  selectedTeam,
  currentSessionTitle,
  capabilities,
  showCapabilities = true,
  onInputChange,
  onSendMessage,
  onKeyPress,
  fileUploads = [],
  isDragOver = false,
  enableFileUpload = false,
  onFileUpload,
  onRemoveFile,
  onDragOver,
  className,
}: AIChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isCapabilityMenuOpen, setIsCapabilityMenuOpen] = useState(false)
  const [currentCapabilityContext, setCurrentCapabilityContext] = useState<CapabilityContext>({
    path: [],
    selectedItems: [],
    filters: {}
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleCapabilityAction = (actionId: string, context: CapabilityContext) => {
    // Handle capability action - could send message, update state, etc.
    console.log("Capability action:", actionId, context)
    
    // Example: Add a message to chat about the action
    const actionMessage = `Executing ${actionId} with context: ${JSON.stringify(context.path.map(p => p.name))}`
    // You would call your onSendMessage or similar function here
    
    setIsCapabilityMenuOpen(false)
  }

  const handleCapabilityContextChange = useCallback((context: CapabilityContext) => {
    setCurrentCapabilityContext(context)
  }, [])

  // Get contextual actions based on current capability context
  const getCurrentContextActions = () => {
    return getContextualActions(currentCapabilityContext)
  }

  // Generate quick suggestions from capabilities
  const getQuickSuggestions = () => {
    const suggestions: Array<{ label: string; action: () => void }> = []
    
    // Add top-level capabilities as suggestions
    capabilities.forEach(capability => {
      if (capability.actions) {
        capability.actions.forEach(action => {
          suggestions.push({
            label: action.label,
            action: () => handleCapabilityAction(action.id, { path: [capability], selectedItems: [], filters: {} })
          })
        })
      }
      
      // Add quick access to common lists
      if (capability.children) {
        capability.children.forEach(child => {
          if (child.type === "list" && child.data) {
            suggestions.push({
              label: `View ${child.name}`,
              action: () => setIsCapabilityMenuOpen(true)
            })
          }
        })
      }
    })
    
    // Limit to 4-5 suggestions to avoid clutter
    return suggestions.slice(0, 5)
  }

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
            {messages.map((message) => {
              const enhancedMessage = message as EnhancedChatMessage
              return (
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
                    {/* Render different message types */}
                    {enhancedMessage.messageType === "image" && enhancedMessage.image && (
                      <div className="mb-2">
                        <img 
                          src={enhancedMessage.image.url} 
                          alt={enhancedMessage.image.alt || "Uploaded image"}
                          className="max-w-full h-auto max-h-48 rounded-lg"
                        />
                      </div>
                    )}
                    
                    {enhancedMessage.messageType === "file" && enhancedMessage.file && (
                      <div className="mb-2 p-2 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{enhancedMessage.file.name}</span>
                          <span className="text-xs opacity-70">{(enhancedMessage.file.size / 1024 / 1024).toFixed(1)}MB</span>
                        </div>
                      </div>
                    )}
                    
                    {enhancedMessage.messageType === "card" && enhancedMessage.card && (
                      <div className="mb-2">
                        <div className="p-3 bg-background/50 rounded-lg">
                          <h4 className="font-medium">{enhancedMessage.card.title}</h4>
                          {enhancedMessage.card.description && (
                            <p className="text-sm opacity-70 mt-1">{enhancedMessage.card.description}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {enhancedMessage.messageType === "reference" && enhancedMessage.references && (
                      <div className="mb-2 space-y-1">
                        {enhancedMessage.references.map((ref) => (
                          <div key={ref.id} className="p-2 bg-background/50 rounded-lg">
                            <p className="text-sm font-medium">{ref.title}</p>
                            {ref.description && (
                              <p className="text-xs opacity-70">{ref.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {enhancedMessage.messageType === "menu" && enhancedMessage.menu && (
                      <div className="mb-2">
                        <p className="text-sm font-medium mb-2">{enhancedMessage.menu.title}</p>
                        <div className="space-y-1">
                          {enhancedMessage.menu.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={item.action}
                              className="w-full text-left p-2 bg-background/50 rounded-lg hover:bg-background/70 transition-colors"
                            >
                              <p className="text-sm font-medium">{item.label}</p>
                              {item.description && (
                                <p className="text-xs opacity-70">{item.description}</p>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Capability Menu within Chat */}
          {showCapabilities && isCapabilityMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted rounded-2xl px-4 py-3 shadow-sm">
                <CapabilityMenu
                  capabilities={capabilities}
                  isOpen={isCapabilityMenuOpen}
                  onToggle={() => setIsCapabilityMenuOpen(!isCapabilityMenuOpen)}
                  onActionSelect={handleCapabilityAction}
                  onContextChange={handleCapabilityContextChange}
                  className="w-full"
                />
              </div>
            </motion.div>
          )}

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

      {/* File Uploads */}
      {fileUploads && fileUploads.length > 0 && (
        <div className="border-t p-4 bg-muted/10">
          <div className="flex flex-wrap gap-2">
            {fileUploads.map((upload: FileUpload) => (
              <div key={upload.id} className="flex items-center gap-2 bg-background rounded-lg p-2 border">
                <span className="text-sm font-medium">{upload.file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(upload.file.size / 1024 / 1024).toFixed(1)}MB
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile?.(upload.id)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="border-t p-4 bg-muted/20">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={selectedTeam ? `Ask me about ${selectedTeam.name.toLowerCase()}...` : "How can I help you today?"}
            className="flex-1 rounded-2xl bg-background shadow-sm"
            disabled={isTyping}
          />
          {enableFileUpload && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.multiple = true
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files
                  onFileUpload?.(files)
                }
                input.click()
              }}
              className="rounded-2xl h-10 w-10 shadow-sm"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          )}
          {/* 
            To integrate file uploads with AI SDK useChat hook, replace the onClick handler with:
            
            const { sendMessage } = useChat()
            
            const handleSendWithFiles = () => {
              if (!input.trim() && fileUploads.length === 0) return
              
              // Convert FileUpload[] to FileList for AI SDK
              const fileList = fileUploads.length > 0 ? createFileList(fileUploads.map(upload => upload.file)) : undefined
              
              // Send message with files to AI SDK
              sendMessage({ text: input, files: fileList })
              
              // Clear input and files
              onInputChange('')
              setFileUploads([])
            }
            
            // Helper function to create FileList from File objects
            const createFileList = (files: File[]): FileList => {
              const dataTransfer = new DataTransfer()
              files.forEach(file => dataTransfer.items.add(file))
              return dataTransfer.files
            }
          */}
          <Button
            onClick={onSendMessage}
            disabled={!input.trim() && (!fileUploads || fileUploads.length === 0) || isTyping}
            size="icon"
            className="rounded-2xl h-10 w-10 shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Suggestions and Capabilities Toggle */}
        {showCapabilities && (
          <div className="flex items-center gap-3 mt-3">
            <Button
              onClick={() => setIsCapabilityMenuOpen(!isCapabilityMenuOpen)}
              variant="outline"
              size="sm"
              className="rounded-full text-xs flex-shrink-0"
            >
              <Menu className="h-3 w-3 mr-1" />
              {isCapabilityMenuOpen ? "Hide" : "Show"} Capabilities
            </Button>
            
            <div className="flex flex-wrap gap-2 overflow-hidden">
              {/* Show contextual actions first if available */}
              {getCurrentContextActions().map((action, index) => (
                <Button
                  key={`context-${action.id}`}
                  variant="default"
                  size="sm"
                  className="rounded-full text-xs bg-accent hover:bg-accent/80"
                  onClick={() => handleCapabilityAction(action.id, currentCapabilityContext)}
                >
                  {action.label}
                </Button>
              ))}
              
              {/* Show quick suggestions from capabilities when no context actions */}
              {getCurrentContextActions().length === 0 && getQuickSuggestions().map((suggestion, index) => (
                <Button
                  key={`suggestion-${index}`}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={suggestion.action}
                >
                  {suggestion.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
