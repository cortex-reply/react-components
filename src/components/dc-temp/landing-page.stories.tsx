import type { Meta, StoryObj } from "@storybook/react"
import LandingPage from "./landingpage"

const meta: Meta<typeof LandingPage> = {
  title: "DC/LandingPage",
  component: LandingPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof LandingPage>

export const Default: Story = {}

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
}
