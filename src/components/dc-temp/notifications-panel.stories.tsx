import type { Meta, StoryObj } from "@storybook/react"
import { NotificationsPanel } from "./notifications-panel"
import { mockNotifications } from "./mock-data"

const meta: Meta<typeof NotificationsPanel> = {
  title: "DC/NotificationsPanel",
  component: NotificationsPanel,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    open: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof NotificationsPanel>

export const Default: Story = {
  args: {
    notifications: mockNotifications,
    open: true,
    onClose: () => console.log("Close clicked"),
    onMarkAllAsRead: () => console.log("Mark all as read clicked"),
    onClearAll: () => console.log("Clear all clicked"),
  },
}

export const Empty: Story = {
  args: {
    notifications: [],
    open: true,
    onClose: () => console.log("Close clicked"),
    onMarkAllAsRead: () => console.log("Mark all as read clicked"),
    onClearAll: () => console.log("Clear all clicked"),
  },
}
