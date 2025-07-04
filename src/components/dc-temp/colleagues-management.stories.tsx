import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { ColleaguesManagement } from "./colleagues-management"
import { mockColleagues } from "./colleagues"

const meta: Meta<typeof ColleaguesManagement> = {
  title: "DC/ColleaguesManagement",
  component: ColleaguesManagement,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive management interface for team colleagues, supporting both human and digital team members with full CRUD operations.",
      },
    },
  },
  argTypes: {
    initialColleagues: {
      description: "Initial list of colleagues to display",
    },
    onColleagueAdd: {
      description: "Callback when a new colleague is added",
      action: "colleagueAdd",
    },
    onColleagueEdit: {
      description: "Callback when a colleague is edited",
      action: "colleagueEdit",
    },
    onColleagueDelete: {
      description: "Callback when a colleague is deleted",
      action: "colleagueDelete",
    },
    onImport: {
      description: "Callback when import is triggered",
      action: "import",
    },
    onExport: {
      description: "Callback when export is triggered",
      action: "export",
    },
    showImportExport: {
      description: "Whether to show import/export buttons",
      control: "boolean",
    },
    compactView: {
      description: "Whether to use compact card view",
      control: "boolean",
    },
    departments: {
      description: "Available departments for filtering",
      control: "object",
    },
  },
  args: {
    initialColleagues: mockColleagues,
    onColleagueAdd: action("colleagueAdd"),
    onColleagueEdit: action("colleagueEdit"),
    onColleagueDelete: action("colleagueDelete"),
    onImport: action("import"),
    onExport: action("export"),
    showImportExport: true,
    compactView: false,
    departments: ["Design", "Engineering", "Marketing", "Product", "Sales", "Operations"],
  },
}

export default meta
type Story = StoryObj<typeof ColleaguesManagement>

export const Default: Story = {}

export const EmptyState: Story = {
  args: {
    initialColleagues: [],
  },
}

export const CompactView: Story = {
  args: {
    compactView: true,
  },
}

export const NoImportExport: Story = {
  args: {
    showImportExport: false,
  },
}

export const CustomDepartments: Story = {
  args: {
    departments: [
      "Frontend Development",
      "Backend Development",
      "DevOps",
      "Quality Assurance",
      "Data Science",
      "Machine Learning",
      "UI/UX Design",
      "Product Management",
    ],
  },
}

export const LargeTeam: Story = {
  args: {
    initialColleagues: [
      ...mockColleagues,
      ...Array.from({ length: 20 }, (_, i) => ({
        id: `generated-${i}`,
        type: Math.random() > 0.5 ? "human" : "digital",
        name: `Team Member ${i + 6}`,
        email: `member${i + 6}@company.com`,
        role: ["Developer", "Designer", "Manager", "Analyst"][Math.floor(Math.random() * 4)],
        department: ["Engineering", "Design", "Product", "Marketing"][Math.floor(Math.random() * 4)],
        status: ["active", "away", "inactive"][Math.floor(Math.random() * 3)] as "active" | "away" | "inactive",
        joinedDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        ...(Math.random() > 0.5
          ? {
              // Human colleague
              phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
              location: ["San Francisco, CA", "New York, NY", "Austin, TX", "Remote"][Math.floor(Math.random() * 4)],
              skills: ["JavaScript", "React", "Design", "Management"].slice(0, Math.floor(Math.random() * 4) + 1),
            }
          : {
              // Digital colleague
              jobDescription: "AI assistant for various tasks",
              workInstructions: ["Assist with tasks", "Provide support"],
              capabilities: ["Analysis", "Support", "Automation"],
              knowledge: ["Domain Knowledge", "Best Practices"],
              coreKnowledge: ["Company Policies"],
              version: "1.0.0",
              lastUpdated: new Date(),
              isActive: true,
            }),
      })),
    ],
  },
}

export const OnlyHumans: Story = {
  args: {
    initialColleagues: mockColleagues.filter((c) => c.type === "human"),
  },
}

export const OnlyDigital: Story = {
  args: {
    initialColleagues: mockColleagues.filter((c) => c.type === "digital"),
  },
}

export const MixedStatuses: Story = {
  args: {
    initialColleagues: mockColleagues.map((colleague, index) => ({
      ...colleague,
      status: (["active", "away", "inactive"] as const)[index % 3],
    })),
  },
}

export const SingleDepartment: Story = {
  args: {
    initialColleagues: mockColleagues.map((colleague) => ({
      ...colleague,
      department: "Engineering",
    })),
  },
}

export const WithPrefilledSearch: Story = {
  render: (args) => {
    // This would need to be implemented with state management in a real scenario
    return <ColleaguesManagement {...args} />
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Example showing how the component would look with search filters applied.",
      },
    },
  },
}

export const InteractiveDemo: Story = {
  render: (args) => (
    <div className="p-6">
      <ColleaguesManagement {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with full functionality. Try adding, editing, and deleting colleagues.",
      },
    },
  },
}
