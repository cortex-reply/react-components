import React from 'react'
import type { StoryObj, Meta } from '@storybook/react'
import { fn } from '@storybook/test'
import { MessageContent } from './Message'
import { messageHandler } from '../PartTypes/MessageHandler'
import type { UIMessage } from 'ai'

export default {
  title: 'Chat/MessageContent',
  component: MessageContent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'MessageContent component handles the display of message parts including text, tools, reasoning, files, and other complex content types. It works with the messageHandler to render different part types appropriately.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['contained', 'flat'],
      description: 'Visual styling variant for the message content',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for styling',
    },
  },
} as Meta<typeof MessageContent>

type Story = StoryObj<typeof MessageContent>

// Helper function to render message parts using the existing messageHandler
const renderMessageParts = (message: UIMessage, addToolResult = fn(), status = 'ready' as const) => {
  const messages: UIMessage[] = [message] // messageHandler expects messages array
  
  return messageHandler({
    message,
    addToolResult,
    status,
    messages,
  })
}

// Template for consistent story rendering
const MessageContentTemplate = (
  message: UIMessage,
  variant: 'contained' | 'flat' = 'contained',
  maxWidth: string = 'max-w-2xl',
  addToolResult = fn(),
  status = 'ready' as const
) => (
  <div className={maxWidth}>
    <MessageContent variant={variant}>
      {renderMessageParts(message, addToolResult, status)}
    </MessageContent>
  </div>
)

// Basic text message
export const SimpleText: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'simple-text',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Hi, I\'m Ava, your Digital Colleague. How can I assist you today?',
          state: 'done'
        }
      ]
    }

    return MessageContentTemplate(message)
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic text message content with simple greeting text.',
      },
    },
  },
}

// User question
export const UserQuestion: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'user-question',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'what is our leave policy ?'
        }
      ]
    }

    return MessageContentTemplate(message, 'flat')
  },
  parameters: {
    docs: {
      description: {
        story: 'User question with flat styling variant.',
      },
    },
  },
}

// Complex message with reasoning and tool usage
export const ComplexWithReasoning: Story = {
  render: () => {
    const message: UIMessage = {
      id: '7ea7b320-aca4-4033-b0ba-a269c6381cf6',
      role: 'assistant',
      parts: [
        {
          type: 'step-start'
        },
        {
          type: 'reasoning',
          text: 'I\'m planning to use the HR Business Partner tool as instructed by the developer. I need to call the functions tool with specific parameters, like the query string "what is our leave policy?" along with the dcName "HR Business Partner" and dcId "1". After I make the call, I\'ll present the agent\'s response as if it were my own. It\'s a clear approach, and I\'m ready to proceed with it!',
          providerMetadata: {
            openai: {
              itemId: 'rs_0aca9208095415bb006935b2cd63b4819099eb8fc20c5de4e1',
              reasoningEncryptedContent: null
            }
          },
          state: 'done'
        },
        {
          type: 'tool-dc_a2a_hr_business_partner',
          toolCallId: 'call_ebKhXEPqJfxW8KAMcAxA3PBX',
          state: 'output-available',
          input: {
            query: 'What is our leave policy?',
            dcName: 'HR Business Partner',
            dcId: '1'
          },
          output: 'I\'m unable to provide specific details about your organization\'s leave policy as it can vary significantly between companies. However, I can offer a general overview of common leave policies:\n\n1. **Annual Leave/Vacation Days**: Typically, employees are entitled to a certain number of paid vacation days each year, which may increase with tenure.\n\n2. **Sick Leave**: Employees are usually granted a specific number of paid days off for illness.\n\n3. **Maternity/Paternity Leave**: These are provided to new parents, with the duration and pay depending on local laws and company policies.\n\n4. **Public Holidays**: Employees are often given paid time off for public holidays recognized in their location.\n\n5. **Unpaid Leave**: Employees may take unpaid leave for personal reasons, subject to approval.\n\n6. **Bereavement Leave**: Time off given to employees following the death of a family member or close relative.\n\n7. **Jury Duty**: Some companies provide paid leave for employees serving jury duty.\n\nTo get the exact details of your leave policy, please refer to your employee handbook or contact your HR department.\n',
          callProviderMetadata: {
            openai: {
              itemId: 'fc_0aca9208095415bb006935b2d07fb08190b2ccf0386a888c36'
            }
          }
        },
        {
          type: 'step-start'
        },
        {
          type: 'text',
          text: 'I don\'t have your company\'s specific leave policy on file. Here\'s a concise summary of common leave types — if you want I can fetch your organization\'s exact policy from HR:\n\n- Annual leave / vacation (paid; often accrues and may increase with tenure)\n- Sick leave (paid days for personal illness)\n- Maternity/paternity (parental) leave (duration/pay vary by law and company)\n- Public holidays (paid days off for local/national holidays)\n- Unpaid leave (subject to approval)\n- Bereavement leave (for death of family/close relatives)\n- Jury duty (paid or unpaid depending on policy)\n\nWould you like me to:\n1) Retrieve your company\'s specific leave policy from HR? (I can ask the HR Business Partner.)  \n2) Tell you typical entitlements (e.g., common day ranges for each type)?  \n3) Explain how to apply for leave (notice, approval process)?',
          providerMetadata: {
            openai: {
              itemId: 'msg_0aca9208095415bb006935b2d51f6c8190bc17f089f5490975'
            }
          },
          state: 'done'
        }
      ]
    }

    return MessageContentTemplate(message, 'contained', 'max-w-4xl')
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex message content with reasoning, tool calls, and structured response demonstrating the full MessageHandler functionality.',
      },
    },
  },
}

