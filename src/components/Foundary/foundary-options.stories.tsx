import React from 'react'
import { DigitalColleagueOptions } from './foundary-options'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DigitalColleagueOptions> = {
  title: 'Foundary/DigitalColleagueOptions',
  component: DigitalColleagueOptions,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof DigitalColleagueOptions>

export const Default: Story = {
  args: {
    onCloneExisting: action('onCloneExisting'),
    onCreateNew: action('onCreateNew'),
    onCancel: action('onCancel'),
  },
}
