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

// Epics grouped by name (same name = same row) with different phases
const mockEpics = [
  {
    id: 1,
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
    confidence: 'high' as const,
    phase: 1,
    startDate: '2024-01-01',
    endDate: '2024-01-28',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'OAuth integration and session management',
    confidence: 'high' as const,
    phase: 2,
    startDate: '2024-02-01',
    endDate: '2024-03-15',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 3,
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
    confidence: 'medium' as const,
    phase: 1,
    startDate: '2024-01-15',
    endDate: '2024-02-28',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 4,
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Analytics widgets and reporting',
    confidence: 'medium' as const,
    phase: 2,
    startDate: '2024-03-01',
    endDate: '2024-04-15',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 5,
    name: 'Mobile Optimization',
    color: 'bg-purple-500',
    description: 'Optimize application for mobile devices',
    confidence: 'low' as const,
    phase: 1,
    startDate: '2024-02-15',
    endDate: '2024-04-01',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 6,
    name: 'Performance Improvements',
    color: 'bg-orange-500',
    description: 'Enhance application performance and speed',
    confidence: 'high' as const,
    phase: 1,
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 7,
    name: 'Performance Improvements',
    color: 'bg-orange-500',
    description: 'Database query optimisation',
    confidence: 'high' as const,
    phase: 2,
    startDate: '2024-02-15',
    endDate: '2024-03-20',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
]

const mockSprints = [
  {
    id: 1,
    name: 'Sprint 1',
    description: 'Initial development',
    startDate: '2024-01-01',
    endDate: '2024-01-14',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: 'Sprint 2',
    description: 'Feature development',
    startDate: '2024-01-15',
    endDate: '2024-01-28',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 3,
    name: 'Sprint 3',
    description: 'Integration phase',
    startDate: '2024-01-29',
    endDate: '2024-02-11',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 4,
    name: 'Sprint 4',
    description: 'Polish and QA',
    startDate: '2024-02-12',
    endDate: '2024-02-25',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 5,
    name: 'Sprint 5',
    description: 'Release preparation',
    startDate: '2024-02-26',
    endDate: '2024-03-10',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
  {
    id: 6,
    name: 'Sprint 6',
    description: 'Post-launch fixes',
    startDate: '2024-03-11',
    endDate: '2024-03-24',
    updatedAt: '2024-01-01',
    createdAt: '2024-01-01',
  },
]

const mockTasks = [
  { id: 1, epic: 1, status: 'done' as const, index: 0, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 2, epic: 1, status: 'done' as const, index: 1, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 3, epic: 1, status: 'review' as const, index: 2, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 4, epic: 1, status: 'in-progress' as const, index: 3, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 5, epic: 2, status: 'done' as const, index: 0, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 6, epic: 2, status: 'todo' as const, index: 1, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 7, epic: 3, status: 'done' as const, index: 0, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 8, epic: 3, status: 'done' as const, index: 1, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 9, epic: 3, status: 'done' as const, index: 2, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 10, epic: 4, status: 'todo' as const, index: 0, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 11, epic: 5, status: 'in-progress' as const, index: 0, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 12, epic: 6, status: 'done' as const, index: 0, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 13, epic: 6, status: 'done' as const, index: 1, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
  { id: 14, epic: 7, status: 'todo' as const, index: 0, dateLogged: '2024-01-01', updatedAt: '2024-01-01', createdAt: '2024-01-01' },
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
