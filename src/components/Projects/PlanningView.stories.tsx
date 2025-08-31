import type { Meta, StoryObj } from '@storybook/react'
import { PlanningView } from './PlanningView'
import { Task, Epic, Sprint } from './ProjectView'

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

const mockTasks = [
  {
    id: '1',
    name: 'Design login page',
    description: 'Create wireframes and mockups for the login interface',
    status: 'todo' as const,
    priority: 'high' as const,
    type: 'story' as const,
    points: 5,
    epicId: '1',
    sprintId: '2',
    assignee: 'John Doe',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Research mobile frameworks',
    description: 'Investigate best practices for mobile responsive design',
    status: 'review' as const,
    priority: 'medium' as const,
    type: 'spike' as const,
    points: 3,
    epicId: '2',
    sprintId: '2',
    assignee: 'Jane Smith',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    name: 'Implement OAuth integration',
    description: 'Add Google and GitHub OAuth authentication',
    status: 'in-progress' as const,
    priority: 'low' as const,
    type: 'story' as const,
    points: 8,
    epicId: '1',
    assignee: 'Mike Johnson',
    createdAt: new Date('2024-01-17'),
  },
]

const mockEpics = [
  {
    id: '1',
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
    confidence: 'high' as const,
    phase: 2,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-02-15'),
    progress: 75,
    isSelected: true,
  },
  {
    id: '2',
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
    confidence: 'medium' as const,
    phase: 1,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-15'),
    progress: 30,
    isSelected: true,
  },
]

const mockSprints = [
  {
    id: 'backlog',
    name: 'Backlog',
    description: 'Tasks not yet assigned to a sprint',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: false,
    isSelected: false,
  },
  {
    id: '1',
    name: 'Sprint 1',
    description: 'Initial development phase',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-14'),
    isActive: false,
    isSelected: false,
  },
  {
    id: '2',
    name: 'Sprint 2',
    description: 'Feature development',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-28'),
    isActive: true,
    isSelected: true,
  },
]

// Generate 20 sprints for comprehensive testing
const generateMockSprints = (): Sprint[] => {
  const sprints: Sprint[] = [
    {
      id: 'backlog',
      name: 'Backlog',
      description: 'Tasks not yet assigned to a sprint',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      isActive: false,
      isSelected: false,
    },
  ]

  for (let i = 1; i <= 20; i++) {
    const startDate = new Date('2024-01-01')
    startDate.setDate(startDate.getDate() + (i - 1) * 14)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 13)

    sprints.push({
      id: i.toString(),
      name: `Sprint ${i}`,
      description: `Development sprint ${i} - ${
        i <= 5
          ? 'Foundation'
          : i <= 10
          ? 'Core Features'
          : i <= 15
          ? 'Advanced Features'
          : 'Polish & Release'
      }`,
      startDate,
      endDate,
      isActive: i === 3, // Sprint 3 is active
      isSelected: i <= 3, // First 3 sprints are selected by default
    })
  }

  return sprints
}

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
      id: taskId.toString(),
      name: `${template} (Backlog)`,
      description: `Detailed description for ${template.toLowerCase()}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
      points: Math.floor(Math.random() * 8) + 1,
      epicId:
        Math.floor(Math.random() * 4) + 1 <= 2
          ? (Math.floor(Math.random() * 2) + 1).toString()
          : '1',
      sprintId: undefined, // Backlog tasks
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      createdAt: new Date('2024-01-01'),
    })
    taskId++
  }

  // Create tasks for each of the 20 sprints
  for (let sprintNum = 1; sprintNum <= 20; sprintNum++) {
    const tasksPerSprint = Math.floor(Math.random() * 8) + 3 // 3-10 tasks per sprint

    for (let i = 0; i < tasksPerSprint; i++) {
      const template = taskTemplates[i % taskTemplates.length]
      tasks.push({
        id: taskId.toString(),
        name: `${template} (Sprint ${sprintNum})`,
        description: `Sprint ${sprintNum} task: ${template.toLowerCase()}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
        points: Math.floor(Math.random() * 8) + 1,
        epicId:
          Math.floor(Math.random() * 4) + 1 <= 3
            ? (Math.floor(Math.random() * 4) + 1).toString()
            : '1',
        sprintId: sprintNum.toString(),
        assignee: assignees[Math.floor(Math.random() * assignees.length)],
        createdAt: new Date('2024-01-01'),
      })
      taskId++
    }
  }

  return tasks
}

