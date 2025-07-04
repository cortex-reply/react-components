import type { Meta, StoryObj } from "@storybook/react"
import { AIChat } from "./ai-chat"
import { aiAssistants } from "./ai-assistants"

const meta: Meta<typeof AIChat> = {
  title: "Components/AIChat",
  component: AIChat,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof AIChat>

const sampleMessages = [
  {
    id: "1",
    content: "Hi there! I'm your design assistant. How can I help you today?",
    type: "ai" as const,
    timestamp: new Date(),
    assistantId: "design",
  },
  {
    id: "2",
    content: "I need help with a logo design for my new startup.",
    type: "user" as const,
    timestamp: new Date(),
  },
  {
    id: "3",
    content:
      "Great! I'd be happy to help with your logo design. Could you tell me more about your startup? What industry are you in, and what values or message would you like your logo to convey?",
    type: "ai" as const,
    timestamp: new Date(),
    assistantId: "design",
  },
  {
    id: "4",
    content: "It's a tech startup focused on sustainable energy solutions. We want something modern but approachable.",
    type: "user" as const,
    timestamp: new Date(),
  },
  {
    id: "5",
    content:
      "For a sustainable energy tech startup, I'd recommend a clean, modern design with elements that suggest innovation and environmental consciousness. Consider using blues and greens in your color palette to represent technology and sustainability. Would you like me to suggest some specific design directions?",
    type: "ai" as const,
    timestamp: new Date(),
    assistantId: "design",
  },
]

export const Default: Story = {
  args: {
    messages: sampleMessages,
    onSendMessage: (message) => console.log("Message sent:", message),
    isLoading: false,
    assistants: aiAssistants,
    currentAssistant: aiAssistants[0],
    onChangeAssistant: (assistant) => console.log("Assistant changed:", assistant.name),
  },
}

export const Empty: Story = {
  args: {
    messages: [],
    onSendMessage: (message) => console.log("Message sent:", message),
    isLoading: false,
    assistants: aiAssistants,
    currentAssistant: aiAssistants[0],
    onChangeAssistant: (assistant) => console.log("Assistant changed:", assistant.name),
  },
}

export const Loading: Story = {
  args: {
    messages: [
      ...sampleMessages,
      {
        id: "6",
        content: "Yes, please suggest some specific design directions.",
        type: "user" as const,
        timestamp: new Date(),
      },
      {
        id: "7",
        content: "",
        type: "ai" as const,
        timestamp: new Date(),
        isLoading: true,
        assistantId: "design",
      },
    ],
    onSendMessage: (message) => console.log("Message sent:", message),
    isLoading: true,
    assistants: aiAssistants,
    currentAssistant: aiAssistants[0],
    onChangeAssistant: (assistant) => console.log("Assistant changed:", assistant.name),
  },
}

export const ITAssistant: Story = {
  args: {
    messages: [
      {
        id: "1",
        content: "Hi there! I'm your IT support assistant. Having technical issues I can help with?",
        type: "ai" as const,
        timestamp: new Date(),
        assistantId: "it",
      },
      {
        id: "2",
        content: "I can't connect to the company VPN. It keeps timing out.",
        type: "user" as const,
        timestamp: new Date(),
      },
      {
        id: "3",
        content:
          "I'll help you troubleshoot that VPN issue. First, let's check if your credentials are still valid. When was the last time you changed your password? Also, are you using the GlobalConnect app or a different VPN client?",
        type: "ai" as const,
        timestamp: new Date(),
        assistantId: "it",
      },
    ],
    onSendMessage: (message) => console.log("Message sent:", message),
    isLoading: false,
    assistants: aiAssistants,
    currentAssistant: aiAssistants[3], // IT Assistant
    onChangeAssistant: (assistant) => console.log("Assistant changed:", assistant.name),
  },
}
