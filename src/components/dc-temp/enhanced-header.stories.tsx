import type { Meta, StoryObj } from "@storybook/react"
import { EnhancedHeader } from "./enhanced-header"

const meta: Meta<typeof EnhancedHeader> = {
  title: "DC/EnhancedHeader",
  component: EnhancedHeader,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    hasNotifications: {
      control: "boolean",
    },
    onSearchClick: { action: "search clicked" },
    onNotificationClick: { action: "notification clicked" },
    onSettingsClick: { action: "settings clicked" },
  },
}

export default meta
type Story = StoryObj<typeof EnhancedHeader>

export const Default: Story = {
  args: {
    title: "Cortex Reply",
    subtitle: "AI-Powered Assistant",
    hasNotifications: false,
    userFallback: "JD",
  },
}

export const WithNotifications: Story = {
  args: {
    title: "Cortex Reply",
    subtitle: "AI-Powered Assistant",
    hasNotifications: true,
    userFallback: "JD",
  },
}

export const CustomTitle: Story = {
  args: {
    title: "Design Studio",
    subtitle: "Creative AI Assistant",
    hasNotifications: true,
    userFallback: "DS",
  },
}

export const WithUserAvatar: Story = {
  args: {
    title: "Cortex Reply",
    subtitle: "AI-Powered Assistant",
    hasNotifications: false,
    userAvatar: "/placeholder.svg?height=40&width=40&text=User",
    userFallback: "U",
  },
}
