import type { Meta, StoryObj } from "@storybook/react"
import { ChatSessionSidebar, type ChatSession } from "./chat-session-sidebar"
import { businessUnits } from "./business-units"

const mockSessions: ChatSession[] = [
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

const meta: Meta<typeof ChatSessionSidebar> = {
  title: "DC/ChatSessionSidebar",
  component: ChatSessionSidebar,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    onNewChat: { action: "new chat clicked" },
    onSessionSelect: { action: "session selected" },
    onSessionEdit: { action: "session edited" },
    onSessionDelete: { action: "session deleted" },
  },
}

export default meta
type Story = StoryObj<typeof ChatSessionSidebar>

export const Default: Story = {
  args: {
    sessions: mockSessions,
    teams: businessUnits,
    currentSession: null,
  },
}

export const WithSelectedSession: Story = {
  args: {
    sessions: mockSessions,
    teams: businessUnits,
    currentSession: mockSessions[0],
  },
}

export const EmptySessions: Story = {
  args: {
    sessions: [],
    teams: businessUnits,
    currentSession: null,
  },
}

export const WithoutActions: Story = {
  args: {
    sessions: mockSessions,
    teams: businessUnits,
    currentSession: mockSessions[1],
    onSessionEdit: undefined,
    onSessionDelete: undefined,
  },
}

export const SingleSession: Story = {
  args: {
    sessions: [mockSessions[0]],
    teams: businessUnits,
    currentSession: mockSessions[0],
  },
}
