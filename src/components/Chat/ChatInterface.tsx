import React, { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Menu, Upload, Paperclip, X, FileText, Image as ImageIcon, File, Download, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CapabilityMenu } from "./capability-menu"
import { getContextualActions } from "../../test-data/capabilities"
import type { CapabilityContext, Capability } from "../../test-data/capabilities"
import { ChatCardTask } from "./ChatCardTask"
import { ChatCardArtefact } from "./ChatCardArtefact"
import type { UIMessage, FileUpload } from "./types"
import { getTextContent, hasToolPart, getToolPart, hasFilePart, getFileParts, hasDataPart, getDataPart } from "./types"

interface ChatInterfaceProps {
  messages: UIMessage[]
  input: string
  isTyping?: boolean
  currentSessionTitle?: string
  capabilities: Capability[]
  fileUploads: FileUpload[]
  isDragOver: boolean
  enableFileUpload: boolean
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  onFileUpload: (files: FileList | null) => void
  onRemoveFile: (id: string) => void
  onDragOver: (isDragOver: boolean) => void
  className?: string
}

export function ChatInterface({
  messages,
  input,
  isTyping = false,
  currentSessionTitle,
  capabilities,
  fileUploads,
  isDragOver,
  enableFileUpload,
  onInputChange,
  onSendMessage,
  onKeyPress,
  onFileUpload,
  onRemoveFile,
  onDragOver,
  className,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isCapabilityMenuOpen, setIsCapabilityMenuOpen] = useState(false)
  const [currentCapabilityContext, setCurrentCapabilityContext] = useState<CapabilityContext>({
    path: [],
    selectedItems: [],
    filters: {}
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Scroll to bottom when capability menu opens to ensure it's visible
  useEffect(() => {
    if (isCapabilityMenuOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100) // Small delay to allow animation to start
    }
  }, [isCapabilityMenuOpen])

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

  const handleCapabilityAction = (actionId: string, context: CapabilityContext) => {
    // Handle capability action - could send message, update state, etc.
    console.log("Capability action:", actionId, context)
    
    // Example: Add a message to chat about the action
    const actionMessage = `Executing ${actionId} with context: ${JSON.stringify(context.path.map(p => p.name))}`
    // You would call your onSendMessage or similar function here
    
    setIsCapabilityMenuOpen(false)
  }

  const contextualActions = getContextualActions({
    path: [],
    selectedItems: [],
    filters: {}
  })

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(e.target.files)
    if (e.target.files) {
      e.target.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver(false)
    onFileUpload(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
    if (type.startsWith('text/')) return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const renderMessage = (message: UIMessage) => {
    const isAssistant = message.role === 'assistant'
    const isUser = message.role === 'user'
    const textContent = getTextContent(message)

    return (
      <div className={cn(
        "flex items-start gap-3",
        isUser ? "flex-row-reverse" : ""
      )}>
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className={cn(
            isUser 
              ? "bg-primary text-primary-foreground" 
              : "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
          )}>
            {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        <div className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {/* Render text content if present */}
          {textContent && (
            <div className="mb-2 last:mb-0">
              <p className="text-sm">{textContent}</p>
            </div>
          )}

          {/* Render each part */}
          {message.parts.map((part, index) => {
            // Skip text parts as they're already rendered above
            if (part.type === 'text') {
              return null
            }

            // Handle file parts
            if (part.type === 'file') {
              const filePart = part as any
              return (
                <div key={index} className="mb-2 p-2 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getFileIcon(filePart.mimeType || 'application/octet-stream')}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {filePart.name || filePart.url?.split('/').pop() || 'File'}
                      </p>
                      {filePart.size && (
                        <p className="text-xs opacity-70">{formatFileSize(filePart.size)}</p>
                      )}
                      {filePart.mimeType && (
                        <p className="text-xs opacity-70">{filePart.mimeType}</p>
                      )}
                    </div>
                    {filePart.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(filePart.url, '_blank')}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            }

            // Handle tool parts (following AI SDK v5 pattern)
            if (part.type.startsWith('tool-')) {
              const toolPart = part as any
              const toolName = part.type.replace('tool-', '')

              // Handle task tool
              if (toolName === 'task') {
                switch (toolPart.state) {
                  case 'input-available':
                    return <div key={index} className="text-sm opacity-70">Loading task...</div>
                  case 'output-available':
                    return (
                      <div key={index} className="mb-2">
                        <ChatCardTask 
                          data={{
                            id: toolPart.output?.id || toolPart.input?.id,
                            fetchLatest: false,
                            taskData: toolPart.output || toolPart.input
                          }}
                        />
                      </div>
                    )
                  case 'output-error':
                    return <div key={index} className="text-sm text-red-500">Error: {toolPart.errorText}</div>
                  default:
                    return null
                }
              }

              // Handle artefact tool
              if (toolName === 'artefact') {
                switch (toolPart.state) {
                  case 'input-available':
                    return <div key={index} className="text-sm opacity-70">Loading artefact...</div>
                  case 'output-available':
                    return (
                      <div key={index} className="mb-2">
                        <ChatCardArtefact 
                          artefact={toolPart.output?.description || ''}
                          taskId={toolPart.output?.id || toolPart.input?.id}
                          taskData={toolPart.output || toolPart.input}
                        />
                      </div>
                    )
                  case 'output-error':
                    return <div key={index} className="text-sm text-red-500">Error: {toolPart.errorText}</div>
                  default:
                    return null
                }
              }

              // Generic tool handling
              return (
                <div key={index} className="mb-2">
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle className="text-lg">{toolName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {toolPart.state === 'input-available' && (
                        <p className="text-sm">Processing {toolName}...</p>
                      )}
                      {toolPart.state === 'output-available' && (
                        <pre className="text-sm">{JSON.stringify(toolPart.output, null, 2)}</pre>
                      )}
                      {toolPart.state === 'output-error' && (
                        <p className="text-sm text-red-500">Error: {toolPart.errorText}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            }

            // Handle custom data parts (for cards, references, menus, etc.)
            if (part.type.startsWith('data-')) {
              const dataPart = part as any
              const dataType = part.type.replace('data-', '')

              if (dataType === 'reference') {
                return (
                  <div key={index} className="mb-2">
                    <Card className="w-full">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          {dataPart.data?.references?.map((ref: any, refIndex: number) => (
                            <div key={refIndex} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                              <Badge variant="outline">{ref.type || 'link'}</Badge>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{ref.title}</p>
                                {ref.description && (
                                  <p className="text-xs text-muted-foreground truncate">{ref.description}</p>
                                )}
                              </div>
                              {ref.url && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(ref.url, '_blank')}
                                  className="h-8 w-8 p-0"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              }

              if (dataType === 'menu') {
                return (
                  <div key={index} className="mb-2">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{dataPart.data?.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {dataPart.data?.items?.map((item: any, itemIndex: number) => (
                            <Button
                              key={itemIndex}
                              variant="outline"
                              className="w-full justify-start"
                              onClick={item.action}
                            >
                              <div className="text-left">
                                <p className="font-medium">{item.label}</p>
                                {item.description && (
                                  <p className="text-xs text-muted-foreground">{item.description}</p>
                                )}
                              </div>
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              }

              // Generic data part handling
              return (
                <div key={index} className="mb-2">
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle className="text-lg">{dataType}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-sm">{JSON.stringify(dataPart.data, null, 2)}</pre>
                    </CardContent>
                  </Card>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    )
  }

  return (
    <Card className={`h-full flex flex-col shadow-sm ${className || ""}`}>
      {/* Chat Messages */}
      <ScrollArea 
        ref={scrollAreaRef}
        className="flex-1 p-4"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={cn(
          "space-y-4",
          isDragOver && "ring-2 ring-primary ring-offset-2 bg-primary/5"
        )}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-3", message.role === "user" ? "flex-row-reverse" : "flex-row")}
              >
                {renderMessage(message)}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Capability Menu within Chat */}
          {isCapabilityMenuOpen && (
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
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* File Uploads */}
      {fileUploads.length > 0 && (
        <div className="p-4 border-t bg-muted/10">
          <div className="flex flex-wrap gap-2">
            {fileUploads.map((upload) => (
              <div key={upload.id} className="flex items-center gap-2 bg-background rounded-lg p-2 border">
                {getFileIcon(upload.file.type)}
                <span className="text-sm font-medium">{upload.file.name}</span>
                <span className="text-xs text-muted-foreground">{formatFileSize(upload.file.size)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(upload.id)}
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
            placeholder="How can I help you today?"
            className="flex-1 rounded-2xl bg-background shadow-sm"
            disabled={isTyping}
          />
          {enableFileUpload && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl h-10 w-10 shadow-sm"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          )}
          <Button
            onClick={onSendMessage}
            disabled={!input.trim() && fileUploads.length === 0 || isTyping}
            size="icon"
            className="rounded-2xl h-10 w-10 shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Suggestions and Capabilities Toggle */}
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

        {enableFileUpload && (
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />
        )}
      </div>
    </Card>
  )
}
