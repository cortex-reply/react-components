import type { Meta, StoryObj } from "@storybook/react"
import { BusinessUnitSwitcher } from "./business-unit-switcher"
import { businessUnits } from "./business-units"

const meta: Meta<typeof BusinessUnitSwitcher> = {
  title: "DC/BusinessUnitSwitcher",
  component: BusinessUnitSwitcher,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof BusinessUnitSwitcher>

export const Default: Story = {
  args: {
    currentUnit: businessUnits[0], // Design unit
    onUnitChange: (unit) => console.log("Unit changed to:", unit.name),
  },
}

export const Engineering: Story = {
  args: {
    currentUnit: businessUnits[1], // Engineering unit
    onUnitChange: (unit) => console.log("Unit changed to:", unit.name),
  },
}

export const Marketing: Story = {
  args: {
    currentUnit: businessUnits[2], // Marketing unit
    onUnitChange: (unit) => console.log("Unit changed to:", unit.name),
  },
}
