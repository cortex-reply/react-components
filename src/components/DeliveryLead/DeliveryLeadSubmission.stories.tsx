import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DeliveryLeadSubmissionComponent } from './DeliveryLeadSubmission'

const meta: Meta<typeof DeliveryLeadSubmissionComponent> = {
  title: 'DeliveryReport/DeliveryLeadSubmission',
  component: DeliveryLeadSubmissionComponent,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="container mx-auto p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DeliveryLeadSubmissionComponent>

const exampleCustomerProjectPairs = [
  { customer: { id: 1, name: 'Acme Corp' }, project: { id: 101, name: 'Website Redesign' } },
  { customer: { id: 1, name: 'Acme Corp' }, project: { id: 102, name: 'Mobile App' } },
  { customer: { id: 2, name: 'Globex' }, project: { id: 201, name: 'ERP Migration' } },
  { customer: { id: 2, name: 'Globex' }, project: { id: 202, name: 'Cloud Setup' } },
  { customer: { id: 3, name: 'Initech' }, project: { id: 301, name: 'API Integration' } },
]

const prefilledSubmission = {
  customer: 1,
  project: 101,
  projectSummary: 'Existing project summary',
  projectUpdate: 'Latest updates go here',
  projectConcerns: 'Escalate dependency on vendor',
  commercialOpportunities: 'Upsell managed services',
  commercialRisks: 'Budget freeze risk',
  milestones: [
    {
      name: 'milestone 1',
      commentary: 'Kick-off completed',
      dueDate: '2026-01-01T12:00:00.000Z',
      rag: 'At Risk',
    },
    {
      name: 'milestone 2',
      commentary: 'Launch planned',
      rag: 'Complete',
    },
  ],
}

export const Default: Story = {
  args: {
    customerProjectPairs: exampleCustomerProjectPairs,
  },
}


export const NoCustomers: Story = {
  args: {
    // customerProjectPairs: exampleCustomerProjectPairs,
  },
}

export const PrefilledValues: Story = {
  args: {
    customerProjectPairs: exampleCustomerProjectPairs,
    initialData: prefilledSubmission,
  },
}