import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ChatInterface } from './ChatInterface'
import type { UIMessage, FileUpload } from './types'
import { testCapabilities } from '../../test-data/capabilities'
import { ThemeProvider } from '../Other/ThemeProvider'

// Import existing demos for compatibility
import { ChatDemo } from './demo'
import { ChatDemoLongMessages } from './demo-long-messages'
import {
  ChatDemoToolCalling,
  ChatDemoMarkdownResponses,
  ChatDemoUIComponents,
  ChatDemoFileUploads,
  ChatDemoErrorHandling,
  ChatDemoCapabilitiesInteraction,
} from './demo-tests'

// Mock data for ChatInterface stories
const mockMessages: UIMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'Hello, can you help me with my project?' }],
  },
  {
    id: '2',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: "Of course! I'd be happy to help you with your project. What specific assistance do you need?",
      },
    ],
  },
  {
    id: '3',
    role: 'user',
    parts: [{ type: 'text', text: 'I need to create a task for the project.' }],
  },
  {
    id: '4',
    role: 'assistant',
    parts: [
      { type: 'text', text: "I'll help you create a task." },
      {
        type: 'tool-task',
        toolCallId: 'call-123',
        state: 'output-available',
        input: {
          id: 'task-123',
          title: 'Project Setup',
          description: 'Set up the initial project structure',
        },
        output: {
          id: 'task-123',
          title: 'Project Setup',
          description: 'Set up the initial project structure',
          status: 'pending',
          assignee: 'John Doe',
          dueDate: '2025-08-30',
        },
      } as any,
    ],
  },
]

