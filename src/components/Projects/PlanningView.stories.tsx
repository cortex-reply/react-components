import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { PlanningView } from './PlanningView'
import { Task, Epic, Sprint } from '../Foundary/types'

const meta: Meta<typeof PlanningView> = {
  title: 'Projects/Views/PlanningView',
  component: PlanningView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PlanningView>

// Helper for generating ISO date strings
const toISOString = (date: Date) => date.toISOString()

// Helper for generating assignees
const generateAssignee = () => ({
  relationTo: 'users' as const,
  value: 'cm1twzm1w000108jh4gzfk3m4', // Sample user ID
})

const mockTasks = [
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
    status: 'review' as const,
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
    status: 'in-progress' as const,
    priority: 'low' as const,
    type: 'story' as const,
    storyPoints: 8,
    epic: 1,
    assignee: generateAssignee(),
    dateLogged: toISOString(new Date('2026-02-15')),
    index: 3,
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-15')),
  },
]

const mockEpics = [
  {
    id: 1,
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
    confidence: 'high' as const,
    phase: 2,
    startDate: toISOString(new Date('2026-02-01')),
    endDate: toISOString(new Date('2026-03-15')),
    progress: 75,
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
    endDate: toISOString(new Date('2026-03-15')),
    progress: 30,
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-01')),
  },
]

const mockSprints = [
  {
    id: 1,
    name: 'Sprint 1',
    description: 'Foundation phase',
    startDate: toISOString(new Date('2026-02-01')),
    endDate: toISOString(new Date('2026-02-14')),
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-01')),
  },
  {
    id: 2,
    name: 'Sprint 2 (Active)',
    description: 'Current active sprint',
    startDate: toISOString(new Date('2026-02-16')),
    endDate: toISOString(new Date('2026-03-02')),
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-02-16')),
  },
  {
    id: 3,
    name: 'Sprint 3',
    description: 'Upcoming sprint',
    startDate: toISOString(new Date('2026-03-03')),
    endDate: toISOString(new Date('2026-03-16')),
    updatedAt: toISOString(new Date()),
    createdAt: toISOString(new Date('2026-03-03')),
  },
]

// Generate many tasks for comprehensive testing
const generateMockTasks = (): Task[] => {
  const taskTypes = ['story', 'task', 'bug', 'spike'] as const
  const priorities = ['low', 'medium', 'high'] as const
  const statuses = ['todo', 'in-progress', 'review', 'done'] as const
  const assignees = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Wilson',
    'David Brown',
    'Lisa Chen',
    'Tom Anderson',
    'Emma Davis',
  ]

  const taskTemplates = [
    'Implement user authentication',
    'Design responsive layout',
    'Create API endpoints',
    'Write unit tests',
    'Fix login bug',
    'Optimize database queries',
    'Add error handling',
    'Update documentation',
    'Refactor components',
    'Implement search functionality',
    'Add validation',
    'Create dashboard widgets',
    'Integrate third-party service',
    'Set up CI/CD pipeline',
    'Performance optimization',
    'Security audit',
    'Accessibility improvements',
    'Mobile responsiveness',
    'Data migration',
    'Feature testing',
  ]

  const tasks: Task[] = []
  let taskId = 1

  // Create backlog tasks (no sprint assigned)
  for (let i = 0; i < 15; i++) {
    const template = taskTemplates[i % taskTemplates.length]
    tasks.push({
      id: taskId,
      name: `${template} (Backlog)`,
      description: `Detailed description for ${template.toLowerCase()}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
      storyPoints: Math.floor(Math.random() * 8) + 1,
      epic: Math.random() > 0.5 ? Math.floor(Math.random() * 2) + 1 : 1,
      assignee: generateAssignee(),
      dateLogged: toISOString(new Date('2026-02-01')),
      index: taskId,
      updatedAt: toISOString(new Date()),
      createdAt: toISOString(new Date('2026-02-01')),
    })
    taskId++
  }

  // Create tasks for each of the 20 sprints
  for (let sprintNum = 1; sprintNum <= 20; sprintNum++) {
    const tasksPerSprint = Math.floor(Math.random() * 8) + 3 // 3-10 tasks per sprint

    for (let i = 0; i < tasksPerSprint; i++) {
      const template = taskTemplates[i % taskTemplates.length]
      tasks.push({
        id: taskId,
        name: `${template} (Sprint ${sprintNum})`,
        description: `Sprint ${sprintNum} task: ${template.toLowerCase()}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
        storyPoints: Math.floor(Math.random() * 8) + 1,
        epic: Math.random() > 0.5 ? Math.floor(Math.random() * 2) + 1 : 1,
        sprint: sprintNum,
        assignee: generateAssignee(),
        dateLogged: toISOString(new Date('2026-02-01')),
        index: taskId,
        updatedAt: toISOString(new Date()),
        createdAt: toISOString(new Date('2026-02-01')),
      })
      taskId++
    }
  }

  return tasks
}

// Generate 20 sprints for comprehensive testing
const generateMockSprints = (): Sprint[] => {
  const sprints: Sprint[] = []
  const baseDate = new Date('2026-02-01')

  for (let i = 1; i <= 20; i++) {
    const startDate = new Date(baseDate)
    startDate.setDate(baseDate.getDate() + (i - 1) * 14)
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 13)

    sprints.push({
      id: i,
      name: `Sprint ${i}${i === 2 ? ' (Active)' : ''}`,
      description: `Development sprint ${i} - ${
        i <= 5
          ? 'Foundation'
          : i <= 10
          ? 'Core Features'
          : i <= 15
          ? 'Advanced Features'
          : 'Polish & Release'
      }`,
      startDate: toISOString(startDate),
      endDate: toISOString(endDate),
      updatedAt: toISOString(new Date()),
      createdAt: toISOString(startDate),
    })
  }

  return sprints
}

