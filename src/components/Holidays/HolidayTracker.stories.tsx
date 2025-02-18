import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HolidayTracker } from './HolidayTracker'
import { fn } from '@storybook/test'
import { format } from 'date-fns'

const meta: Meta<typeof HolidayTracker> = {
  title: 'Holidays/HolidayTracker',
  component: HolidayTracker,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
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
type Story = StoryObj<typeof HolidayTracker>

export const Default: Story = {
  args: {
    // Mock holidays data
    currentDate: format(new Date(2025, 0, 2), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"), // January 2025
    holidays: [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        startDate: '2025-01-05',
        endDate: '2025-01-10',
        status: 'approved',
        totalDays: 6,
        leaveType: 'Full Day',
      },
      {
        id: '2',
        userId: '2',
        userName: 'Jane Smith',
        startDate: '2025-01-15',
        endDate: '2025-01-15',
        status: 'requested',
        totalDays: 0.5,
        leaveType: 'Morning',
      },
      {
        id: '3',
        userId: '3',
        userName: 'Bob Johnson',
        startDate: '2025-01-25',
        endDate: '2025-01-30',
        status: 'approved',
        totalDays: 6,
        leaveType: 'Full Day',
      },
      {
        id: '4',
        userId: '4',
        userName: 'Alice Brown',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        status: 'approved',
        totalDays: 0.5,
        leaveType: 'Afternoon',
      },
    ],
    leaveApprovals: [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        userEmail: 'john.doe@example.com',
        userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        startDate: '2025-01-05',
        endDate: '2025-01-10',
        status: 'requested',
        totalDays: 6,
        leaveType: 'Full Day',
      },
      {
        id: '2',
        userId: '2',
        userName: 'Jane Smith',
        userEmail: 'jane.smith@example.com',
        userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        startDate: '2025-01-15',
        endDate: '2025-01-15',
        status: 'requested',
        totalDays: 0.5,
        leaveType: 'Morning',
      },
      {
        id: '3',
        userId: '3',
        userName: 'Bob Johnson',
        userEmail: 'bob.johnson@example.com',
        userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        startDate: '2025-01-25',
        endDate: '2025-01-30',
        status: 'requested',
        totalDays: 6,
        leaveType: 'Full Day',
      },
      {
        id: '4',
        userId: '4',
        userName: 'Alice Brown',
        userEmail: 'alice.brown@example.com',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        status: 'requested',
        totalDays: 0.5,
        leaveType: 'Afternoon',
      },
      {
        id: '5',
        userId: '4',
        userName: 'Alice Brown',
        userEmail: 'alice.brown@example.com',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        status: 'requested',
        totalDays: 0.5,
        leaveType: 'Afternoon',
      },
      {
        id: '6',
        userId: '4',
        userName: 'Alice Brown',
        userEmail: 'alice.brown@example.com',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        status: 'requested',
        totalDays: 0.5,
        leaveType: 'Afternoon',
      },
      {
        id: '7',
        userId: '4',
        userName: 'Alice Brown',
        userEmail: 'alice.brown@example.com',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        status: 'requested',
        totalDays: 0.5,
        leaveType: 'Afternoon',
      },
      {
        id: '8',
        userId: '4',
        userName: 'Alice Brown',
        userEmail: 'alice.brown@example.com',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        status: 'requested',
        totalDays: 0.5,
        leaveType: 'Afternoon',
      },
    ],
    employees: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      },
      {
        id: '4',
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      },
      {
        id: '5',
        name: 'Charlie Davis',
        email: 'charlie.davis@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      },
      {
        id: '6',
        name: 'Diana Evans',
        email: 'diana.evans@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
      },
      {
        id: '7',
        name: 'Ethan Foster',
        email: 'ethan.foster@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan',
      },
      {
        id: '8',
        name: 'Fiona Green',
        email: 'fiona.green@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fiona',
      },
      {
        id: '9',
        name: 'George Harris',
        email: 'george.harris@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George',
      },
      {
        id: '10',
        name: 'Hannah Irving',
        email: 'hannah.irving@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hannah',
      },
      {
        id: '11',
        name: 'Ian Jackson',
        email: 'ian.jackson@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ian',
      },
      {
        id: '12',
        name: 'Julia King',
        email: 'julia.king@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
      },
      {
        id: '13',
        name: 'Kevin Lewis',
        email: 'kevin.lewis@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
      },
      {
        id: '14',
        name: 'Laura Miller',
        email: 'laura.miller@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
      },
      {
        id: '15',
        name: 'Michael Nelson',
        email: 'michael.nelson@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      },
      {
        id: '16',
        name: 'Nina Owens',
        email: 'nina.owens@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
      },
      {
        id: '17',
        name: 'Oscar Perez',
        email: 'oscar.perez@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar',
      },
      {
        id: '18',
        name: 'Paula Quinn',
        email: 'paula.quinn@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Paula',
      },
      {
        id: '19',
        name: 'Quincy Roberts',
        email: 'quincy.roberts@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quincy',
      },
      {
        id: '20',
        name: 'Rachel Scott',
        email: 'rachel.scott@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
      },
    ],
    submitLeaveRequest: fn(),
    approveLeave(ids) {
      return Promise.resolve({ success: true, message: `Approved ${ids.length} request(s)` })
    },
    rejectLeave(ids) {
      return Promise.resolve({ success: true, message: `Rejected ${ids.length} request(s)` })
    },
    currentUser: { grade: 'Consultant 1', remainingLeaveDays: 20 },
  },
}

export const Manger: Story = {
  args: {
    ...Default.args,
    currentUser: { grade: 'Manager', remainingLeaveDays: 20 },
  },
}

export const NoLeave: Story = {
  args: {
    ...Default.args,
    currentUser: { grade: 'Manager', remainingLeaveDays: 0 },
  },
}
