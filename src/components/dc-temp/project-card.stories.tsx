import type { Meta, StoryObj } from "@storybook/react"
import { ProjectCard } from "./project-card"

const meta: Meta<typeof ProjectCard> = {
  title: "DC/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof ProjectCard>

const sampleProject = {
  name: "Website Redesign",
  description: "Complete overhaul of company website",
  progress: 75,
  dueDate: "June 15, 2025",
  members: 4,
  files: 23,
}

const highProgressProject = {
  name: "Brand Identity",
  description: "New brand guidelines and assets",
  progress: 90,
  dueDate: "May 25, 2025",
  members: 3,
  files: 18,
}

const lowProgressProject = {
  name: "Marketing Campaign",
  description: "Summer promotion materials",
  progress: 40,
  dueDate: "August 10, 2025",
  members: 5,
  files: 31,
}

export const Default: Story = {
  args: {
    project: sampleProject,
    onOpen: (project) => console.log("Open project:", project.name),
    onShare: (project) => console.log("Share project:", project.name),
  },
}

export const HighProgress: Story = {
  args: {
    project: highProgressProject,
    onOpen: (project) => console.log("Open project:", project.name),
    onShare: (project) => console.log("Share project:", project.name),
  },
}

export const LowProgress: Story = {
  args: {
    project: lowProgressProject,
    onOpen: (project) => console.log("Open project:", project.name),
    onShare: (project) => console.log("Share project:", project.name),
  },
}
