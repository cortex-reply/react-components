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
      rag: 'Delivered',
    },
  ],
}

const payloadLikeInitialData = {
  id: 1,
  user: {
    id: 1,
    name: 'Test user - do not delete',
    email: 'test@test.com',
    holidaysRemaining: 25,
    startingHolidays: 25,
  },
  customer: {
    id: 55,
    name: 'Payload Customer',
    active: true,
  },
  project: {
    id: 77,
    projectName: 'Prefilled Project',
    customer: {
      id: 55,
      name: 'Payload Customer',
    },
    deliveryLead: 1,
    projectSummary: 'Embedded project summary from payload',
    updatedAt: '2025-12-29T17:01:42.242Z',
    createdAt: '2025-12-29T17:01:02.257Z',
  },
  projectSummary: 'Prefilled summary from payload object',
  milestones: [
    {
      id: '6952b833837af7823a9d9f73',
      name: 'milestone 1',
      commentary: 'Kick-off complete',
      dueDate: '2026-01-01T12:00:00.000Z',
      rag: 'At Risk',
    },
    {
      id: '6952b85a837af7823a9d9f75',
      name: 'milestone 2',
      commentary: 'Rollout planned',
      rag: 'Delivered',
    },
  ],
  projectUpdate: 'Prefilled update text',
  projectConcerns: null,
  commercialOpportunities: null,
  commercialRisks: null,
  updatedAt: '2025-12-29T17:20:48.305Z',
  createdAt: '2025-12-29T17:20:08.051Z',
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

export const PrefilledFromPayloadObjects: Story = {
  args: {
    customerProjectPairs: exampleCustomerProjectPairs,
    initialData: payloadLikeInitialData,
  },
}

export const PrefilledWithoutPairs: Story = {
  args: {
    initialData: payloadLikeInitialData,
  },
}