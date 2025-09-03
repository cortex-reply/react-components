import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { KnowledgeSearch } from './knowledge-search'
import type { KnowledgeDocument } from './types'
import { mockKnowledgeDocuments } from '../../../tests/mockKnowledgeDocuments'

const meta: Meta<typeof KnowledgeSearch> = {
  title: 'Digital Colleagues/KnowledgeSearch',
  component: KnowledgeSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    availableDocuments: {
      control: false, // Hide from controls since it's handled by the wrapper
    },
    maxSelections: {
      control: { type: 'number', min: 1, max: 10 },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const KnowledgeSearchWrapper = (args: any) => {
  const [selectedDocuments, setSelectedDocuments] = useState<KnowledgeDocument[]>([])
  
  return (
    <div className="max-w-2xl">
      <KnowledgeSearch
        {...args}
        availableDocuments={mockKnowledgeDocuments}
        selectedDocuments={selectedDocuments}
        onDocumentsChange={setSelectedDocuments}
      />
    </div>
  )
}

export const Default: Story = {
  render: KnowledgeSearchWrapper,
  args: {
    label: 'Knowledge Documents',
    placeholder: 'Search for knowledge documents...',
  },
}

export const WithMaxSelections: Story = {
  render: KnowledgeSearchWrapper,
  args: {
    label: 'Core Knowledge (Max 3)',
    placeholder: 'Search for core knowledge documents...',
    maxSelections: 3,
  },
}

export const Disabled: Story = {
  render: KnowledgeSearchWrapper,
  args: {
    label: 'Knowledge Documents (Disabled)',
    placeholder: 'Search disabled...',
    disabled: true,
  },
}

const PreSelectedWrapper = (args: any) => {
  const [selectedDocuments, setSelectedDocuments] = useState<KnowledgeDocument[]>([
    mockKnowledgeDocuments[0], // React Development Best Practices
    mockKnowledgeDocuments[1], // TypeScript Advanced Types
  ])
  
  return (
    <div className="max-w-2xl">
      <KnowledgeSearch
        {...args}
        availableDocuments={mockKnowledgeDocuments}
        selectedDocuments={selectedDocuments}
        onDocumentsChange={setSelectedDocuments}
      />
    </div>
  )
}

export const WithPreSelected: Story = {
  render: PreSelectedWrapper,
  args: {
    label: 'Knowledge Documents with Pre-selected Items',
    placeholder: 'Add more knowledge documents...',
  },
}

export const CompactWithLimit: Story = {
  render: KnowledgeSearchWrapper,
  args: {
    label: 'Essential Knowledge (Max 2)',
    placeholder: 'Select essential documents only...',
    maxSelections: 2,
  },
}
