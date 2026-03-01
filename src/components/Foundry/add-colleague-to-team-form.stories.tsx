import React from 'react'
import { AddColleagueToTeamForm } from './add-colleague-to-team-form'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { mockDigitalColleagues } from './test-data'
import type { DigitalColleague, Team } from './types'

const meta: Meta<typeof AddColleagueToTeamForm> = {
  title: 'Foundry/AddColleagueToTeamForm',
  component: AddColleagueToTeamForm,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof AddColleagueToTeamForm>

// Use the first digital colleague from test data
const selectedColleague: DigitalColleague = mockDigitalColleagues[0]

// Mock team data
const mockTeam: Team = {
  id: 1,
  name: 'Product Development',
  description: 'Core product development team responsible for building and maintaining our main platform',
  systemMsg: 'Focus on quality, collaboration, and user-centric design.',
  members: [
    {
      relationTo: 'users',
      value: 'user-1',
    },
  ],
  useProjects: true,
  useKnowledge: true,
  useFiles: true,
  useChat: true,
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
}

const mockTeamWithColleague: Team = {
  ...mockTeam,
  id: 2,
  name: 'Marketing',
  description: 'Growth and marketing team driving customer acquisition and retention',
  members: [
    {
      relationTo: 'digital-colleagues',
      value: mockDigitalColleagues[0].id,
    },
  ],
}

export const Default: Story = {
  args: {
    colleague: selectedColleague,
    team: mockTeam,
    onSave: action('onSave'),
    onCancel: action('onCancel'),
  },
}

export const ColleagueAlreadyInTeam: Story = {
  args: {
    colleague: selectedColleague,
    team: mockTeamWithColleague,
    onSave: action('onSave'),
    onCancel: action('onCancel'),
  },
}

export const Loading: Story = {
  args: {
    colleague: selectedColleague,
    team: mockTeam,
    onSave: action('onSave'),
    onCancel: action('onCancel'),
    isLoading: true,
  },
}
