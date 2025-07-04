import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { ColleagueForm } from "./colleague-form"
import { mockColleagues } from "./colleagues"

const meta: Meta<typeof ColleagueForm> = {
  title: "DC/ColleagueForm",
  component: ColleagueForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive form for creating and editing colleague information, supporting both human and digital colleagues.",
      },
    },
  },
  argTypes: {
    colleague: {
      description: "Existing colleague data for editing (optional)",
    },
    onSave: {
      description: "Callback when form is submitted",
      action: "save",
    },
    onCancel: {
      description: "Callback when form is cancelled",
      action: "cancel",
    },
    departments: {
      description: "Available departments for selection",
      control: "object",
    },
    isLoading: {
      description: "Whether the form is in loading state",
      control: "boolean",
    },
    title: {
      description: "Custom form title",
      control: "text",
    },
    submitLabel: {
      description: "Custom submit button label",
      control: "text",
    },
    cancelLabel: {
      description: "Custom cancel button label",
      control: "text",
    },
  },
  args: {
    onSave: action("save"),
    onCancel: action("cancel"),
    departments: ["Design", "Engineering", "Marketing", "Product", "Sales", "Operations"],
    isLoading: false,
    cancelLabel: "Cancel",
  },
}

export default meta
type Story = StoryObj<typeof ColleagueForm>

export const NewHumanColleague: Story = {
  args: {},
}

export const NewDigitalColleague: Story = {
  args: {
    colleague: {
      id: "",
      type: "digital",
      name: "",
      email: "",
      role: "",
      department: "",
      status: "active",
      joinedDate: new Date(),
      jobDescription: "",
      workInstructions: [],
      capabilities: [],
      knowledge: [],
      coreKnowledge: [],
      version: "1.0.0",
      lastUpdated: new Date(),
      isActive: true,
    },
  },
}

export const EditHumanColleague: Story = {
  args: {
    colleague: mockColleagues[0], // Sarah Johnson
    title: "Edit Team Member",
    submitLabel: "Update Member",
  },
}

export const EditDigitalColleague: Story = {
  args: {
    colleague: mockColleagues[1], // CodeAssist Pro
    title: "Edit Digital Assistant",
    submitLabel: "Update Assistant",
  },
}

export const LoadingState: Story = {
  args: {
    colleague: mockColleagues[0],
    isLoading: true,
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
    ],
  },
}

export const MinimalForm: Story = {
  args: {
    title: "Quick Add",
    submitLabel: "Add Now",
    cancelLabel: "Skip",
  },
}

export const WithPrefilledData: Story = {
  args: {
    colleague: {
      id: "",
      type: "human",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "Frontend Developer",
      department: "Engineering",
      status: "active",
      joinedDate: new Date(),
      phone: "+1 (555) 123-4567",
      location: "Remote",
      timezone: "EST",
      skills: ["React", "TypeScript", "CSS"],
      bio: "Experienced frontend developer with a passion for user experience.",
    },
  },
}

export const DigitalWithExtensiveData: Story = {
  args: {
    colleague: {
      ...mockColleagues[1],
      workInstructions: [
        "Review pull requests for code quality",
        "Generate comprehensive documentation",
        "Assist with debugging complex issues",
        "Provide code suggestions and optimizations",
        "Monitor system performance",
        "Generate automated test cases",
      ],
      capabilities: [
        "Code Review",
        "Documentation Generation",
        "Debugging",
        "Code Optimization",
        "Testing",
        "Performance Monitoring",
        "Security Analysis",
        "API Design",
      ],
      knowledge: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Python",
        "Git",
        "Docker",
        "Kubernetes",
        "AWS",
        "MongoDB",
      ],
      coreKnowledge: [
        "Company coding standards",
        "Architecture patterns",
        "Security guidelines",
        "Performance best practices",
        "Testing strategies",
      ],
    },
  },
}

export const FormValidation: Story = {
  args: {
    colleague: {
      id: "",
      type: "human",
      name: "",
      email: "",
      role: "",
      department: "",
      status: "active",
      joinedDate: new Date(),
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Try submitting the form without filling required fields to see validation in action.",
      },
    },
  },
}
