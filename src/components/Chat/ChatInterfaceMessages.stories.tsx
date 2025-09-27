import React, { useState, useEffect } from 'react'
import { Meta } from '@storybook/react'
import { ChatInterfaceMessages } from './ChatInterfaceMessages'
import { type ChatMessageProps } from './ChatMessage'
import { delay, http, HttpResponse } from 'msw'
import type { StoryObj } from '@storybook/react'
import { chatCardTestData } from './Components/ChatCardTask.stories'

export default {
  title: 'Chat/ChatInterface',
  component: ChatInterfaceMessages,
  tags: ['autodocs'],
  argTypes: {
    contextType: {
      control: {
        type: 'select',
        options: ['project', 'businessFunction', 'global'],
      },
    },
  },
} as Meta

type Story = StoryObj<typeof ChatInterfaceMessages>

export const TextOnly: Story = {
  args: {
    messages: [
      {
        id: '1',
        role: 'user',
        message: { type: 'text', data: { content: 'Hello, I need help with my laptop.' } },
      },
      {
        id: '2',
        role: 'assistant',
        message: { type: 'text', data: { content: 'Hi! I can help you with that. Can you describe the issue?' } },
        currentUser: { name: 'Helpdesk Bot' },
      },
      {
        id: '3',
        role: 'user',
        message: { type: 'text', data: { content: 'It keeps restarting randomly.' } },
      },
      {
        id: '4',
        role: 'assistant',
        message: { type: 'forwarding', data: { content: 'IT Support' } },
      },
      {
        id: '5',
        role: 'assistant',
        message: { type: 'text', data: { content: 'I have created a support ticket for you.' } },
      },
      {
        id: '6',
        role: 'assistant',
        message: {
          type: 'tool-invocation',
          data: {
            id: 101,
            tool: 'task',
            system: 'payload',
            fetchLatest: false,
            taskData: chatCardTestData,
          },
        },
      },
      {
        id: '7',
        role: 'user',
        message: { type: 'text', data: { content: 'Thank you! Can I also get help with my printer?' } },
      },
      {
        id: '8',
        role: 'assistant',
        message: { type: 'text', data: { content: 'Of course! What issue are you facing with the printer?' } },
      },
      {
        id: '9',
        role: 'user',
        message: { type: 'text', data: { content: 'It is not connecting to the network.' } },
      },
      {
        id: '10',
        role: 'assistant',
        message: { type: 'forwarding', data: { content: 'Printer Support' } },
      },
      {
        id: '11',
        role: 'assistant',
        message: { type: 'text', data: { content: 'A new ticket has been created for your printer issue.' } },
      },
      {
        id: '12',
        role: 'assistant',
        message: {
          type: 'tool-invocation',
          data: {
            id: 102,
            tool: 'task',
            system: 'payload',
            fetchLatest: false,
            taskData: chatCardTestData,
          },
        },
      },
      {
        id: '13',
        role: 'user',
        message: { type: 'text', data: { content: 'How do I check the status of my tickets?' } },
      },
      {
        id: '14',
        role: 'assistant',
        message: { type: 'text', data: { content: 'You can view all your open tickets in the Helpdesk portal.' } },
      },
      {
        id: '15',
        role: 'assistant',
        message: {
          type: 'tool-invocation',
          data: {
            id: 103,
            tool: 'task',
            system: 'payload',
            fetchLatest: false,
            taskData: chatCardTestData,
          },
        },
      },
    ] as ChatMessageProps[],

    currentUser: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/path-to-avatar.jpg',
      role: 'user',
    },
  },
}

