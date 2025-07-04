import type { Meta, StoryObj } from "@storybook/react"
import { CreativeLayout } from "./creative-layout"
import { mockSidebarItems, mockNotifications } from "./mock-data"
import { businessUnits } from "./business-units"

const meta: Meta<typeof CreativeLayout> = {
  title: "DC/CreativeLayout",
  component: CreativeLayout,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    notifications: {
      control: { type: "number", min: 0, max: 99 },
    },
  },
}

export default meta
type Story = StoryObj<typeof CreativeLayout>

export const Default: Story = {
  args: {
    sidebarItems: mockSidebarItems,
    title: "Digital Colleagues",
    notifications: mockNotifications,
    businessUnits,
    children: (
      <div className="space-y-6">
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Welcome to Digital Colleagues Suite</h2>
          <p className="text-white/80">This is a sample content area to demonstrate the layout.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl border p-6">
              <h3 className="font-semibold mb-2">Sample Card {i}</h3>
              <p className="text-muted-foreground">This is sample content for demonstration purposes.</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
}

export const NoNotifications: Story = {
  args: {
    sidebarItems: mockSidebarItems,
    title: "Digital Colleagues",
    notifications: mockNotifications,
    businessUnits,
    children: (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Clean Layout</h2>
        <p className="text-muted-foreground">Layout without notifications</p>
      </div>
    ),
  },
}
