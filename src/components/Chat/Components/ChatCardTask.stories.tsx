import React from 'react'
import { ChatCardTask } from './ChatCardTask'
import { delay, http, HttpResponse } from 'msw'
import type { StoryObj } from '@storybook/react'

export default {
  title: 'Chat/ChatCardTask',
  component: ChatCardTask,
  tags: ['autodocs'],
  decorators: [
    (Story: React.FC) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('/api/tasks/1', async () => {
          await delay(800)
          return HttpResponse.json(chatCardTestData)
        }),
      ],
    },
  },
}

export const chatCardTestData = {
  id: 1,
  name: 'Sample Task',
  description: 'This is a sample task description.',
  status: 'todo',
  dateLogged: new Date().toISOString(),
  project: {
    id: 1,
    name: 'Sample Project',
  },
  loading: false,
  error: null,
}

const Template = (args) => <ChatCardTask {...args} />
type Story = StoryObj<typeof ChatCardTask>

export const Default = Template.bind({})
Default.args = {
  data: {
    id: 1,
    system: 'payload',
    fetchLatest: false,
    taskData: chatCardTestData,
  },
}

export const ViaAPI = Template.bind({})
ViaAPI.args = {
  data: {
    id: 1,
    fetchLatest: true,
  },
}

export const Error = Template.bind({})
Error.args = {
  data: {
    id: 1,
    error: 'Failed to load task data.',
  },
}
export const APIError: Story = {
  args: {
    data: {
      id: 1,
      system: 'payload',
      fetchLatest: true,
    },
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/tasks/1', async () => {
          await delay(800)
          return new HttpResponse(null, {
            status: 403,
          })
        }),
      ],
    },
  },
}
