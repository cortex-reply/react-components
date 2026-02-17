
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AddTaskModal } from './AddTaskModal';

const meta: Meta<typeof AddTaskModal> = {
  title: 'Projects/AddTaskModal',
  component: AddTaskModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    onClose: {
      action: 'modal closed',
      description: 'Function called when modal is closed',
    },
    onAddTask: {
      action: 'task added',
      description: 'Function called when task is added',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddTaskModal>;

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
  {
    id: '3',
    name: 'Mobile Optimization',
    color: 'bg-purple-500',
    description: 'Optimize application for mobile devices',
    confidence: 'low' as const,
    phase: 1,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-15'),
    progress: 10,
    isSelected: true,
  },
];

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
];

const mockAssignees = [
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
    isOpen: true,
    onClose: action('onClose'),
    onAddTask: action('onAddTask'),
    epics: mockEpics,
    sprints: mockSprints,
    assignees: mockAssignees,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: action('onClose'),
    onAddTask: action('onAddTask'),
    epics: mockEpics,
    sprints: mockSprints,
    assignees: mockAssignees,
  },
};

export const NoEpics: Story = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
    onAddTask: action('onAddTask'),
    epics: [],
    sprints: mockSprints,
    assignees: mockAssignees,
  },
};

export const MixedAssignees: Story = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
    onAddTask: action('onAddTask'),
    epics: mockEpics,
    sprints: mockSprints,
    assignees: mockAssignees,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the modal with both Digital Colleagues and Users as assignees. Digital Colleagues will show with a different badge than Users.',
      },
    },
  },
};
