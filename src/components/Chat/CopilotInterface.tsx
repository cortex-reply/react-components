"use client"

import type React from "react"
import type { UIMessage } from "ai"
import { useChat } from '@ai-sdk/react'

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Users, Upload, Paperclip, X, FileText, Image as ImageIcon, File } from "lucide-react"
import { DigitalColleageusLayout } from "../DigitalColleagues/DigitalColleageusLayout"
import { ChatSessionSidebar, type ChatSession } from "./chat-session-sidebar"
import { ChatInterface } from "./ChatInterface"
import type { Capability } from "../../test-data/capabilities"
import type { BusinessUnit } from "../DigitalColleagues/types"
import type { FileUpload } from "./types"

interface CopilotInterfaceProps {
  // AI Chat Integration - optional configuration and override
  aiConfig?: Parameters<typeof useChat>[0] // AI configuration options
  useCustomChat?: ReturnType<typeof useChat> // Override with custom chat instance
  enableAI?: boolean // Enable/disable AI functionality (default: true)
  
  // Required props (but made safe for testing)
  messages?: UIMessage[]
  businessUnits?: BusinessUnit[]
  capabilities?: Capability[]
  sidebarItems?: any[]
  notifications?: any[]
  sessions?: ChatSession[]
  
  // Event handlers
  onNewChat: () => void
  onSessionSelect: (session: ChatSession) => void
  onSessionDelete: (sessionId: string) => void
  onSessionEdit?: (sessionId: string) => void
  onBusinessUnitChange?: (unit: BusinessUnit) => void
  onNotificationRemove?: (id: string) => void
  onRemoveAll?: () => void
  onActionClick?: () => void
  onSearch?: (query: string) => void
  
  // Optional customization
  initialTeam?: string
  currentSession?: ChatSession | null
  showCapabilities?: boolean
  title?: string
  enableFileUpload?: boolean
  maxFileSize?: number // in MB
  allowedFileTypes?: string[]
  
  // Layout customization
  logo?: string
  appName?: string
  tagline?: string
  actionIcon?: React.ReactNode
  actionText?: string
  sidebarInitiallyClosed?: boolean
}

