import type { Meta, StoryObj } from "@storybook/react"
import { ThemeToggle } from "./theme-toggle"
import { ThemeProvider } from "./theme-provider"

const meta: Meta<typeof ThemeToggle> = {
  title: "DC/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {}