// Interactive wrapper component for ChatInterface stories
const ChatInterfaceWrapper = ({ initialMessages = mockMessages, ...props }: any) => {
  const [messages, setMessages] = useState<UIMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(props.isTyping || false)
  const [fileUploads, setFileUploads] = useState<FileUpload[]>(props.fileUploads || [])
  const [isDragOver, setIsDragOver] = useState(props.isDragOver || false)

  const handleSendMessage = () => {
    if (!input.trim() && fileUploads.length === 0) return

    const newMessage: UIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      parts: [{ type: 'text', text: input }],
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setFileUploads([])

    // Simulate assistant response
    setIsTyping(true)
    setTimeout(() => {
      const assistantMessage: UIMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        parts: [
          { type: 'text', text: `Thanks for your message! I understand you said: "${input}"` },
        ],
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newUploads: FileUpload[] = Array.from(files).map((file) => ({
      id: `upload-${Date.now()}-${Math.random()}`,
      file,
      status: 'uploaded' as const,
    }))

    setFileUploads((prev) => [...prev, ...newUploads])
  }

  const handleRemoveFile = (id: string) => {
    setFileUploads((prev) => prev.filter((upload) => upload.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-[600px]">
      <ChatInterface
        messages={messages}
        input={input}
        isTyping={isTyping}
        capabilities={testCapabilities}
        fileUploads={fileUploads}
        isDragOver={isDragOver}
        enableFileUpload={props.enableFileUpload ?? true}
        onInputChange={setInput}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        onFileUpload={handleFileUpload}
        onRemoveFile={handleRemoveFile}
        onDragOver={setIsDragOver}
        {...props}
      />
    </div>
  )
}

const meta: Meta<typeof ChatInterface> = {
  title: 'Chat/Chat Interface',
  component: ChatInterface,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="p-4 bg-background">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive chat interface component that supports text messages, file uploads, capability menus, and various message types including tasks, artefacts, and references.',
      },
    },
  },
  argTypes: {
    messages: {
      description: 'Array of chat messages',
      control: false,
    },
    input: {
      description: 'Current input value',
      control: 'text',
    },
    isTyping: {
      description: 'Whether the assistant is currently typing',
      control: 'boolean',
    },
    currentSessionTitle: {
      description: 'Title of the current chat session',
      control: 'text',
    },
    capabilities: {
      description: 'Available capabilities for the capability menu',
      control: false,
    },
    fileUploads: {
      description: 'Array of uploaded files',
      control: false,
    },
    isDragOver: {
      description: 'Whether files are being dragged over the interface',
      control: 'boolean',
    },
    enableFileUpload: {
      description: 'Whether file upload is enabled',
      control: 'boolean',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof ChatInterface>

// Direct ChatInterface component stories
export const BasicInterface: Story = {
  render: (args) => <ChatInterfaceWrapper {...args} />,
  name: 'Basic Chat Interface',
  parameters: {
    docs: {
      description: {
        story: 'A basic chat interface with simple text messages showing the core functionality.',
      },
    },
  },
}

export const EmptyChat: Story = {
  render: (args) => <ChatInterfaceWrapper initialMessages={[]} {...args} />,
  name: 'Empty Chat State',
  parameters: {
    docs: {
      description: {
        story:
          'Shows the chat interface in its initial empty state with input field and capabilities.',
      },
    },
  },
}

export const TypingIndicator: Story = {
  render: (args) => <ChatInterfaceWrapper {...args} isTyping={true} />,
  name: 'Typing Indicator',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the typing indicator animation when the assistant is responding.',
      },
    },
  },
}

export const WithFileUploads: Story = {
  render: (args) => (
    <ChatInterfaceWrapper
      {...args}
      fileUploads={[
        {
          id: 'upload-1',
          file: new File([''], 'document.pdf', { type: 'application/pdf' }),
          status: 'uploaded',
        },
        {
          id: 'upload-2',
          file: new File([''], 'image.png', { type: 'image/png' }),
          status: 'uploaded',
        },
      ]}
    />
  ),
  name: 'With File Uploads',
  parameters: {
    docs: {
      description: {
        story: 'Shows the interface with uploaded files ready to be sent.',
      },
    },
  },
}

export const WithComponents: Story = {
  render: (args) => (
    <ChatInterfaceWrapper
      {...args}
      messages={[
        ...mockMessages,

        {
          parts: [
            {
              type: 'text',
              text: 'what is my github id ?',
            },
          ],
          id: 'viZjOQTxcC5F0CZX',
          role: 'user',
        },
        {
          id: '8a55291c-fed0-4ea8-8dc5-7ed41f00d9f3',
          role: 'assistant',
          parts: [
            {
              type: 'step-start',
            },
            {
              type: 'reasoning',
              text: "**Retrieving GitHub ID**\n\nI need to get the user's GitHub ID, and I have the tool functions.get_me available for this. I'll go ahead and call that function to retrieve the information. Once I have the ID, I’ll present it in my response. This should be a straightforward process, so let’s make that call now!",
              providerMetadata: {
                openai: {
                  itemId: 'rs_68a5dcb10bac819aa247ccca0872c38a0c207900ea1046fc',
                  reasoningEncryptedContent: null,
                },
              },
              state: 'done',
            },
            {
              type: 'dynamic-tool',
              toolName: 'get_me',
              toolCallId: 'call_Vq7CWkAjDQ55mWODOIESuM7V',
              state: 'output-available',
              input: {},
              output: {
                content: [
                  {
                    type: 'text',
                    text: '🔐 **Authentication Required for get_me**\n\nTo use this function, you need to authenticate with the service.\n\n**Please visit:** https://github.com/login/oauth/authorize?response_type=code&client_id=Ov23li051TcexY0v80kg&redirect_uri=http%3A%2F%2Flocalhost%3A4001%2Fapi%2Foauth%2Fcallback&state=%257B%2522serverUrl%2522%253A%2522https%253A%252F%252Fapi.githubcopilot.com%252Fmcp%2522%252C%2522timestamp%2522%253A1755700404964%257D&scope=read%3Auser\n\nAfter completing authentication, try calling this function again.\n\n**Function:** get_me\n**Endpoint:** https://api.githubcopilot.com/mcp\n**Error:** Authentication required - please visit the authorization URL',
                  },
                ],
                isError: true,
              },
              callProviderMetadata: {
                openai: {
                  itemId: 'fc_68a5dcb38584819abfc2f33227422fd30c207900ea1046fc',
                },
              },
            },
            {
              type: 'step-start',
            },
            {
              type: 'reasoning',
              text: '',
              providerMetadata: {
                openai: {
                  itemId: 'rs_68a5dcbe5cd4819aa6a4c805d9c8a3820c207900ea1046fc',
                  reasoningEncryptedContent: null,
                },
              },
              state: 'done',
            },
            {
              type: 'tool-requestEndpointLogin',
              toolCallId: 'call_MzeLDNnuEvGwVEWi2Mj4c6LE',
              state: 'input-available',
              input: {
                reason:
                  'To access your GitHub profile (get your GitHub ID) we need you to authenticate with GitHub.',
                url: 'https://github.com/login/oauth/authorize?response_type=code&client_id=Ov23li051TcexY0v80kg&redirect_uri=http%3A%2F%2Flocalhost%3A4001%2Fapi%2Foauth%2Fcallback&state=%257B%2522serverUrl%2522%253A%2522https%253A%252F%252Fapi.githubcopilot.com%252Fmcp%2522%252C%2522timestamp%2522%253A1755700404964%257D&scope=read%3Auser',
              },
              callProviderMetadata: {
                openai: {
                  itemId: 'fc_68a5dcc09064819aba9ab7306b8d7e460c207900ea1046fc',
                },
              },
            },
          ],
        },
        {
          parts: [
            {
              type: 'text',
              text: 'what is my github id ?',
            },
          ],
          id: '7bKMFeQ6Q2QGQYWH',
          role: 'user',
        },
        {
          id: 'b41b6445-e9ed-4a57-99bc-9161e8a7947c',
          role: 'assistant',
          parts: [],
        },
      ]}
    />
  ),
  name: 'With Components',
  parameters: {
    docs: {
      description: {
        story: 'Shows the interface with various components integrated.',
      },
    },
  },
}

export const WithMarkDownComponents: Story = {
  render: (args) => (
    <ChatInterfaceWrapper
      {...args}
      messages={[
        ...mockMessages,

        {
          parts: [
            {
              type: 'text',
              text: 'give me my stats from github',
            },
          ],
          id: 'viZjOQTxcC5F0CZX',
          role: 'user',
        },

        {
          id: '7b9f5dbe-b8d6-441e-abe7-ad09757a99c4',
          role: 'assistant',
          parts: [
            {
              type: 'step-start',
            },
            {
              type: 'dynamic-tool',
              toolName: 'get_me',
              toolCallId: 'call_71bg9UVSUYFba0EqYNOVzaoW',
              state: 'output-available',
              input: {},
              output: {
                content: [
                  {
                    type: 'text',
                    text: '{"login":"rob-at-cortex","id":50111225,"profile_url":"https://github.com/rob-at-cortex","avatar_url":"https://avatars.githubusercontent.com/u/50111225?v=4","details":{"name":"Rob Ellison","company":"@cortex-reply","public_repos":11,"public_gists":0,"followers":1,"following":1,"created_at":"2019-04-29T14:47:37Z","updated_at":"2025-08-14T20:23:22Z","total_private_repos":7,"owned_private_repos":7}}',
                  },
                ],
                isError: false,
              },
              callProviderMetadata: {
                openai: {
                  itemId: 'fc_68a60a0ce3c48199b6c6523cf2a860c3003c1a806e67eeb4',
                },
              },
            },
            {
              type: 'step-start',
            },
            {
              type: 'text',
              text: "Here are your GitHub stats:\n- Username: rob-at-cortex\n- Name: Rob Ellison\n- Company: @cortex-reply\n- Public repositories: 11\n- Public gists: 0\n- Followers: 1\n- Following: 1\n- Account created on: April 29, 2019\n- Last updated: August 14, 2025\n- Total private repositories: 7\n- Owned private repositories: 7\n\nIs there anything specific you'd like to know or do with this information?",
              providerMetadata: {
                openai: {
                  itemId: 'msg_68a60a11a55c8199b87f0ffd2ebeb584003c1a806e67eeb4',
                },
              },
              state: 'done',
            },
          ],
        },
      ]}
    />
  ),
  name: 'With Markdown and Components',
  parameters: {
    docs: {
      description: {
        story: 'Shows the interface with various components integrated.',
      },
    },
  },
}

export const FileUploadDisabled: Story = {
  render: (args) => <ChatInterfaceWrapper {...args} enableFileUpload={false} />,
  name: 'File Upload Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Chat interface with file upload functionality disabled.',
      },
    },
  },
}

