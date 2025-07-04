import type { Meta, StoryObj } from "@storybook/react"
import AssistantInterface from "./AssistantInterface"

const meta: Meta<typeof AssistantInterface> = {
  title: "DC/AssistantInterface",
  component: AssistantInterface,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof AssistantInterface>

export const Default: Story = {}

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
}