export const StreamingChunks: Story = {
  render: (args) => {
    const [messages, setMessages] = useState<ChatMessageProps[]>([])
    useEffect(() => {
      const convo: ChatMessageProps[] = [
        {
          id: '1',
          role: 'user',
          message: { type: 'text', data: { content: 'Hello, I need help with my laptop.' } },
        },
        {
          id: '2',
          role: 'assistant',
          message: { type: 'text', data: { content: '' } },
          currentUser: { name: 'Helpdesk Bot' },
        },
        {
          id: '3',
          role: 'user',
          message: { type: 'text', data: { content: 'It keeps restarting randomly.' } },
        },
        {
          id: '4',
          role: 'assistant',
          message: { type: 'forwarding', data: { content: 'IT Support' } },
        },
        {
          id: '5',
          role: 'assistant',
          message: { type: 'text', data: { content: '' } },
        },
        {
          id: '6',
          role: 'assistant',
          message: {
            type: 'tool-invocation',
            data: {
              id: 101,
              tool: 'task',
              system: 'payload',
              fetchLatest: false,
              taskData: chatCardTestData,
            },
          },
        },
        {
          id: '7',
          role: 'user',
          message: { type: 'text', data: { content: 'Thank you! Can I also get help with my printer?' } },
        },
        {
          id: '8',
          role: 'assistant',
          message: { type: 'text', data: { content: '' } },
        },
        {
          id: '9',
          role: 'user',
          message: { type: 'text', data: { content: 'It is not connecting to the network.' } },
        },
        {
          id: '10',
          role: 'assistant',
          message: { type: 'forwarding', data: { content: 'Printer Support' } },
        },
        {
          id: '11',
          role: 'assistant',
          message: { type: 'text', data: { content: '' } },
        },
        {
          id: '12',
          role: 'assistant',
          message: {
            type: 'tool-invocation',
            data: {
              id: 102,
              tool: 'task',
              system: 'payload',
              fetchLatest: false,
              taskData: chatCardTestData,
            },
          },
        },
        {
          id: '13',
          role: 'user',
          message: { type: 'text', data: { content: 'How do I check the status of my tickets?' } },
        },
        {
          id: '14',
          role: 'assistant',
          message: { type: 'text', data: { content: '' } },
        },
        {
          id: '15',
          role: 'assistant',
          message: {
            type: 'tool-invocation',
            data: {
              id: 103,
              tool: 'task',
              system: 'payload',
              fetchLatest: false,
              taskData: chatCardTestData,
            },
          },
        },
      ]
      // Split assistant text messages into word chunks
      const assistantTexts = [
        'Hi! I can help you with that. Can you describe the issue?', // id:2
        'I have created a support ticket for you.', // id:5
        'Of course! What issue are you facing with the printer?', // id:8
        'A new ticket has been created for your printer issue.', // id:11
        'You can view all your open tickets in the Helpdesk portal.', // id:14
      ]
      const assistantChunks = assistantTexts.map(text => text.split(/(\s+)/).filter(Boolean))
      let idx = 0
      let chunkIdx = 0
      let msgIdx = 0
      let timer: NodeJS.Timeout | null = null
      setMessages([convo[0]])
      function streamNext(currentMessages: ChatMessageProps[]) {
        if (idx >= convo.length) return
        // If this is a streaming assistant text message
        if ([1,4,7,10,13].includes(idx)) {
          // Add the message with empty content if not already present
          if (currentMessages.length < idx + 1) {
            setMessages((prev) => {
              const next = [...prev, convo[idx]]
              timer = setTimeout(() => streamNext(next), 1000)
              return next
            })
            return
          }
          // Stream word chunks for this message
          if (chunkIdx < assistantChunks[msgIdx].length) {
            setMessages((prev) => {
              const updated = [...prev]
              const last = { ...updated[idx] }
              last.message = {
                ...last.message,
                data: {
                  ...last.message.data,
                  content: (last.message.data?.content || '') + assistantChunks[msgIdx][chunkIdx],
                },
              }
              updated[idx] = last
              timer = setTimeout(() => streamNext(updated), 200)
              return updated
            })
            chunkIdx++
            return
          } else {
            chunkIdx = 0
            msgIdx++
            idx++
            timer = setTimeout(() => streamNext(messages), 1000)
            return
          }
        }
        // Add the next message
        setMessages((prev) => {
          const next = [...prev, convo[idx]]
          timer = setTimeout(() => streamNext(next), 1000)
          return next
        })
        idx++
      }
      timer = setTimeout(() => streamNext([convo[0]]), 1000)
      return () => { if (timer) clearTimeout(timer) }
    }, [])
    return <ChatInterfaceMessages {...args} messages={messages} />
  },
  args: {
    contextType: 'project',
    currentUser: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/path-to-avatar.jpg',
      role: 'user',
    },
  },
}