export const ToolCall: Story = {
  render: () => {
    const message: UIMessage = {
      id: '7ea7b320-aca4-4033-b0ba-a269c6381cf6',
      role: 'assistant',
      parts: [
        {
          type: 'step-start'
        },
        {
          type: 'reasoning',
          text: 'I\'m planning to use the HR Business Partner tool as instructed by the developer. I need to call the functions tool with specific parameters, like the query string "what is our leave policy?" along with the dcName "HR Business Partner" and dcId "1". After I make the call, I\'ll present the agent\'s response as if it were my own. It\'s a clear approach, and I\'m ready to proceed with it!',
          providerMetadata: {
            openai: {
              itemId: 'rs_0aca9208095415bb006935b2cd63b4819099eb8fc20c5de4e1',
              reasoningEncryptedContent: null
            }
          },
          state: 'done'
        },
        {
          type: 'tool-any_tool',
          toolCallId: 'call_ebKhXEPqJfxW8KAMcAxA3PBX',
          state: 'output-available',
          input: {
            query: 'What is our leave policy?',
            dcName: 'HR Business Partner',
            dcId: '1'
          },
          output: 'I\'m unable to provide specific details about your organization\'s leave policy as it can vary significantly between companies. However, I can offer a general overview of common leave policies:\n\n1. **Annual Leave/Vacation Days**: Typically, employees are entitled to a certain number of paid vacation days each year, which may increase with tenure.\n\n2. **Sick Leave**: Employees are usually granted a specific number of paid days off for illness.\n\n3. **Maternity/Paternity Leave**: These are provided to new parents, with the duration and pay depending on local laws and company policies.\n\n4. **Public Holidays**: Employees are often given paid time off for public holidays recognized in their location.\n\n5. **Unpaid Leave**: Employees may take unpaid leave for personal reasons, subject to approval.\n\n6. **Bereavement Leave**: Time off given to employees following the death of a family member or close relative.\n\n7. **Jury Duty**: Some companies provide paid leave for employees serving jury duty.\n\nTo get the exact details of your leave policy, please refer to your employee handbook or contact your HR department.\n',
          callProviderMetadata: {
            openai: {
              itemId: 'fc_0aca9208095415bb006935b2d07fb08190b2ccf0386a888c36'
            }
          }
        },
      ]
    }

    return MessageContentTemplate(message, 'contained', 'max-w-4xl')
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex message content with reasoning, tool calls, and structured response demonstrating the full MessageHandler functionality.',
      },
    },
  },
}

