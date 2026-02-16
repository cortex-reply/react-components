
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
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
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