// Generate more epics for better testing
const generateMockEpics = (): Epic[] => {
  return [
    {
      id: '1',
      name: 'User Authentication',
      color: 'bg-blue-500',
      description: 'Implement secure user authentication system',
      confidence: 'high' as const,
      phase: 2,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-15'),
      progress: 75,
      isSelected: true,
    },
    {
      id: '2',
      name: 'Dashboard Features',
      color: 'bg-green-500',
      description: 'Build comprehensive dashboard functionality',
      confidence: 'medium' as const,
      phase: 1,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-03-15'),
      progress: 30,
      isSelected: true,
    },
    {
      id: '3',
      name: 'Mobile App',
      color: 'bg-purple-500',
      description: 'Develop mobile application',
      confidence: 'low' as const,
      phase: 3,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-05-15'),
      progress: 10,
      isSelected: true,
    },
    {
      id: '4',
      name: 'API Integration',
      color: 'bg-orange-500',
      description: 'Integrate with external APIs and services',
      confidence: 'high' as const,
      phase: 2,
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-04-01'),
      progress: 45,
      isSelected: true,
    },
  ]
}

export const Default: Story = {
  args: {
    tasks: mockTasks,
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: (taskId, updates) => console.log('onUpdateTask', taskId, updates),
    onTaskClick: (task) => console.log('onTaskClick', task),
    onAddSprint: (sprint) => console.log('onAddSprint', sprint),
    onUpdateSprint: (sprintId, updates) => console.log('onUpdateSprint', sprintId, updates),
    onDeleteSprint: (sprintId) => console.log('onDeleteSprint', sprintId),
  },
}

export const WithManySprintsAndTasks: Story = {
  name: 'Many Sprints & Tasks (20 Sprints)',
  args: {
    tasks: generateMockTasks(),
    epics: generateMockEpics(),
    sprints: generateMockSprints(),
    onUpdateTask: (taskId, updates) => console.log('onUpdateTask', taskId, updates),
    onTaskClick: (task) => console.log('onTaskClick', task),
    onAddSprint: (sprint) => console.log('onAddSprint', sprint),
    onUpdateSprint: (sprintId, updates) => console.log('onUpdateSprint', sprintId, updates),
    onDeleteSprint: (sprintId) => console.log('onDeleteSprint', sprintId),
  },
}

export const EmptyBacklog: Story = {
  name: 'Empty Backlog with Active Sprints',
  args: {
    tasks: generateMockTasks().filter((task) => task.sprintId), // Remove backlog tasks
    epics: generateMockEpics(),
    sprints: generateMockSprints(),
    onUpdateTask: (taskId, updates) => console.log('onUpdateTask', taskId, updates),
    onTaskClick: (task) => console.log('onTaskClick', task),
    onAddSprint: (sprint) => console.log('onAddSprint', sprint),
    onUpdateSprint: (sprintId, updates) => console.log('onUpdateSprint', sprintId, updates),
    onDeleteSprint: (sprintId) => console.log('onDeleteSprint', sprintId),
  },
}

