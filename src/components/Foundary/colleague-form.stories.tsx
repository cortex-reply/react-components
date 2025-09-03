import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ColleagueForm } from './colleague-form'
import { mockColleagues } from './test-data'

const meta: Meta<typeof ColleagueForm> = {
  title: 'Foundary/ColleagueForm',
  component: ColleagueForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive form for creating and editing colleague information, supporting both human and digital colleagues.',
      },
    },
  },
  argTypes: {
    colleague: {
      description: 'Existing colleague data for editing (optional)',
    },
    onSave: {
      description: 'Callback when form is submitted',
      action: 'save',
    },
    onCancel: {
      description: 'Callback when form is cancelled',
      action: 'cancel',
    },
    isLoading: {
      description: 'Whether the form is in loading state',
      control: 'boolean',
    },
    title: {
      description: 'Custom form title',
      control: 'text',
    },
    submitLabel: {
      description: 'Custom submit button label',
      control: 'text',
    },
    cancelLabel: {
      description: 'Custom cancel button label',
      control: 'text',
    },
  },
  args: {
    onSave: action('save'),
    onCancel: action('cancel'),
    // departments: ["Design", "Engineering", "Marketing", "Product", "Sales", "Operations"],
    isLoading: false,
    cancelLabel: 'Cancel',
  },
}

export default meta
type Story = StoryObj<typeof ColleagueForm>

export const NewHumanColleague: Story = {
  args: {},
}

export const NewDigitalColleague: Story = {
  args: {
    colleague: {
      id: '',
      type: 'digital',
      name: '',
      description: '',
      joinedDate: new Date(),
      jobDescription: '',
      workInstructions: '',
      capabilities: [],
      knowledge: [],
      coreKnowledge: [],
      version: '1.0.0',
      lastUpdated: new Date(),
      status: 'active',
    },
  },
}

export const EditHumanColleague: Story = {
  args: {
    colleague: mockColleagues[0], // Sarah Johnson
    title: 'Edit Team Member',
    submitLabel: 'Update Member',
  },
}

export const ReadOnly: Story = {
  args: {
    colleague: mockColleagues[0], // Sarah Johnson
    readOnly: true,
    title: 'Edit Team Member',
    submitLabel: 'Update Member',
  },
}

export const EditDigitalColleague: Story = {
  args: {
    colleague: mockColleagues[1], // CodeAssist Pro
    title: 'Edit Digital Assistant',
    submitLabel: 'Update Assistant',
  },
}

export const LoadingState: Story = {
  args: {
    colleague: mockColleagues[0],
    isLoading: true,
  },
}

export const CustomDepartments: Story = {
  args: {
    departments: [
      'Frontend Development',
      'Backend Development',
      'DevOps',
      'Quality Assurance',
      'Data Science',
      'Machine Learning',
    ],
  },
}

export const MinimalForm: Story = {
  args: {
    title: 'Quick Add',
    submitLabel: 'Add Now',
    cancelLabel: 'Skip',
  },
}

export const WithPrefilledData: Story = {
  args: {
    colleague: {
      id: '',
      type: 'human',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Frontend Developer',
      department: 'Engineering',
      status: 'active',
      joinedDate: new Date(),
      phone: '+1 (555) 123-4567',
      location: 'Remote',
      timezone: 'EST',
      skills: ['React', 'TypeScript', 'CSS'],
      bio: 'Experienced frontend developer with a passion for user experience.',
    },
  },
}

export const DigitalWithExtensiveData: Story = {
  args: {
    colleague: {
      ...mockColleagues[1],
      workInstructions: 'Review pull requests for code quality',
      capabilities: [{ relationTo: 'capabilities', value: 1 }],
      knowledge: 1,
      coreKnowledge: 1,
      capabilityLevel: 1,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  },
}

export const FormValidation: Story = {
  args: {
    colleague: {
      id: 0,
      // type: 'human',
      name: 'John Doe',
      capabilityLevel: 1,
      capabilities: [
        { relationTo: 'capabilities', value: 1 },
        { relationTo: 'capabilities', value: 2 },
        { relationTo: 'capabilities', value: 3 },
        { relationTo: 'capabilities', value: 4 },
        { relationTo: 'capabilities', value: 5 },
      ],
      knowledge: 1,
      coreKnowledge: 1,
      workInstructions: 'Review pull requests for code quality',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Try submitting the form without filling required fields to see validation in action.',
      },
    },
  },
}