// File upload example
export const WithFileAttachment: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'file-message',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'I\'ve attached the employee handbook for reference:'
        },
        {
          type: 'file',
          filename: 'employee-handbook-2024.pdf',
          mediaType: 'application/pdf',
          url: '#',
          size: 2048000
        }
      ]
    }

    return MessageContentTemplate(message, 'contained')
  },
  parameters: {
    docs: {
      description: {
        story: 'Message content with file attachment showing how files are displayed within message content.',
      },
    },
  },
}

// Multiple file types
export const WithMultipleFiles: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'multi-files',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Here are the documents you requested:'
        },
        {
          type: 'file',
          filename: 'policy-summary.pdf',
          mediaType: 'application/pdf',
          url: '#',
          size: 1024000
        },
        {
          type: 'file',
          filename: 'leave-request-form.docx',
          mediaType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          url: '#',
          size: 512000
        },
        {
          type: 'file',
          filename: 'process-diagram.png',
          mediaType: 'image/png',
          url: '#',
          size: 256000
        }
    ]
    }

    return MessageContentTemplate(message)
  },
  parameters: {
    docs: {
      description: {
        story: 'Message content with multiple file types (PDF, Word document, and image) demonstrating file type icons.'
      },
    },
  },
}

// Task tool example
export const WithTaskTool: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'task-message',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'I\'ve created a task for processing your leave request:'
        },
        {
          type: 'tool-task',
          toolCallId: 'task-123',
          state: 'output-available',
          input: {
            title: 'Process Leave Request',
            description: 'Review and approve annual leave request for employee',
            assignee: 'hr@company.com'
          },
          output: {
            id: 'task-456',
            status: 'pending',
            title: 'Process Leave Request',
            description: 'Review and approve annual leave request for employee',
            assignee: 'hr@company.com',
            createdAt: '2024-12-07T10:00:00Z'
          }
        }
    ]
    }

    return MessageContentTemplate(message, 'contained', 'max-w-3xl')
  },
  parameters: {
    docs: {
      description: {
        story: 'Message content with task creation tool showing how tasks are displayed within messages.'
      },
    },
  },
}

// Data references example
export const WithDataReferences: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'references-message',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Here are some helpful resources related to our leave policies:'
        },
        {
          type: 'data-reference',
          data: {
            references: [
              {
                type: 'policy',
                title: 'Annual Leave Policy 2024',
                description: 'Complete guidelines for vacation and personal time off',
                url: 'https://company.com/policies/annual-leave'
              },
              {
                type: 'form',
                title: 'Leave Request Form',
                description: 'Submit new leave requests and track status',
                url: 'https://hr-portal.company.com/leave-request'
              },
              {
                type: 'contact',
                title: 'HR Business Partner',
                description: 'Direct contact for leave-related questions',
                url: 'mailto:hr-bp@company.com'
              }
            ]
          }
        }
      ]
    }

    return MessageContentTemplate(message, 'contained', 'max-w-3xl')
  },
  parameters: {
    docs: {
      description: {
        story: 'Message content with data references showing how external resources and links are displayed.',
      },
    },
  },
}

