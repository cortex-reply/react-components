import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { GanttView } from './GanttView'

const meta: Meta<typeof GanttView> = {
  title: 'Projects/Views/GanttView',
  component: GanttView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof GanttView>

const dateFromOffset = (days: number): string => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const createdAt = dateFromOffset(-60)

// Epics grouped by name (same name = same row) with different phases.
// Spans 2 months back to 12 months forward, relative to today.
const mockEpics = [
  {
    id: 1,
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
    confidence: 'high' as const,
    phase: 1,
    startDate: dateFromOffset(-60),
    endDate: dateFromOffset(-20),
    updatedAt: createdAt,
    createdAt,
  },
  {
    id: 2,
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'OAuth integration and session management',
    confidence: 'high' as const,
    phase: 2,
    startDate: dateFromOffset(-19),
    endDate: dateFromOffset(90),
    updatedAt: createdAt,
    createdAt,
  },
  {
    id: 3,
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
    confidence: 'medium' as const,
    phase: 1,
    startDate: dateFromOffset(-30),
    endDate: dateFromOffset(60),
    updatedAt: createdAt,
    createdAt,
  },
  {
    id: 4,
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Analytics widgets and reporting',
    confidence: 'medium' as const,
    phase: 2,
    startDate: dateFromOffset(61),
    endDate: dateFromOffset(180),
    updatedAt: createdAt,
    createdAt,
  },
  {
    id: 5,
    name: 'Mobile Optimization',
    color: 'bg-purple-500',
    description: 'Optimize application for mobile devices',
    confidence: 'low' as const,
    phase: 1,
    startDate: dateFromOffset(120),
    endDate: dateFromOffset(300),
    updatedAt: createdAt,
    createdAt,
  },
  {
    id: 6,
    name: 'Performance Improvements',
    color: 'bg-orange-500',
    description: 'Enhance application performance and speed',
    confidence: 'high' as const,
    phase: 1,
    startDate: dateFromOffset(30),
    endDate: dateFromOffset(150),
    updatedAt: createdAt,
    createdAt,
  },
  {
    id: 7,
    name: 'Performance Improvements',
    color: 'bg-orange-500',
    description: 'Database query optimisation',
    confidence: 'high' as const,
    phase: 2,
    startDate: dateFromOffset(180),
    endDate: dateFromOffset(365),
    updatedAt: createdAt,
    createdAt,
  },
]

// 2-week sprints covering the full 14-month window.
const mockSprints = Array.from({ length: 30 }, (_, i) => {
  const startOffset = -60 + i * 14
  return {
    id: i + 1,
    name: `Sprint ${i + 1}`,
    description: `Sprint ${i + 1}`,
    startDate: dateFromOffset(startOffset),
    endDate: dateFromOffset(startOffset + 13),
    updatedAt: createdAt,
    createdAt,
  }
})

const mockTasks = [
  { id: 1, epic: 1, status: 'done' as const, index: 0, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 2, epic: 1, status: 'done' as const, index: 1, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 3, epic: 1, status: 'review' as const, index: 2, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 4, epic: 1, status: 'in-progress' as const, index: 3, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 5, epic: 2, status: 'done' as const, index: 0, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 6, epic: 2, status: 'todo' as const, index: 1, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 7, epic: 3, status: 'done' as const, index: 0, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 8, epic: 3, status: 'done' as const, index: 1, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 9, epic: 3, status: 'done' as const, index: 2, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 10, epic: 4, status: 'todo' as const, index: 0, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 11, epic: 5, status: 'in-progress' as const, index: 0, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 12, epic: 6, status: 'done' as const, index: 0, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 13, epic: 6, status: 'done' as const, index: 1, dateLogged: createdAt, updatedAt: createdAt, createdAt },
  { id: 14, epic: 7, status: 'todo' as const, index: 0, dateLogged: createdAt, updatedAt: createdAt, createdAt },
]

export const Default: Story = {
  args: {
    tasks: mockTasks as any,
    epics: mockEpics as any,
    sprints: mockSprints as any,
    onUpdateEpic: action('onUpdateEpic'),
    onTaskClick: action('onTaskClick'),
  },
}

export const Empty: Story = {
  args: {
    tasks: [],
    epics: [],
    sprints: mockSprints as any,
    onUpdateEpic: action('onUpdateEpic'),
  },
}

export const NoSprints: Story = {
  args: {
    tasks: mockTasks as any,
    epics: mockEpics as any,
    sprints: [],
    onUpdateEpic: action('onUpdateEpic'),
  },
}

export const SingleEpic: Story = {
  args: {
    tasks: mockTasks.filter((t) => t.epic === 1) as any,
    epics: [mockEpics[0]] as any,
    sprints: mockSprints as any,
    onUpdateEpic: action('onUpdateEpic'),
  },
}