export function CopilotInterface({
  // AI Chat Integration
  aiConfig,
  useCustomChat,
  enableAI = true,
  
  // Required props with defaults for safety
  messages = [],
  businessUnits = [],
  capabilities = [],
  sidebarItems = [],
  notifications = [],
  sessions = [],
  
  // Event handlers
  onNewChat,
  onSessionSelect,
  onSessionDelete,
  onSessionEdit = () => {},
  onBusinessUnitChange = () => {},
  onNotificationRemove = () => {},
  onRemoveAll = () => {},
  onActionClick = () => {},
  onSearch = (query: string) => console.log("Search query:", query),
  
  // Optional customization
  initialTeam = "design",
  currentSession = null,
  showCapabilities = true,
  title = "Digital Colleagues",
  enableFileUpload = true,
  maxFileSize = 10, // 10MB default
  allowedFileTypes = ['image/*', 'text/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  
  // Layout customization
  logo = "/headerlogo.png",
  appName = "Nuvia",
  tagline = "AI-Powered Workspace",
  actionIcon = <Users className="mr-2 h-4 w-4" />,
  actionText = "Collaborate",
  sidebarInitiallyClosed = false,
}: CopilotInterfaceProps) {

  const mergedConfig = {
    ...aiConfig,
    onError: (error: any) => {

          // chatHook.
          chatHook?.setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: 'assistant',
              id: `error-${Date.now()}`,
              createdAt: new Date(),
              parts: [
                { type: 'text', text: error.message }
              ]
            },
          ])
          
          console.error("Error in CopilotInterface:", error);
        },
    // Add any default AI configuration here
    // e.g., apiKey: process.env.AI_API_KEY,
  }


  // AI Chat Integration - use internal useChat by default, allow override
  const internalChat = useChat(mergedConfig || {})
  const chatHook = enableAI ? (useCustomChat || internalChat) : null
  const [localInput, setLocalInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  // Use chat hook values if available, otherwise use props or local state
  const currentMessages = chatHook?.messages || messages
  const currentInput = localInput // Always use local input since useChat doesn't manage input state
  const currentIsLoading = (chatHook?.status === 'submitted') || isTyping
  // Adapt addToolResult to match ChatInterface's expected signature
  const addToolResult =
    chatHook?.addToolResult
      ? (toolCallId: string, tool: string, output: any) => {
          // Call the AI SDK's addToolResult with the correct argument shape
          // Ignore the returned promise for compatibility
          chatHook.addToolResult({ tool, toolCallId, output })
          console.log("Tool result added:", { toolCallId, tool, output })
          chatHook.sendMessage()
        }
      : () => { console.log("addToolResult not available") }
  // Safe initialization of business units with fallback
  const safeBusinessUnits = businessUnits || []
  const fallbackBusinessUnit: BusinessUnit = {
    id: 'default',
    name: 'Default Team',
    description: 'Default team when no business units are available',
    icon: '🏢',
    color: 'bg-gray-500',
    accentColor: 'bg-gray-600'
  }
  
  const [currentBusinessUnit, setCurrentBusinessUnit] = useState<BusinessUnit>(() => {
    if (safeBusinessUnits.length === 0) return fallbackBusinessUnit
    return safeBusinessUnits.find(unit => unit.id === initialTeam) || safeBusinessUnits[0]
  })
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  // File upload handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files || !enableFileUpload) return

    const newUploads: FileUpload[] = []
    
    Array.from(files).forEach(file => {
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxFileSize}MB.`)
        return
      }

      if (allowedFileTypes.length > 0 && !allowedFileTypes.some(type => file.type.match(type))) {
        alert(`File type ${file.type} is not allowed.`)
        return
      }

      const upload: FileUpload = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        status: 'pending',
        progress: 0
      }

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFileUploads(prev => prev.map(u => 
            u.id === upload.id 
              ? { ...u, preview: e.target?.result as string }
              : u
          ))
        }
        reader.readAsDataURL(file)
      }

      newUploads.push(upload)
    })

    setFileUploads(prev => [...prev, ...newUploads])
  }

  const removeFileUpload = (id: string) => {
    setFileUploads(prev => prev.filter(upload => upload.id !== id))
  }

  const handleSendMessage = () => {
    if (!currentInput.trim() && fileUploads.length === 0) return

    if (chatHook) {
      // Convert FileUpload[] to FileList for AI SDK
      const fileList = fileUploads.length > 0 ? createFileList(fileUploads.map(upload => upload.file)) : undefined
      
      // Use the AI SDK's sendMessage method with files
      chatHook.sendMessage(
        { text: currentInput, files: fileList },
        // Optional: Add custom body fields if needed
        {
          body: {
            // Add any additional data you want to send to your API
            timestamp: Date.now(),
            // You can add other metadata here
          }
        }
      )
      
      setLocalInput('') // Clear the local input
    } else {
      // Fallback for demo/testing purposes
      console.log("Message to send:", currentInput)
      console.log("Files to upload:", fileUploads)

      setLocalInput("")
      setIsTyping(true)

      // Simulate typing indicator
      setTimeout(() => {
        setIsTyping(false)
      }, 1500)
    }

    setFileUploads([])
  }

  // Helper function to create a FileList from File objects
  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer()
    files.forEach(file => dataTransfer.items.add(file))
    return dataTransfer.files
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleInputChange = (value: string) => {
    // Always use local state for input since useChat doesn't manage input
    setLocalInput(value)
  }

  const handleBusinessUnitChangeInternal = (unit: BusinessUnit) => {
    if (unit) {
      setCurrentBusinessUnit(unit)
      onBusinessUnitChange?.(unit)
    }
  }


  return (
    <DigitalColleageusLayout
      sidebarItems={sidebarItems || []}
      title={title}
      notifications={notifications || []}
      businessUnits={safeBusinessUnits}
      currentBusinessUnit={currentBusinessUnit}
      onBusinessUnitChange={handleBusinessUnitChangeInternal}
      onSearch={onSearch}
      showTabs={false}
      onActionClick={onActionClick}
      actionIcon={actionIcon}
      actionText={actionText}
      onNotificationRemove={onNotificationRemove}
      onRemoveAll={onRemoveAll}
      logo={logo}
      appName={appName}
      tagline={tagline}
      sidebarInitiallyClosed={sidebarInitiallyClosed}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="flex-1 h-full"
          key="chat-interface"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-full flex">
            <div className="w-80 flex-shrink-0 h-full p-2">
              <ChatSessionSidebar
                sessions={sessions || []}
                currentSession={currentSession}
                teams={safeBusinessUnits}
                onNewChat={onNewChat}
                onSessionSelect={onSessionSelect}
                onSessionEdit={onSessionEdit}
                onSessionDelete={onSessionDelete}
              />
            </div>
            <div className="flex-1 h-full p-2">
              <ChatInterface
                messages={currentMessages || []}
                input={currentInput}
                isTyping={currentIsLoading}
                currentSessionTitle={currentSession?.title}
                capabilities={capabilities || []}
                onInputChange={handleInputChange}
                addToolResult={addToolResult}
                onSendMessage={handleSendMessage}
                onKeyPress={handleKeyPress}
                fileUploads={fileUploads}
                isDragOver={isDragOver}
                enableFileUpload={enableFileUpload}
                onFileUpload={handleFileUpload}
                onRemoveFile={removeFileUpload}
                onDragOver={setIsDragOver}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </DigitalColleageusLayout>
  )
}
