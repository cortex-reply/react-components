import type { Meta, StoryObj } from '@storybook/react'
import { CalendarView } from './CalendarView'
import * as React from 'react'
import { useState } from 'react'
import { Holiday } from '../../model/Holiday'
const meta: Meta<typeof CalendarView> = {
  title: 'Holidays/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof CalendarView>

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
    totalDays: 5.5,
    leaveTypeStart: 'Full Day',
    leaveTypeEnd: 'Morning',
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

export const Default: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)) // January 2025
    return (
      <CalendarView
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        holidays={mockHolidays}
      />
    )
  },
}
