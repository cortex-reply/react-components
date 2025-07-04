import type { Meta, StoryObj } from "@storybook/react"
import { AIChatInterface, type ChatMessage } from "./ai-chat-interface"
import { businessUnits } from "./business-units"

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Hi! I'm your AI assistant. What would you like to work on today?",
    type: "ai",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    content: "I need help creating a logo for my startup",
    type: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: "3",
    content:
      "Great! I'd be happy to help you create a logo. Could you tell me more about your startup? What industry are you in, and what values would you like your logo to convey?",
    type: "ai",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
]

const designSuggestions = [
  { label: "Create logo", action: () => console.log("Create logo clicked") },
  { label: "Review mockups", action: () => console.log("Review mockups clicked") },
  { label: "Color palette", action: () => console.log("Color palette clicked") },
]

const engineeringSuggestions = [
  { label: "Code review", action: () => console.log("Code review clicked") },
  { label: "Debug help", action: () => console.log("Debug help clicked") },
  { label: "Performance", action: () => console.log("Performance clicked") },
]

const meta: Meta<typeof AIChatInterface> = {
  title: "DC/AIChatInterface",
  component: AIChatInterface,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    onInputChange: { action: "input changed" },
    onSendMessage: { action: "message sent" },
    onKeyPress: { action: "key pressed" },
  },
}

export default meta
type Story = StoryObj<typeof AIChatInterface>

export const Default: Story = {
  args: {
    messages: mockMessages,
    input: "",
    isTyping: false,
    selectedTeam: businessUnits[0], // Design team
    quickSuggestions: designSuggestions,
  },
}

export const WithTyping: Story = {
  args: {
    messages: [
      ...mockMessages,
      {
        id: "4",
        content: "It's a tech startup focused on sustainable energy solutions.",
        type: "user",
        timestamp: new Date(),
      },
    ],
    input: "",
    isTyping: true,
    selectedTeam: businessUnits[0],
    quickSuggestions: designSuggestions,
  },
}

export const EngineeringTeam: Story = {
  args: {
    messages: [
      {
        id: "1",
        content: "Hi! I'm your Engineering AI assistant. How can I help you with your code today?",
        type: "ai",
        timestamp: new Date(),
      },
    ],
    input: "Help me optimize this React component",
    isTyping: false,
    selectedTeam: businessUnits[1], // Engineering team
    quickSuggestions: engineeringSuggestions,
  },
}

export const WithSessionTitle: Story = {
  args: {
    messages: mockMessages,
    input: "",
    isTyping: false,
    selectedTeam: businessUnits[0],
    currentSessionTitle: "Logo Design Review",
    quickSuggestions: designSuggestions,
  },
}

export const EmptyChat: Story = {
  args: {
    messages: [
      {
        id: "1",
        content: "Hi! I'm your AI assistant. What would you like to work on today?",
        type: "ai",
        timestamp: new Date(),
      },
    ],
    input: "",
    isTyping: false,
    selectedTeam: businessUnits[2], // Marketing team
    quickSuggestions: [
      { label: "Campaign ideas", action: () => console.log("Campaign ideas clicked") },
      { label: "Social content", action: () => console.log("Social content clicked") },
      { label: "Analytics", action: () => console.log("Analytics clicked") },
    ],
  },
}

export const NoSuggestions: Story = {
  args: {
    messages: mockMessages,
    input: "",
    isTyping: false,
    selectedTeam: businessUnits[0],
    quickSuggestions: [],
  },
}
