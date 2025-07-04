"use client"

import type React from "react"

import { useState } from "react"
import { EnhancedHeader } from "./enhanced-header"
import { TeamSwitcherBar } from "./team-switcher-bar"
import { ChatSessionSidebar, type ChatSession } from "./chat-session-sidebar"
import { AIChatInterface, type ChatMessage } from "./ai-chat-interface"
import { businessUnits } from "./business-units"

const mockChatSessions: ChatSession[] = [
  {
    id: "1",
    title: "Logo Design Review",
    lastMessage: "The color palette looks great! Let's refine the typography...",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    teamId: "design",
  },
  {
    id: "2",
    title: "React Component Optimization",
    lastMessage: "Here's how you can improve the performance of your component...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    teamId: "engineering",
  },
  {
    id: "3",
    title: "Campaign Strategy Discussion",
    lastMessage: "The target audience analysis shows promising results...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    teamId: "marketing",
  },
  {
    id: "4",
    title: "Product Roadmap Planning",
    lastMessage: "Based on user feedback, I recommend prioritizing...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    teamId: "product",
  },
]

export default function LandingPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hi! I'm your AI assistant. What would you like to work on today?",
      type: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(businessUnits[0])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(mockChatSessions)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      type: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Great! I can help you with ${selectedTeam.name.toLowerCase()} tasks. What specific area would you like to focus on?`,
        `As your ${selectedTeam.name} assistant, I'm here to help. Let me provide some suggestions for your project.`,
        `Perfect! I understand you're working on ${selectedTeam.name.toLowerCase()}. Here are some recommendations...`,
        `I can definitely assist with that ${selectedTeam.name.toLowerCase()} task. Let me break it down for you.`,
      ]

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        type: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startNewChat = () => {
    setCurrentSession(null)
    setMessages([
      {
        id: "1",
        content: `Hi! I'm your ${selectedTeam.name} AI assistant. What would you like to work on today?`,
        type: "ai",
        timestamp: new Date(),
      },
    ])
  }

  const loadChatSession = (session: ChatSession) => {
    setCurrentSession(session)
    const team = businessUnits.find((unit) => unit.id === session.teamId) || businessUnits[0]
    setSelectedTeam(team)
    // In a real app, you'd load the actual messages from the session
    setMessages([
      {
        id: "1",
        content: session.lastMessage,
        type: "ai",
        timestamp: session.timestamp,
      },
    ])
  }

  const deleteChatSession = (sessionId: string) => {
    setChatSessions((prev) => prev.filter((session) => session.id !== sessionId))
    if (currentSession?.id === sessionId) {
      startNewChat()
    }
  }

  const editChatSession = (sessionId: string) => {
    console.log("Edit session:", sessionId)
    // Implement edit functionality
  }

  const getQuickSuggestions = () => {
    const suggestions = {
      design: [
        { label: "Create logo", action: () => setInput("Help me create a logo design") },
        { label: "Review mockups", action: () => setInput("Review my design mockups") },
        { label: "Color palette", action: () => setInput("Color palette suggestions") },
      ],
      engineering: [
        { label: "Code review", action: () => setInput("Review my code") },
        { label: "Debug help", action: () => setInput("Help debug this issue") },
        { label: "Performance", action: () => setInput("Optimize performance") },
      ],
      marketing: [
        { label: "Campaign ideas", action: () => setInput("Create campaign ideas") },
        { label: "Social content", action: () => setInput("Write social media content") },
        { label: "Analytics", action: () => setInput("Analyze metrics") },
      ],
      product: [
        { label: "User feedback", action: () => setInput("Analyze user feedback") },
        { label: "Roadmap", action: () => setInput("Create product roadmap") },
        { label: "Features", action: () => setInput("Prioritize features") },
      ],
    }

    return suggestions[selectedTeam.id as keyof typeof suggestions] || []
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader
        onSearchClick={() => console.log("Search clicked")}
        onNotificationClick={() => console.log("Notifications clicked")}
        onSettingsClick={() => console.log("Settings clicked")}
        hasNotifications={true}
      />

      <TeamSwitcherBar
        teams={businessUnits}
        selectedTeam={selectedTeam}
        onTeamChange={setSelectedTeam}
        onDashboardClick={() => console.log("Dashboard clicked")}
      />

      <div className="container mx-auto px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <ChatSessionSidebar
              sessions={chatSessions}
              currentSession={currentSession}
              teams={businessUnits}
              onNewChat={startNewChat}
              onSessionSelect={loadChatSession}
              onSessionEdit={editChatSession}
              onSessionDelete={deleteChatSession}
            />
          </div>

          <div className="lg:col-span-3">
            <AIChatInterface
              messages={messages}
              input={input}
              isTyping={isTyping}
              selectedTeam={selectedTeam}
              currentSessionTitle={currentSession?.title}
              quickSuggestions={getQuickSuggestions()}
              onInputChange={setInput}
              onSendMessage={handleSendMessage}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
