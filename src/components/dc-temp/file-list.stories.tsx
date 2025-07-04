import type { Meta, StoryObj } from "@storybook/react"
import { FileList } from "./file-list"
import { mockRecentFiles } from "./mock-data"

const meta: Meta<typeof FileList> = {
  title: "DC/FileList",
  component: FileList,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    showHeader: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof FileList>

export const Default: Story = {
  args: {
    files: mockRecentFiles,
    showHeader: true,
    onFileClick: (file) => console.log("File clicked:", file.name),
    onShare: (file) => console.log("Share file:", file.name),
  },
}

export const WithoutHeader: Story = {
  args: {
    files: mockRecentFiles.slice(0, 4),
    showHeader: false,
    onFileClick: (file) => console.log("File clicked:", file.name),
    onShare: (file) => console.log("Share file:", file.name),
  },
}

export const Empty: Story = {
  args: {
    files: [],
    showHeader: true,
    onFileClick: (file) => console.log("File clicked:", file.name),
    onShare: (file) => console.log("Share file:", file.name),
  },
}
