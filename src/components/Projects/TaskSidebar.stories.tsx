
import type { Meta, StoryObj } from '@storybook/react';
import { TaskSidebar } from './TaskSidebar';
import { Task, Epic, Sprint, DigitalColleague, User } from '../Foundary/types';

const meta: Meta<typeof TaskSidebar> = {
  title: 'Projects/Tasks/TaskSidebar',
  component: TaskSidebar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskSidebar>;

const mockTask: Task = {
  id: '1',
  title: 'Design login page',
  description: 'Create wireframes and mockups for the login interface',
  status: 'in-progress',
  priority: 'high',
  type: 'story',
  assignee: 'John Doe',
  epicId: '1',
  points: 8,
  createdAt: new Date('2024-01-15'),
};

const mockEpics: Epic[] = [
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
];

const mockSprints: Sprint[] = [
  {
    id: '1',
    name: 'Sprint 1',
    description: 'Initial development sprint',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-14'),
    isActive: false,
    isSelected: false,
  },
  {
    id: '2',
    name: 'Sprint 2',
    description: 'Feature development sprint',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-28'),
    isActive: true,
    isSelected: true,
  },
  {
    id: '3',
    name: 'Sprint 3',
    description: 'Testing and refinement sprint',
    startDate: new Date('2024-01-29'),
    endDate: new Date('2024-02-11'),
    isActive: false,
    isSelected: false,
  },
];

const mockTeamMembers: (User | DigitalColleague)[] = [
  // Digital Colleagues
  {
    id: 1,
    name: 'HR Business Partner',
    model: null,
    capabilities: [],
    knowledge: null,
    coreKnowledge: null,
    description: null,
    jobDescription: null,
    workInstructions: null,
    capabilityLevel: 1,
    systemMsg: null,
    identity: 1,
    metadata: null,
    updatedAt: '2025-11-20T19:16:27.180Z',
    createdAt: '2025-11-20T19:15:06.620Z',
  },
  {
    id: 2,
    name: 'Technical Support Bot',
    model: null,
    capabilities: [],
    knowledge: null,
    coreKnowledge: null,
    description: null,
    jobDescription: null,
    workInstructions: null,
    capabilityLevel: 2,
    systemMsg: null,
    identity: 2,
    metadata: null,
    updatedAt: '2025-11-20T19:16:27.180Z',
    createdAt: '2025-11-20T19:15:06.620Z',
  },
  // Users
  {
    id: '99ccf092-f9a0-4325-9343-58ebe4d5eb04',
    email: 'rob.ellison@example.com',
    emailVerified: null,
    name: 'Rob Ellison',
    image: null,
    role: 'user',
    enabled: true,
    accounts: [],
    sessions: [],
    updatedAt: '2026-02-16T23:47:00.735Z',
    createdAt: '2025-12-15T16:52:22.363Z',
    enableAPIKey: null,
    apiKey: null,
    collection: 'users',
  },
  {
    id: 'a1b2c3d4-e5f6-4g5h-6i7j-8k9l0m1n2o3p',
    email: 'sarah.johnson@example.com',
    emailVerified: null,
    name: 'Sarah Johnson',
    image: null,
    role: 'user',
    enabled: true,
    accounts: [],
    sessions: [],
    updatedAt: '2026-02-16T23:47:00.735Z',
    createdAt: '2025-12-15T16:52:22.363Z',
    enableAPIKey: null,
    apiKey: null,
    collection: 'users',
  },
];

export const Default: Story = {
  args: {
    task: mockTask,
    epics: mockEpics,
    sprints: mockSprints,
    lastUpdated: new Date(),
    onUpdateTask: () => {},
    onClose: () => {},
    onDelete: () => {},
    teamMembers: mockTeamMembers,
  },
};

export const HighPriorityBug: Story = {
  args: {
    task: {
      ...mockTask,
      type: 'bug',
      priority: 'high',
      title: 'Fix login redirect bug',
      description: 'Users are not being redirected after successful login',
    },
    epics: mockEpics,
    sprints: mockSprints,
    lastUpdated: new Date(),
    onUpdateTask: () => {},
    onClose: () => {},
    onDelete: () => {},
    teamMembers: mockTeamMembers,
  },
};
