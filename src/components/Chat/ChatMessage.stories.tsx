import React from 'react'
import { ChatMessage } from './ChatMessage'
import { Meta, StoryFn } from '@storybook/react'
import { delay, http, HttpResponse } from 'msw'
import type { StoryObj } from '@storybook/react'
import { Default as CardArtefact1 } from './Components/ChatCardArtefact.stories'
import { chatCardTestData } from './Components/ChatCardTask.stories'
export default {
  title: 'Chat/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  decorators: [
    (Story: React.FC) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: StoryFn<typeof ChatMessage> = (args) => <ChatMessage {...args} />

export const Text = Template.bind({})
Text.args = {
  id: '1',
  role: 'user',
  message: {
    type: 'text',
    data: { content: 'Hello?' },
  },
  currentUser: {
    name: 'John Doe',
    avatar: '/placeholder-user.jpg',
  },
}

type Story = StoryObj<typeof ChatMessage>

export const WithTask: Story = {
  args: {
    id: '1',
    role: 'assistant',
    message: {
      type: 'tool-invocation',
      data: { tool: 'task', id: 1 },
    },
    currentUser: {
      name: 'John Doe',
      avatar: '/placeholder-user.jpg',
    },
  },
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

export const AIText: Story = {
  args: {
    id: '1',
    role: 'assistant',
    message: {
      type: 'text',
      data: { content: 'Hello, how can I help you?' },
    },
    currentUser: {
      name: 'John Doe',
      avatar: '/placeholder-user.jpg',
    },
  },
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


// export const WithTask = Template.bind({});
// WithTask.args = {
//   message: {
//     id: "2",
//     role: "assistant",
//     type: "tool-invocation",
//     data: {tool: 'task', id: 123},
//   },
//   currentUser: {
//     name: "John Doe",
//     avatar: "/placeholder-user.jpg",
//   },
// };

// export const WithArtefact = Template.bind({});
// WithArtefact.args = { CardArtefact1 };
// WithArtefact.args = {
//   message: {
//     id: "3",
//     role: "assistant",
//     content: "Here is the artefact you requested.",
//     taskId: "123",
//     artefact: { name: "Artefact Name", description: "Artefact Description" },
//   },
//   currentUser: {
//     name: "John Doe",
//     avatar: "/placeholder-user.jpg",
//   },
// };
