import React from 'react'
import { DigitalColleagueSelection } from './digital-colleague-selection'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { digitalColleaguesData } from './test-data'

const meta: Meta<typeof DigitalColleagueSelection> = {
  title: 'Foundry/DigitalColleagueSelection',
  component: DigitalColleagueSelection,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof DigitalColleagueSelection>

export const Default: Story = {
  args: {
    digitalColleagues: digitalColleaguesData,
    onColleagueSelect: action('onColleagueSelect'),
    onCancel: action('onCancel'),
  },
}

export const Empty: Story = {
  args: {
    digitalColleagues: [],
    onColleagueSelect: action('onColleagueSelect'),
    onCancel: action('onCancel'),
  },
}

export const SingleColleague: Story = {
  args: {
    digitalColleagues: [digitalColleaguesData[0]],
    onColleagueSelect: action('onColleagueSelect'),
    onCancel: action('onCancel'),
  },
}
