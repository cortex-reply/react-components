import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { HolidayTracker } from './HolidayTracker'
// import { useUser } from '../app/hooks/useUser';
import { fn } from '@storybook/test'

// // Mock the useUser hook
// jest.mock('../app/hooks/useUser', () => ({
//   useUser: () => ({
//     user: {
//       id: 'manager1',
//       firstName: 'Manager',
//       lastName: 'User',
//       grade: 'manager',
//       remainingLeaveDays: 20,
//     },
//     isLoading: false,
//   }),
// }));

const meta: Meta<typeof HolidayTracker> = {
  title: 'Holidays/HolidayTracker',
  component: HolidayTracker,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true, // 👈 Set this
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
    currentDate: new Date(2025, 0, 1), // January 2025
    holidays: [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        startDate: '2025-01-05',
        endDate: '2025-01-10',
        status: 'approved',
        totalDays: 6,
        leaveTypeStart: 'Full Day',
        leaveTypeEnd: 'Full Day',
      },
      {
        id: '2',
        userId: '2',
        userName: 'Jane Smith',
        startDate: '2025-01-15',
        endDate: '2025-01-15',
        status: 'requested',
        totalDays: 0.5,
        leaveTypeStart: 'Morning',
      },
      {
        id: '3',
        userId: '3',
        userName: 'Bob Johnson',
        startDate: '2025-01-25',
        endDate: '2025-01-30',
        status: 'approved',
        totalDays: 6,
        leaveTypeStart: 'Full Day',
      },
      {
        id: '4',
        userId: '4',
        userName: 'Alice Brown',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        status: 'approved',
        totalDays: 0.5,
        leaveTypeStart: 'Afternoon',
      },
      {
        id: '5',
        userId: '5',
        userName: 'Sarah Smith',
        startDate: '2025-01-20',
        endDate: '2025-01-23',
        status: 'requested',
        totalDays: 3,
        leaveTypeStart: 'Afternoon',
        leaveTypeEnd: 'Morning',
      },
      {
        id: '6',
        userId: '5',
        userName: 'Sarah Smith',
        startDate: '2025-01-14',
        endDate: '2025-01-16',
        status: 'approved',
        totalDays: 2.5,
        leaveTypeStart: 'Afternoon',
        leaveTypeEnd: 'Full Day',
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
        leaveTypeStart: 'Full Day',
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
        leaveTypeStart: 'Morning',
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
        leaveTypeStart: 'Full Day',
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
        leaveTypeStart: 'Afternoon',
      },
      {
        id: '6',
        userId: '5',
        userEmail: 'sarah.smith@example.com',
        userName: 'Sarah Smith',
        startDate: '2025-01-14',
        endDate: '2025-01-16',
        status: 'approved',
        totalDays: 2.5,
        leaveTypeStart: 'Afternoon',
        leaveTypeEnd: 'Full Day',
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
      { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com' },
      { id: '5', name: 'Sarah Smith', email: 'sarah.smith@example.com' },
    ],
    submitLeaveRequest: fn(),
    setCurrentDate: fn(),
    userGrade: 'Consultant 1',
  },
}

export const Manger: Story = {
  args: {
    ...Default.args,
    userGrade: 'Manager',
  },
}

// export const WithTabControl: Story = {
//   render: (args) => {
//     const [currentTab, setCurrentTab] = useState('Grid View');
//     return (
//       <div>
//         <div className="mb-4">
//           <label htmlFor="tab-select" className="mr-2">Select Tab:</label>
//           <select
//             id="tab-select"
//             value={currentTab}
//             onChange={(e) => setCurrentTab(e.target.value)}
//             className="border rounded p-1"
//           >
//             <option value="Grid View">Grid View</option>
//             <option value="Calendar View">Calendar View</option>
//             <option value="Request Leave">Request Leave</option>
//             <option value="Approve Leave">Approve Leave</option>
//           </select>
//         </div>
//         <HolidayTracker {...args} initialTab={currentTab} />
//       </div>
//     );
//   },
// };

// export const LoadingState: Story = {
//   render: () => {
//     // Override the mock to simulate loading state
//     (useUser as jest.Mock).mockReturnValue({
//       user: null,
//       isLoading: true,
//     });

//     return <HolidayTracker />;
//   },
// };
