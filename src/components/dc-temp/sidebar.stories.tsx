import type { Meta, StoryObj } from "@storybook/react"
import { Sidebar } from "./sidebar"
import { mockSidebarItems } from "./mock-data"

const meta: Meta<typeof Sidebar> = {
  title: "DC/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
    },
    isMobile: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    items: mockSidebarItems,
    isOpen: true,
    isMobile: false,
  },
}

export const Mobile: Story = {
  args: {
    items: mockSidebarItems,
    isOpen: true,
    isMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
}

export const Closed: Story = {
  args: {
    items: mockSidebarItems,
    isOpen: false,
    isMobile: false,
  },
}
