import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { SprintBoardView } from './SprintBoardView'
import { Task, Epic, Sprint, Colleague } from '../Foundry/types'

const meta: Meta<typeof SprintBoardView> = {
  title: 'Projects/Views/SprintBoard',
  component: SprintBoardView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sprint board view with kanban-style columns for each sprint. Supports sprint selection with persistent storage and task management.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SprintBoardView>

// Helper for generating ISO date strings
const toISOString = (date: Date) => date.toISOString()

// Helper for generating assignees
const generateAssignee = () => ({
  relationTo: 'users' as const,
  value: 'cm1twzm1w000108jh4gzfk3m4',
})

// Mock colleagues for assignees
const mockColleagues: any[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    createdAt: toISOString(new Date()),
    updatedAt: toISOString(new Date()),
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    createdAt: toISOString(new Date()),
    updatedAt: toISOString(new Date()),
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@example.com',
    createdAt: toISOString(new Date()),
    updatedAt: toISOString(new Date()),
  },
]

// Mock epics
const mockEpics: Epic[] = [
  {
    id: 1,
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
    confidence: 'high' as const,
    phase: 2,
    startDate: toISOString(new Date('2026-02-01')),
    endDate: toISOString(new Date('2026-03-15')),
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-01')),
  },
  {
    id: 2,
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
    confidence: 'medium' as const,
    phase: 1,
    startDate: toISOString(new Date('2026-02-01')),
    endDate: toISOString(new Date('2026-04-01')),
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-01')),
  },
  {
    id: 3,
    name: 'API Integration',
    color: 'bg-purple-500',
    description: 'Integrate third-party APIs',
    confidence: 'high' as const,
    phase: 2,
    startDate: toISOString(new Date('2026-02-15')),
    endDate: toISOString(new Date('2026-03-30')),
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-15')),
  },
]

// Mock sprints
const mockSprints: Sprint[] = [
  {
    id: 1,
    name: 'Sprint 1: Core Auth',
    description: 'Focus on authentication and user onboarding',
    startDate: toISOString(new Date('2026-02-01')),
    endDate: toISOString(new Date('2026-02-14')),
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-01-25')),
  },
  {
    id: 2,
    name: 'Sprint 2: Dashboard',
    description: 'Build dashboard UI and core features',
    startDate: toISOString(new Date('2026-02-15')),
    endDate: toISOString(new Date('2026-03-01')),
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-01-25')),
  },
  {
    id: 3,
    name: 'Sprint 3: API',
    description: 'API endpoints and integrations',
    startDate: toISOString(new Date('2026-03-02')),
    endDate: toISOString(new Date('2026-03-15')),
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-01-25')),
  },
]

// Mock tasks
const mockTasks: Task[] = [
  {
    id: 1,
    name: 'Design login page',
    description: 'Create wireframes and mockups for the login interface',
    status: 'todo' as const,
    priority: 'high' as const,
    type: 'story' as const,
    storyPoints: 5,
    epic: 1,
    sprint: 2,
    assignee: generateAssignee(),
    dateLogged: toISOString(new Date('2026-02-15')),
    index: 1,
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-15')),
  },
  {
    id: 2,
    name: 'Research mobile frameworks',
    description: 'Investigate best practices for mobile responsive design',
    status: 'in-progress' as const,
    priority: 'medium' as const,
    type: 'spike' as const,
    storyPoints: 3,
    epic: 2,
    sprint: 2,
    assignee: generateAssignee(),
    dateLogged: toISOString(new Date('2026-02-15')),
    index: 2,
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-15')),
  },
  {
    id: 3,
    name: 'Implement OAuth integration',
    description: 'Add Google and GitHub OAuth authentication',
    status: 'review' as const,
    priority: 'high' as const,
    type: 'story' as const,
    storyPoints: 8,
    epic: 1,
    sprint: 2,
    assignee: generateAssignee(),
    dateLogged: toISOString(new Date('2026-02-20')),
    index: 3,
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-15')),
  },
  {
    id: 4,
    name: 'Setup database schema',
    description: 'Design and implement initial database structure',
    status: 'done' as const,
    priority: 'high' as const,
    type: 'task' as const,
    storyPoints: 5,
    epic: 1,
    sprint: 1,
    assignee: generateAssignee(),
    dateLogged: toISOString(new Date('2026-02-01')),
    index: 4,
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-01')),
  },
  {
    id: 5,
    name: 'Create API endpoints',
    description: 'Build RESTful API endpoints for core features',
    status: 'todo' as const,
    priority: 'high' as const,
    type: 'story' as const,
    storyPoints: 8,
    epic: 3,
    sprint: 3,
    assignee: generateAssignee(),
    dateLogged: toISOString(new Date('2026-03-02')),
    index: 5,
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-25')),
  },
  {
    id: 6,
    name: 'Write API documentation',
    description: 'Document all API endpoints with examples',
    status: 'todo' as const,
    priority: 'medium' as const,
    type: 'task' as const,
    storyPoints: 3,
    epic: 3,
    sprint: 3,
    assignee: generateAssignee(),
    dateLogged: toISOString(new Date('2026-03-02')),
    index: 6,
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-25')),
  },
  {
    id: 7,
    name: 'Fix authentication bug',
    description: 'Resolve issue with token expiration',
    status: 'in-progress' as const,
    priority: 'high' as const,
    type: 'bug' as const,
    storyPoints: 2,
    epic: 1,
    sprint: 2,
    assignee: generateAssignee(),
    dateLogged: toISOString(new Date('2026-02-20')),
    index: 7,
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-18')),
  },
]

