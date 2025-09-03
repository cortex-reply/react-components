import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { ColleagueCard } from "./colleague-card"
import { mockColleagues } from "./test-data"

const meta: Meta<typeof ColleagueCard> = {
  title: "Digital Colleagues/ColleagueCard",
  component: ColleagueCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A card component for displaying colleague information with actions and status indicators.",
      },
    },
  },
  argTypes: {
    colleague: {
      description: "The colleague data to display",
    },
    onEdit: {
      description: "Callback when edit action is triggered",
      action: "edit",
    },
    onDelete: {
      description: "Callback when delete action is triggered",
      action: "delete",
    },
    onViewDetails: {
      description: "Callback when view details action is triggered",
      action: "viewDetails",
    },
    showActions: {
      description: "Whether to show the actions dropdown",
      control: "boolean",
    },
    compact: {
      description: "Whether to show a compact version of the card",
      control: "boolean",
    },
  },
  args: {
    onEdit: action("edit"),
    onDelete: action("delete"),
    onViewDetails: action("viewDetails"),
    showActions: true,
    compact: false,
  },
}

export default meta
type Story = StoryObj<typeof ColleagueCard>

export const HumanColleague: Story = {
  args: {
    colleague: mockColleagues[0], // Sarah Johnson
  },
}

export const DigitalColleague: Story = {
  args: {
    colleague: mockColleagues[1], // CodeAssist Pro
  },
}

export const AwayStatus: Story = {
  args: {
    colleague: mockColleagues[2], // Michael Chen (away)
  },
}

export const InactiveStatus: Story = {
  args: {
    colleague: mockColleagues[4], // Emily Rodriguez (inactive)
  },
}

export const CompactView: Story = {
  args: {
    colleague: mockColleagues[0],
    compact: true,
  },
}

export const NoActions: Story = {
  args: {
    colleague: mockColleagues[0],
    showActions: false,
  },
}

export const WithManySkills: Story = {
  args: {
    colleague: {
      ...mockColleagues[0],
      // skills: [
      //   "UI/UX Design",
      //   "Figma",
      //   "Adobe Creative Suite",
      //   "Prototyping",
      //   "User Research",
      //   "Wireframing",
      //   "Design Systems",
      //   "Accessibility",
      //   "Mobile Design",
      //   "Web Design",
      // ],
    },
  },
}

export const DigitalWithManyCapabilities: Story = {
  args: {
    colleague: {
      ...mockColleagues[1],
      // capabilities: [
      //   "Code Review",
      //   "Documentation Generation",
      //   "Debugging",
      //   "Code Optimization",
      //   "Testing",
      //   "Refactoring",
      //   "Performance Analysis",
      //   "Security Scanning",
      //   "API Design",
      //   "Database Optimization",
      // ],
    },
  },
}

export const MinimalData: Story = {
  args: {
    colleague: {
      id: "minimal",
      type: "human",
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Developer",
      department: "Engineering",
      status: "active",
      joinedDate: new Date(),
    },
  },
}

export const LongNames: Story = {
  args: {
    colleague: {
      ...mockColleagues[0],
      name: "Sarah Elizabeth Johnson-Smith",
      // role: "Senior Principal UX/UI Designer and Researcher",
      // department: "Design and User Experience",
    },
  },
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
      {mockColleagues.map((colleague) => (
        <ColleagueCard
          key={colleague.id}
          colleague={colleague}
          onEdit={action("edit")}
          onDelete={action("delete")}
          onViewDetails={action("viewDetails")}
        />
      ))}
    </div>
  ),
  parameters: {
    layout: "padded",
  },
}

export const CompactGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 max-w-6xl">
      {mockColleagues.map((colleague) => (
        <ColleagueCard
          key={colleague.id}
          colleague={colleague}
          compact={true}
          onEdit={action("edit")}
          onDelete={action("delete")}
          onViewDetails={action("viewDetails")}
        />
      ))}
    </div>
  ),
  parameters: {
    layout: "padded",
  },
}