export const DragOverState: Story = {
  render: (args) => <ChatInterfaceWrapper {...args} isDragOver={true} />,
  name: 'Drag Over State',
  parameters: {
    docs: {
      description: {
        story: 'Shows the visual feedback when files are being dragged over the chat area.',
      },
    },
  },
}

export const WithSessionTitle: Story = {
  render: (args) => (
    <ChatInterfaceWrapper {...args} currentSessionTitle="Project Planning Discussion" />
  ),
  name: 'With Session Title',
  parameters: {
    docs: {
      description: {
        story: 'Chat interface showing a session title for the current conversation.',
      },
    },
  },
}

export const CustomStyling: Story = {
  render: (args) => (
    <ChatInterfaceWrapper {...args} className="border-2 border-primary rounded-lg shadow-lg" />
  ),
  name: 'Custom Styling',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates custom styling applied to the chat interface.',
      },
    },
  },
}

export const DarkTheme: Story = {
  render: (args) => <ChatInterfaceWrapper {...args} />,
  name: 'Dark Theme',
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <div className="p-4 bg-background min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Chat interface rendered with dark theme styling.',
      },
    },
  },
}

export const WithApproval: Story = {
  render: (args) => (
    <ChatInterfaceWrapper
      {...args}
      messages={[
        ...mockMessages,
        {
          id: '7b9f5dbe-b8d6-441e-abe7-ad09757a99c4',
          role: 'assistant',
          parts: [
            {
              type: 'tool-requestApproval',
              toolCallId: 'call_uwfECo4xFWbHg7A0wQpcF08N',
              state: 'input-available',
              input: {
                reason:
                  'I will list issues assigned to your GitHub account and may make API calls. Do you approve?',
              },
              callProviderMetadata: {
                openai: {
                  itemId: 'fc_68c45056143c81998f3a2d08c1cf4b1c09048af3276cee81',
                },
              },
            },
          ],
        },
      ]}
    />
  ),
}