export const Default: Story = {
  args: {
    initialTasks: mockTasks,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialColleagues: mockColleagues,
    initialUsers: [],
    onAddTask: fn(),
    onUpdateTask: fn(),
    onDeleteTask: fn(),
    onTaskClick: fn(),
    onAddEpic: fn(),
    onAddSprint: fn(),
    onAddComment: fn(),
    onUploadFile: fn(),
    onDeleteFile: fn(),
    onFileUpdate: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default sprint board with multiple sprints and organized tasks across epics.',
      },
    },
  },
}

export const MobileView: Story = {
  args: {
    initialTasks: mockTasks,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialColleagues: mockColleagues,
    initialUsers: [],
    onAddTask: fn(),
    onUpdateTask: fn(),
    onDeleteTask: fn(),
    onTaskClick: fn(),
    onAddEpic: fn(),
    onAddSprint: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Sprint board optimized for mobile devices with horizontal scrolling.',
      },
    },
  },
}

export const TabletView: Story = {
  args: {
    initialTasks: mockTasks,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialColleagues: mockColleagues,
    initialUsers: [],
    onAddTask: fn(),
    onUpdateTask: fn(),
    onDeleteTask: fn(),
    onTaskClick: fn(),
    onAddEpic: fn(),
    onAddSprint: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Sprint board on tablet screens with adapted layout.',
      },
    },
  },
}

export const DesktopView: Story = {
  args: {
    initialTasks: mockTasks,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialColleagues: mockColleagues,
    initialUsers: [],
    onAddTask: fn(),
    onUpdateTask: fn(),
    onDeleteTask: fn(),
    onTaskClick: fn(),
    onAddEpic: fn(),
    onAddSprint: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Full desktop sprint board with all sprint columns visible.',
      },
    },
  },
}

export const DarkBackground: Story = {
  args: {
    initialTasks: mockTasks,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialColleagues: mockColleagues,
    initialUsers: [],
    onAddTask: fn(),
    onUpdateTask: fn(),
    onDeleteTask: fn(),
    onTaskClick: fn(),
    onAddEpic: fn(),
    onAddSprint: fn(),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    docs: {
      description: {
        story: 'Sprint board with dark background for dark theme support.',
      },
    },
  },
}

export const WithSingleSprint: Story = {
  args: {
    initialTasks: mockTasks.filter((t) => t.sprint === 2),
    initialEpics: mockEpics,
    initialSprints: [mockSprints[1]],
    initialColleagues: mockColleagues,
    initialUsers: [],
    onAddTask: fn(),
    onUpdateTask: fn(),
    onDeleteTask: fn(),
    onTaskClick: fn(),
    onAddEpic: fn(),
    onAddSprint: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Sprint board showing a single sprint column with tasks.',
      },
    },
  },
}

export const MultipleSprints: Story = {
  args: {
    initialTasks: mockTasks,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialColleagues: mockColleagues,
    initialUsers: [],
    onAddTask: fn(),
    onUpdateTask: fn(),
    onDeleteTask: fn(),
    onTaskClick: fn(),
    onAddEpic: fn(),
    onAddSprint: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Sprint board showing multiple sprint columns for side-by-side comparison.',
      },
    },
  },
}

export const EmptyState: Story = {
  args: {
    initialTasks: [],
    initialEpics: [],
    initialSprints: [],
    initialUsers: [],
    initialColleagues: [],
    onAddTask: fn(),
    onUpdateTask: fn(),
    onDeleteTask: fn(),
    onTaskClick: fn(),
    onAddEpic: fn(),
    onAddSprint: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Sprint board with no sprints, epics, or tasks showing the empty state.',
      },
    },
  },
}

export const HighDensity: Story = {
  args: {
    initialTasks: mockTasks.flatMap((task, idx) =>
      Array.from({ length: 5 }, (_, i) => ({
        ...task,
        id: task.id + idx * 100 + i,
        name: `${task.name} - ${i + 1}`,
      })),
    ) as Task[],
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialColleagues: mockColleagues,
    initialUsers: [],
    onAddTask: fn(),
    onUpdateTask: fn(),
    onDeleteTask: fn(),
    onTaskClick: fn(),
    onAddEpic: fn(),
    onAddSprint: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Sprint board with many tasks to test high-density scenarios.',
      },
    },
  },
}
