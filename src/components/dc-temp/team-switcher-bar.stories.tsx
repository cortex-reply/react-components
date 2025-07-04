import type { Meta, StoryObj } from "@storybook/react"
import { TeamSwitcherBar } from "./team-switcher-bar"
import { businessUnits } from "./business-units"

const meta: Meta<typeof TeamSwitcherBar> = {
  title: "DC/TeamSwitcherBar",
  component: TeamSwitcherBar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onTeamChange: { action: "team changed" },
    onDashboardClick: { action: "dashboard clicked" },
  },
}

export default meta
type Story = StoryObj<typeof TeamSwitcherBar>

export const Default: Story = {
  args: {
    teams: businessUnits,
    selectedTeam: businessUnits[0], // Design team
  },
}

export const EngineeringSelected: Story = {
  args: {
    teams: businessUnits,
    selectedTeam: businessUnits[1], // Engineering team
  },
}

export const MarketingSelected: Story = {
  args: {
    teams: businessUnits,
    selectedTeam: businessUnits[2], // Marketing team
  },
}

export const LimitedTeams: Story = {
  args: {
    teams: businessUnits.slice(0, 4),
    selectedTeam: businessUnits[0],
  },
}
