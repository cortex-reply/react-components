import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { CRMKanbanBoard, statuses } from './KanbanBoard'
import { BoardData, Deal, Customer, CRMStatus } from './types'
import { mockUsers, mockCustomers, mockCategories } from './mockData'

const meta: Meta<typeof CRMKanbanBoard> = {
  title: 'CRM/KanbanBoard',
  component: CRMKanbanBoard,
}

export default meta
type Story = StoryFn<typeof CRMKanbanBoard>

const Template: Story = (args) => {
  const [boardData, setBoardData] = useState<BoardData>(args.initialData)

  const handleUpdateDeal = async (updatedDeal: Deal) => {
    console.log('Updating deal:', updatedDeal)
    setBoardData((prevData) => ({
      ...prevData,
      deals: (prevData.deals ?? []).map((deal) =>
        deal.id === updatedDeal.id ? updatedDeal : deal,
      ),
    }))
    return updatedDeal
  }

  return <CRMKanbanBoard {...args} initialData={boardData} updateDeal={handleUpdateDeal} />
}

export const Default: Story = Template.bind({})
Default.args = {
  initialData: {
    deals: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      customer: mockCustomers[i % mockCustomers.length],
      value: Math.floor(Math.random() * 100000) + 5000,
      assignee: mockUsers[Math.floor(Math.random() * mockUsers.length)].name,
      status: statuses[Math.floor(Math.random() * 5)] as CRMStatus,
      categories: [mockCategories[i % mockCategories.length].id],
      dateLogged: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
      closureDate: new Date(
        Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
      ).toISOString(),
      comments: [],
      updatedAt: new Date().toISOString(),
      description: `This is a mock description for deal ${i + 1}. It's a ${['small', 'medium', 'large'][i % 3]} deal with high potential.`,
    })),
    customers: mockCustomers,
    users: mockUsers,
    categories: mockCategories,
  },
  addNewDeal: async (deal) => {
    console.log('Adding deal:', deal)
    return { ...deal, id: 'new-deal-id' }
  },
  // updateDeal: async (deal) => {
  //   console.log("Updating deal:", deal);
  //   return deal;
  // },
  addNewCustomer: async (customer) => {
    console.log('Adding customer:', customer)
    return { ...customer, id: 'new-customer-id' }
  },
  addComment: async (dealId, comment) => {
    console.log('Adding comment to deal:', dealId, comment)
    return { ...comment, id: 'new-comment-id' }
  },
}

export const NoDeals: Story = Template.bind({})
NoDeals.args = {
  ...Default.args,
  initialData: {
    ...Default.args.initialData,
    deals: [],
  },
}