export const OnlyBacklogTasks: Story = {
  name: 'Only Backlog Tasks',
  args: {
    tasks: generateMockTasks().filter((task) => !task.sprintId), // Only backlog tasks
    epics: generateMockEpics(),
    sprints: generateMockSprints(),
    onUpdateTask: (taskId, updates) => console.log('onUpdateTask', taskId, updates),
    onTaskClick: (task) => console.log('onTaskClick', task),
    onAddSprint: (sprint) => console.log('onAddSprint', sprint),
    onUpdateSprint: (sprintId, updates) => console.log('onUpdateSprint', sprintId, updates),
    onDeleteSprint: (sprintId) => console.log('onDeleteSprint', sprintId),
  },
}

export const NoTasks: Story = {
  args: {
    tasks: [],
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: (taskId, updates) => console.log('onUpdateTask', taskId, updates),
    onTaskClick: (task) => console.log('onTaskClick', task),
    onAddSprint: (sprint) => console.log('onAddSprint', sprint),
    onUpdateSprint: (sprintId, updates) => console.log('onUpdateSprint', sprintId, updates),
    onDeleteSprint: (sprintId) => console.log('onDeleteSprint', sprintId),
  },
}

export const NoSprints: Story = {
  args: {
    tasks: mockTasks,
    epics: mockEpics,
    sprints: [],
    onUpdateTask: (taskId, updates) => console.log('onUpdateTask', taskId, updates),
    onTaskClick: (task) => console.log('onTaskClick', task),
    onAddSprint: (sprint) => console.log('onAddSprint', sprint),
    onUpdateSprint: (sprintId, updates) => console.log('onUpdateSprint', sprintId, updates),
    onDeleteSprint: (sprintId) => console.log('onDeleteSprint', sprintId),
  },
}

export const Test: Story = {
  args: {
    ...Default.args,
    epics: [
      {
        id: '2',
        name: 'epic 2',
        color: 'bg-blue-500',
        confidence: 'medium',
        phase: 1,
        startDate: '2025-08-27T00:00:00.000Z',
        endDate: '2025-08-27T00:00:00.000Z',
        progress: '0.00',
        description: '',
      },
      {
        id: '1',
        name: 'test epic',
        color: 'bg-blue-500',
        confidence: 'medium',
        phase: 1,
        startDate: '2025-08-27T00:00:00.000Z',
        endDate: '2025-08-27T00:00:00.000Z',
        progress: 0,
        description: '',
      },
    ],
    sprints: [
      {
        id: '1',
        name: 'Sprint 1',
        description: '',
        startDate: '2025-08-26T00:00:00.000Z',
        endDate: '2025-09-11T00:00:00.000Z',
        isActive: true,
      },
    ],
    tasks: [
      {
        id: '1',
        name: 'test task',
        description: 'description',
        status: 'in-progress',
        assignee: {
          relationTo: 'users',
          value: {
            id: 'c94ebfa5-8d42-4b96-9184-cce5a14d834c',
            email: 'r.ellison@reply.com',
            emailVerified: null,
            name: 'Rob Ellison',
            image: null,
            accounts: [
              {
                id: '68aed1c711597a5fdc1ea2ed',
                provider: 'keycloak',
                providerAccountId: '470a121d-8fea-4841-bdaf-76c83dbaaa91',
                type: 'oidc',
              },
            ],
            updatedAt: '2025-08-27T09:37:11.210Z',
            createdAt: '2025-08-27T09:37:11.191Z',
            enableAPIKey: null,
            apiKey: null,
          },
        },
        priority: 'low',
        type: 'bug',
        points: 1,
        epicId: '2',
        createdAt: '2025-08-27T19:33:56.348Z',
        sprintId: '1',
        comments: [
          {
            id: '68b4278ecfaf8ba85d4dad9c',
            content: 'test comment',
            author: {
              relationTo: 'users',
            },
            timestamp: '2025-08-31T10:44:30.510Z',
          },
          {
            id: '68b4344ad6b414304bc9709b',
            content: 'another comment',
            author: {
              relationTo: 'users',
            },
            timestamp: '2025-08-31T11:38:50.899Z',
          },
        ],
      },
    ],
  },
}
