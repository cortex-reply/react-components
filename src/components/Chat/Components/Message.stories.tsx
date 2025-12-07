import React from 'react'
import type { StoryObj, Meta } from '@storybook/react'
import { fn } from '@storybook/test'
import { Message, MessageContent, MessageAvatar } from './Message'
import { messageHandler } from '../PartTypes/MessageHandler'
import type { UIMessage } from 'ai'

export default {
  title: 'Chat/Message',
  component: Message,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible message component for chat interfaces. Displays messages from different roles (user/assistant) with appropriate styling and layout.',
      },
    },
  },
  argTypes: {
    from: {
      control: { type: 'select' },
      options: ['user', 'assistant'],
      description: 'The role of the message sender',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for styling',
    },
  },
} as Meta<typeof Message>

type Story = StoryObj<typeof Message>

// Basic user message
export const UserMessage: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'user-basic-example',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'Hello! This is a message from a user. How can you help me today?'
        }
      ]
    }

    return (
      <div className="max-w-2xl">
        <Message from={message.role as 'user'}>
          <MessageContent>
            {messageHandler(message)}
          </MessageContent>
          <MessageAvatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
            name="John Doe"
          />
        </Message>
      </div>
    )
  },
}

// Basic assistant message
export const AssistantMessage: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'assistant-basic-example',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Hello! I\'m an AI assistant. I\'d be happy to help you with your questions. What would you like to know?'
        }
      ]
    }

    return (
      <div className="max-w-2xl">
        <Message from={message.role as 'assistant'}>
          <MessageAvatar 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face" 
            name="Assistant"
          />
          <MessageContent>
            {messageHandler(message)}
          </MessageContent>
        </Message>
      </div>
    )
  },
}

// User message with flat variant
export const UserMessageFlat: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'user-flat-example',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'This is a user message with the flat variant styling.'
        }
      ]
    }

    return (
      <div className="max-w-2xl">
        <Message from={message.role as 'user'}>
          <MessageContent variant="flat">
            {messageHandler(message)}
          </MessageContent>
          <MessageAvatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
            name="John Doe"
          />
        </Message>
      </div>
    )
  },
}

// Assistant message with flat variant
export const AssistantMessageFlat: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'assistant-flat-example',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'This is an assistant message using the flat variant for a more minimal appearance.'
        }
      ]
    }

    return (
      <div className="max-w-2xl">
        <Message from={message.role as 'assistant'}>
          <MessageAvatar 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face" 
            name="Assistant"
          />
          <MessageContent variant="flat">
            {messageHandler(message)}
          </MessageContent>
        </Message>
      </div>
    )
  },
}

// Long message from user
export const LongUserMessage: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'user-long-example',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'This is a much longer message from a user to demonstrate how the component handles extended content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
      ]
    }

    return (
      <div className="max-w-2xl">
        <Message from={message.role as 'user'}>
          <MessageContent>
            {messageHandler(message)}
          </MessageContent>
          <MessageAvatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
            name="John Doe"
          />
        </Message>
      </div>
    )
  },
}

// Long message from assistant
export const LongAssistantMessage: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'assistant-long-example',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'This is a comprehensive response from the AI assistant demonstrating how longer content is displayed. The message component automatically handles text wrapping and maintains proper spacing. Here are some key points:\n\n• The message content is contained within the max-width constraint\n• Text flows naturally with proper line breaks\n• The avatar remains positioned correctly regardless of content length\n• Styling remains consistent for both user and assistant messages\n\nThis ensures a clean and readable chat interface experience for users.'
        }
      ]
    }

    return (
      <div className="max-w-2xl">
        <Message from={message.role as 'assistant'}>
          <MessageAvatar 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face" 
            name="Assistant"
          />
          <MessageContent>
            {messageHandler(message)}
          </MessageContent>
        </Message>
      </div>
    )
  },
}

// Message with custom avatar (no image)
export const MessageWithFallbackAvatar: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'fallback-avatar-example',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'This message shows the fallback avatar when no image is provided.'
        }
      ]
    }

    return (
      <div className="max-w-2xl">
        <Message from={message.role as 'user'}>
          <MessageContent>
            {messageHandler(message)}
          </MessageContent>
          <MessageAvatar 
            src="" 
            name="Jane Smith"
          />
        </Message>
      </div>
    )
  },
}

// Message with no name (fallback to 'ME')
export const MessageWithDefaultFallback: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'default-fallback-example',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'This message shows the default \'ME\' fallback when no name is provided.'
        }
      ]
    }

    return (
      <div className="max-w-2xl">
        <Message from={message.role as 'user'}>
          <MessageContent>
            {messageHandler(message)}
          </MessageContent>
          <MessageAvatar 
            src=""
          />
        </Message>
      </div>
    )
  },
}

// Multi-part message content
export const MultiPartMessage: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'multi-part-example',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Here\'s some structured information:'
        },
        {
          type: 'text',
          text: '• First important point\n• Second key insight\n• Third helpful tip'
        },
        {
          type: 'text',
          text: 'This demonstrates how the message component can handle multiple parts in a single message.'
        }
      ]
    }

    return (
      <div className="max-w-2xl">
        <Message from={message.role as 'assistant'}>
          <MessageAvatar 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face" 
            name="Assistant"
          />
          <MessageContent>
            {messageHandler(message)}
          </MessageContent>
        </Message>
      </div>
    )
  },
}

// Conversation flow example
export const ConversationFlow: Story = {
  render: () => {
    const messages: UIMessage[] = [
      {
        id: 'conversation-1',
        role: 'user',
        parts: [
          {
            type: 'text',
            text: 'Hi there! Can you help me understand React components?'
          }
        ]
      },
      {
        id: 'conversation-2',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Of course! React components are the building blocks of React applications. They\'re reusable pieces of code that return JSX to be rendered.'
          }
        ]
      },
      {
        id: 'conversation-3',
        role: 'user',
        parts: [
          {
            type: 'text',
            text: 'That makes sense! Can you show me an example?'
          }
        ]
      },
      {
        id: 'conversation-4',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Here\'s a simple component example:\n\n```javascript\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n```'
          }
        ]
      }
    ]

    return (
      <div className="space-y-4 max-w-2xl">
        {messages.map((message) => (
          <Message key={message.id} from={message.role as 'user' | 'assistant'}>
            {message.role === 'user' ? (
              <>
                <MessageContent>
                  {messageHandler(message)}
                </MessageContent>
                <MessageAvatar 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                  name="Student"
                />
              </>
            ) : (
              <>
                <MessageAvatar 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face" 
                  name="Teacher"
                />
                <MessageContent>
                  {messageHandler(message)}
                </MessageContent>
              </>
            )}
          </Message>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how messages appear in a conversation flow between user and assistant using the parts format.',
      },
    },
  },
}
// Helper function to render message parts