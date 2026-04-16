/**
 * Example: Using CopilotInterface with Vercel AI SDK
 * 
 * This example shows how to integrate the CopilotInterface component
 * with the Vercel AI SDK's useChat hook for real AI conversations.
 */

'use client'

import { useChat } from '@ai-sdk/react'
import { CopilotInterface } from './CopilotInterface'
import { businessUnits, mockSidebarItems, mockNotifications } from '../Foundry/test-data'
import { testCapabilities as capabilities } from '../../test-data/capabilities'

// Mock chat sessions for demo
const mockChatSessions = [
  {
    id: "1",
    title: "AI Assistant Chat",
    lastMessage: "How can I help you today?",
  },
]

/**
 * Simplest usage - AI is enabled by default
 */
export function SimpleAICopilot() {
  return (
    <CopilotInterface
      businessUnits={businessUnits}
      capabilities={capabilities}
      sidebarItems={mockSidebarItems}
      notifications={mockNotifications}
      sessions={mockChatSessions}
      onNewChat={() => console.log('New chat started')}
      onSessionSelect={(session) => console.log('Session selected:', session)}
      onSessionDelete={(sessionId) => console.log('Session deleted:', sessionId)}
      title="AI-Powered Copilot"
    />
  )
}

/**
 * With custom AI configuration
 */
export function CustomAICopilot() {
  return (
    <CopilotInterface
      aiConfig={{
        // Custom AI configuration
        onError: (error) => console.error('Chat error:', error),
        // Add other useChat options here
      }}
      businessUnits={businessUnits}
      capabilities={capabilities}
      sidebarItems={mockSidebarItems}
      notifications={mockNotifications}
      sessions={mockChatSessions}
      onNewChat={() => console.log('New chat started')}
      onSessionSelect={(session) => console.log('Session selected:', session)}
      onSessionDelete={(sessionId) => console.log('Session deleted:', sessionId)}
      title="Custom AI Copilot"
    />
  )
}

/**
 * Disable AI for demo/testing
 */
export function DemoCopilot() {
  const demoMessages = [
    {
      id: '1',
      role: 'assistant' as const,
      parts: [{ type: 'text' as const, text: 'This is demo mode - no AI involved!' }]
    }
  ]

  return (
    <CopilotInterface
      enableAI={false}
      messages={demoMessages}
      businessUnits={businessUnits}
      capabilities={capabilities}
      sidebarItems={mockSidebarItems}
      notifications={mockNotifications}
      sessions={mockChatSessions}
      onNewChat={() => console.log('New chat started')}
      onSessionSelect={(session) => console.log('Session selected:', session)}
      onSessionDelete={(sessionId) => console.log('Session deleted:', sessionId)}
      title="Demo Copilot"
    />
  )
}

/**
 * Advanced: Custom chat hook management
 */
export function AdvancedAICopilot() {
  const customChat = useChat({
    // Your custom configuration
    onError: (error) => console.error('Custom chat error:', error),
  })

  return (
    <CopilotInterface
      useCustomChat={customChat}
      businessUnits={businessUnits}
      capabilities={capabilities}
      sidebarItems={mockSidebarItems}
      notifications={mockNotifications}
      sessions={mockChatSessions}
      onNewChat={() => {
        customChat.setMessages([])
        console.log('New chat started - messages cleared')
      }}
      onSessionSelect={(session) => console.log('Session selected:', session)}
      onSessionDelete={(sessionId) => console.log('Session deleted:', sessionId)}
      title="Advanced AI Copilot"
    />
  )
}

/**
 * Focused chat experience with sidebar initially closed
 */
export function FocusedChatCopilot() {
  return (
    <CopilotInterface
      // AI enabled by default
      sidebarInitiallyClosed={true}
      businessUnits={businessUnits}
      capabilities={capabilities}
      sidebarItems={mockSidebarItems}
      notifications={mockNotifications}
      sessions={mockChatSessions}
      onNewChat={() => console.log('New chat started')}
      onSessionSelect={(session) => console.log('Session selected:', session)}
      onSessionDelete={(sessionId) => console.log('Session deleted:', sessionId)}
      title="Focused AI Chat"
    />
  )
}

/**
 * With file upload capabilities
 */
export function FileUploadAICopilot() {
  // Custom useChat hook with specific configuration for file handling
  const customChat = useChat({
    // Custom configuration for file uploads
    onError: (error) => console.error('File upload chat error:', error),
    onFinish: (message) => console.log('Message with files completed:', message),
  })

  return (
    <CopilotInterface
      useCustomChat={customChat}
      enableAI={true}
      enableFileUpload={true}
      maxFileSize={10} // 10MB limit
      allowedFileTypes={['image/*', 'text/*', 'application/pdf']}
      businessUnits={businessUnits}
      capabilities={capabilities}
      sidebarItems={mockSidebarItems}
      notifications={mockNotifications}
      sessions={mockChatSessions}
      onNewChat={() => {
        customChat.setMessages([])
        console.log('New file upload chat started - messages cleared')
      }}
      onSessionSelect={(session) => console.log('Session selected:', session)}
      onSessionDelete={(sessionId) => console.log('Session deleted:', sessionId)}
      title="AI Copilot with File Uploads"
    />
  )
}

/**
 * Required API Route Example
 * 
 * Create this file at: app/api/chat/route.ts (App Router) or pages/api/chat.ts (Pages Router)
 * 
 * ```typescript
 * import { openai } from '@ai-sdk/openai'
 * import { streamText } from 'ai'
 * 
 * export async function POST(req: Request) {
 *   const { messages } = await req.json()
 * 
 *   const result = await streamText({
 *     model: openai('gpt-4-turbo'),
 *     messages,
 *   })
 * 
 *   return result.toDataStreamResponse()
 * }
 * ```
 */