// // Legacy demo stories for compatibility
// export const Default: Story = {
//   render: () => <ChatDemo />,
//   name: 'Complete Interface Demo',
//   parameters: {
//     docs: {
//       description: {
//         story: 'Complete chat interface demo with CopilotInterface wrapper, file upload capabilities and bottom menu.',
//       },
//     },
//   },
// }

// export const LongMessages: StoryObj<typeof ChatDemoLongMessages> = {
//   render: () => <ChatDemoLongMessages />,
//   name: 'Long Text Messages',
//   parameters: {
//     docs: {
//       description: {
//         story: 'Demonstrates how the chat interface handles very long text messages with proper width constraints and text wrapping.',
//       },
//     },
//   },
// }

// export const ToolCalling: StoryObj<typeof ChatDemoToolCalling> = {
//   render: () => <ChatDemoToolCalling />,
//   name: 'Tool Calling & Function Execution',
//   parameters: {
//     docs: {
//       description: {
//         story: 'Tests the interface with tool calling scenarios, including function execution, results display, and error handling.',
//       },
//     },
//   },
// }

// export const MarkdownResponses: StoryObj<typeof ChatDemoMarkdownResponses> = {
//   render: () => <ChatDemoMarkdownResponses />,
//   name: 'Markdown & Rich Text Responses',
//   parameters: {
//     docs: {
//       description: {
//         story: 'Tests how the chat interface renders markdown content including code blocks, tables, lists, and formatting.',
//       },
//     },
//   },
// }

// export const UIComponents: StoryObj<typeof ChatDemoUIComponents> = {
//   render: () => <ChatDemoUIComponents />,
//   name: 'Custom UI Components',
//   parameters: {
//     docs: {
//       description: {
//         story: 'Tests the interface with custom UI components like charts, cards, and interactive elements.',
//       },
//     },
//   },
// }

// export const FileUploads: StoryObj<typeof ChatDemoFileUploads> = {
//   render: () => <ChatDemoFileUploads />,
//   name: 'File Upload Scenarios',
//   parameters: {
//     docs: {
//       description: {
//         story: 'Tests various file upload scenarios including different file types, sizes, and upload states.',
//       },
//     },
//   },
// }

// export const ErrorHandling: StoryObj<typeof ChatDemoErrorHandling> = {
//   render: () => <ChatDemoErrorHandling />,
//   name: 'Error Handling & Edge Cases',
//   parameters: {
//     docs: {
//       description: {
//         story: 'Tests error scenarios, loading states, and edge cases in the chat interface.',
//       },
//     },
//   },
// }

// export const CapabilitiesInteraction: StoryObj<typeof ChatDemoCapabilitiesInteraction> = {
//   render: () => <ChatDemoCapabilitiesInteraction />,
//   name: 'Capabilities Menu Interaction',
//   parameters: {
//     docs: {
//       description: {
//         story: 'Tests the capabilities menu functionality, navigation, and action triggering.',
//       },
//     },
//   },
// }