const generateMockEpics = (): Epic[] => {
  return [
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
      endDate: toISOString(new Date('2026-03-15')),
      updatedAt: toISOString(new Date()),
      createdAt: toISOString(new Date('2026-02-01')),
    },
    {
      id: 3,
      name: 'Mobile App',
      color: 'bg-purple-500',
      description: 'Develop mobile application',
      confidence: 'low' as const,
      phase: 3,
      startDate: toISOString(new Date('2026-03-01')),
      endDate: toISOString(new Date('2026-05-15')),
      updatedAt: toISOString(new Date()),
      createdAt: toISOString(new Date('2026-03-01')),
    },
    {
      id: 4,
      name: 'API Integration',
      color: 'bg-orange-500',
      description: 'Integrate with external APIs and services',
      confidence: 'high' as const,
      phase: 2,
      startDate: toISOString(new Date('2026-02-15')),
      endDate: toISOString(new Date('2026-04-01')),
      updatedAt: toISOString(new Date()),
      createdAt: toISOString(new Date('2026-02-15')),
    },
  ]
}

export const Default: Story = {
  args: {
    tasks: mockTasks,
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: fn(),
    onTaskClick: fn(),
    onAddSprint: fn(),
    onUpdateSprint: fn(),
    onDeleteSprint: fn(),
  },
}

export const WithManySprintsAndTasks: Story = {
  name: 'Many Sprints & Tasks (20 Sprints)',
  args: {
    tasks: generateMockTasks(),
    epics: generateMockEpics(),
    sprints: generateMockSprints(),
    onUpdateTask: fn(),
    onTaskClick: fn(),
    onAddSprint: fn(),
    onUpdateSprint: fn(),
    onDeleteSprint: fn(),
  },
}

export const EmptyBacklog: Story = {
  name: 'Empty Backlog with Active Sprints',
  args: {
    tasks: generateMockTasks().filter((task) => task.sprint), // Remove backlog tasks
    epics: generateMockEpics(),
    sprints: generateMockSprints(),
    onUpdateTask: fn(),
    onTaskClick: fn(),
    onAddSprint: fn(),
    onUpdateSprint: fn(),
    onDeleteSprint: fn(),
  },
}

export const OnlyBacklogTasks: Story = {
  name: 'Only Backlog Tasks',
  args: {
    tasks: generateMockTasks().filter((task) => !task.sprint), // Only backlog tasks
    epics: generateMockEpics(),
    sprints: generateMockSprints(),
    onUpdateTask: fn(),
    onTaskClick: fn(),
    onAddSprint: fn(),
    onUpdateSprint: fn(),
    onDeleteSprint: fn(),
  },
}

export const NoTasks: Story = {
  args: {
    tasks: [],
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: fn(),
    onTaskClick: fn(),
    onAddSprint: fn(),
    onUpdateSprint: fn(),
    onDeleteSprint: fn(),
  },
}

export const NoSprints: Story = {
  args: {
    tasks: mockTasks,
    epics: mockEpics,
    sprints: [],
    onUpdateTask: fn(),
    onTaskClick: fn(),
    onAddSprint: fn(),
    onUpdateSprint: fn(),
    onDeleteSprint: fn(),
  },
}

export const Test: Story = {
  args: {
    tasks: [
      {
        id: 1,
        name: 'test task',
        description: 'description',
        status: 'in-progress' as const,
        assignee: {
          relationTo: 'users',
          value: 'cm1twzm1w000108jh4gzfk3m4',
        },
        priority: 'low' as const,
        type: 'bug' as const,
        storyPoints: 1,
        epic: 2,
        dateLogged: toISOString(new Date('2026-02-15')),
        index: 1,
        updatedAt: toISOString(new Date()),
        createdAt: toISOString(new Date('2026-02-15')),
        sprint: 2,
      },
    ],
    epics: [
      {
        id: 2,
        name: 'epic 2',
        color: 'bg-blue-500',
        confidence: 'medium' as const,
        phase: 1,
        startDate: toISOString(new Date('2026-02-01')),
        endDate: toISOString(new Date('2026-03-15')),
        description: '',
        updatedAt: toISOString(new Date()),
        createdAt: toISOString(new Date('2026-02-01')),
      },
      {
        id: 1,
        name: 'test epic',
        color: 'bg-blue-500',
        confidence: 'medium' as const,
        phase: 1,
        startDate: toISOString(new Date('2026-02-01')),
        endDate: toISOString(new Date('2026-03-15')),
        description: '',
        updatedAt: toISOString(new Date()),
        createdAt: toISOString(new Date('2026-02-01')),
      },
    ],
    sprints: [
      {
        id: 2,
        name: 'Sprint 2 (Active)',
        description: 'Active sprint containing the test task',
        startDate: toISOString(new Date('2026-02-16')),
        endDate: toISOString(new Date('2026-03-02')),
        updatedAt: toISOString(new Date()),
        createdAt: toISOString(new Date('2026-02-16')),
      },
    ],
    onUpdateTask: fn(),
    onTaskClick: fn(),
    onAddSprint: fn(),
    onUpdateSprint: fn(),
    onDeleteSprint: fn(),
  },
}
