import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HolidayGrid } from './HolidayGrid'
import { Holiday } from '../../model/Holiday'

const meta: Meta<typeof HolidayGrid> = {
  title: 'Holidays/HolidayGrid',
  component: HolidayGrid,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof HolidayGrid>

const mockHolidays: Holiday[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    startDate: '2025-01-05',
    endDate: '2025-01-10',
    status: 'approved',
    totalDays: 6,
    leaveTypeStart: 'Full Day',
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
]

const mockEmployees = [
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
]

export const Default: Story = {
  render: () => {
    const [currentDate, setCurrentDateState] = useState(new Date(2025, 0, 1)) // January 2025
    const setCurrentDate = async (date: Date) => {
      setCurrentDateState(date)
      return { success: true }
    }
    return (
      <HolidayGrid
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        holidays={mockHolidays}
        employees={mockEmployees}
      />
    )
  },
}