// Menu/action options
export const WithMenuOptions: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'menu-message',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'What would you like me to help you with regarding leave policies?'
        },
        {
          type: 'data-menu',
          data: {
            title: 'Leave Policy Actions',
            items: [
              {
                label: 'Check My Leave Balance',
                description: 'View current vacation and sick day balances',
                action: fn()
              },
              {
                label: 'Submit Leave Request',
                description: 'Request time off for vacation or personal reasons',
                action: fn()
              },
              {
                label: 'View Leave History',
                description: 'See past leave requests and their status',
                action: fn()
              },
              {
                label: 'Download Policy Document',
                description: 'Get the complete leave policy handbook',
                action: fn()
              }
            ]
          }
        }
      ]
    }

    return MessageContentTemplate(message, 'contained', 'max-w-3xl')
  },
  parameters: {
    docs: {
      description: {
        story: 'Message content with interactive menu options for user actions.',
      },
    },
  },
}

// Authentication tool
export const WithAuthenticationTool: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'auth-message',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'To access your leave information, I need you to authenticate with the HR system:'
        },
        {
          type: 'tool-authenticate',
          toolCallId: 'auth-123',
          state: 'input-available',
          input: {
            service: 'HR Portal',
            reason: 'Access employee leave information',
            redirectUrl: 'https://hr.company.com/oauth/callback'
          }
        }
      ]
    }

    return MessageContentTemplate(message, 'contained', 'max-w-3xl')
  },
  parameters: {
    docs: {
      description: {
        story: 'Message content with authentication tool for secure access to employee information.',
      },
    },
  },
}

// Approval tool
export const WithApprovalTool: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'approval-message',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'I\'ve prepared your leave request. Please review and approve the details:'
        },
        {
          type: 'tool-requestApproval',
          toolCallId: 'approval-123',
          state: 'input-available',
          input: {
            title: 'Annual Leave Request',
            description: 'Request for 5 days annual leave from Dec 20-24, 2024',
            details: {
              startDate: '2024-12-20',
              endDate: '2024-12-24',
              days: 5,
              type: 'Annual Leave',
              reason: 'Family vacation during holidays'
            }
          }
        }
      ]
    }

    return MessageContentTemplate(message, 'contained', 'max-w-3xl')
  },
  parameters: {
    docs: {
      description: {
        story: 'Message content with approval tool for user confirmation of actions.',
      },
    },
  },
}

// Streaming/loading state
export const LoadingState: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'loading-message',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Let me check your leave balance...'
        },
        {
          type: 'tool-task',
          toolCallId: 'loading-task',
          state: 'input-available',
          input: {
            action: 'fetch_leave_balance',
            employee_id: 'user123'
          }
        }
      ]
    }

    return MessageContentTemplate(message, 'contained', 'max-w-2xl', fn(), 'streaming')
  },
  parameters: {
    docs: {
      description: {
        story: 'Message content showing loading state while tools are processing.',
      },
    },
  },
}

// Error state
export const ErrorState: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'error-message',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'I encountered an issue while trying to access your leave information:'
        },
        {
          type: 'tool-task',
          toolCallId: 'error-task',
          state: 'output-error',
          input: {
            action: 'fetch_leave_balance',
            employee_id: 'user123'
          },
          errorText: 'Unable to connect to HR system. Please try again later or contact IT support.'
        }
      ]
    }

    return MessageContentTemplate(message, 'contained', 'max-w-2xl', fn(), 'error')
  },
  parameters: {
    docs: {
      description: {
        story: 'Message content showing error state when tools fail to execute.',
      },
    },
  },
}

// Variant comparison
export const VariantComparison: Story = {
  render: () => {
    const message: UIMessage = {
      id: 'variant-comparison',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'This is the same content rendered with different variants to show styling differences.'
        }
      ]
    }

    return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <h3 className="mb-2 font-semibold">Contained Variant (Default)</h3>
          <MessageContent variant="contained">
            {renderMessageParts(message)}
          </MessageContent>
        </div>
        
        <div>
          <h3 className="mb-2 font-semibold">Flat Variant</h3>
          <MessageContent variant="flat">
            {renderMessageParts(message)}
          </MessageContent>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of contained vs flat variants for MessageContent styling.',
      },
    },
  },
}