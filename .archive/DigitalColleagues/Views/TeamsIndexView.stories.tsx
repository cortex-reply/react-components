import type { Meta, StoryObj } from "@storybook/react"
import TeamsIndexView from "./TeamsIndexView"
import { mockTeamSummary } from "../../DigitalColleagues/test-data"

const meta: Meta<typeof TeamsIndexView> = {
  title: "Digital Colleagues/Views/TeamsIndexView",
  component: TeamsIndexView,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onCreateTeam: { action: "create-team" },
    onTeamOpen: { action: "team-open" },
  },
}

export default meta
type Story = StoryObj<typeof TeamsIndexView>

export const Default: Story = {
  args: {
    teams: mockTeamSummary,
  },
}

export const Empty: Story = {
  args: {
    teams: [],
  },
}

export const SingleTeam: Story = {
  args: {
    teams: [mockTeamSummary[0]],
  },
}

export const ManyTeams: Story = {
  args: {
    teams: mockTeamSummary,
  },
}
