import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HolidayGrid } from './HolidayGrid'
import { Holiday } from '../../model/Holiday'
import { Employee } from '../../model/Employee'

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
]

const mockEmployees: Employee[] = [
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
