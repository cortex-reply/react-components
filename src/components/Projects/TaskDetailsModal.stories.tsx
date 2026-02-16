
import type { Meta, StoryObj } from '@storybook/react';
import { TaskDetailsModal } from './TaskDetailsModal';

const meta: Meta<typeof TaskDetailsModal> = {
  title: 'Projects/Tasks/TaskDetailsModal',
  component: TaskDetailsModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onUpdateTask: { action: 'update task' },
    onDeleteTask: { action: 'delete task' },
    onClose: { action: 'close' },
  },
};

export default meta;
type Story = StoryObj<typeof TaskDetailsModal>;

// Mock async functions
const mockUpdateTask = (taskId: string, updates: any) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Task updated:', taskId, updates);
      resolve();
    }, 2000); // 2 second delay to show loading state
  });
};

const mockDeleteTask = (taskId: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Task deleted:', taskId);
      resolve();
    }, 1500); // 1.5 second delay to show loading state
  });
};

const mockUpdateTaskFail = (taskId: string, updates: any) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log('Task update failed:', taskId, updates);
      reject(new Error('Update failed'));
    }, 2000);
  });
};

const mockDeleteTaskFail = (taskId: string) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log('Task delete failed:', taskId);
      reject(new Error('Delete failed'));
    }, 1500);
  });
};

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
];

const mockSprints = [
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

export const Default: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '1',
      name: 'Design login page',
      description: 'Create wireframes and mockups for the login interface',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      epicId: '1',
      sprintId: '2',
      assignee: 'John Doe',
      points: 8,
      createdAt: new Date('2024-01-15'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const WithLoadingStates: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '1',
      name: 'Design login page',
      description: 'Create wireframes and mockups for the login interface',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      epicId: '1',
      sprintId: '2',
      assignee: 'John Doe',
      points: 8,
      createdAt: new Date('2024-01-15'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const WithErrorStates: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '1',
      name: 'Design login page',
      description: 'Create wireframes and mockups for the login interface',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      epicId: '1',
      sprintId: '2',
      assignee: 'John Doe',
      points: 8,
      createdAt: new Date('2024-01-15'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTaskFail,
    onDeleteTask: mockDeleteTaskFail,
  },
};

export const BugTask: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '2',
      name: 'Fix login redirect bug',
      description: 'Users are not being redirected after successful login',
      type: 'bug',
      priority: 'high',
      status: 'todo',
      epicId: '1',
      sprintId: '2',
      assignee: 'Jane Smith',
      points: 3,
      createdAt: new Date('2024-01-16'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const CompletedTask: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '3',
      name: 'Set up CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      type: 'task',
      priority: 'low',
      status: 'done',
      epicId: '2',
      sprintId: '1',
      assignee: 'Mike Johnson',
      points: 5,
      createdAt: new Date('2024-01-10'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const SpikeTask: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '4',
      name: 'Research OAuth providers',
      description: 'Investigate different OAuth integration options',
      type: 'spike',
      priority: 'medium',
      status: 'review',
      epicId: '1',
      sprintId: '2',
      assignee: 'Alex Brown',
      points: 2,
      createdAt: new Date('2024-01-18'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const NoSprint: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '5',
      name: 'Update documentation',
      description: 'Refresh API documentation with latest changes',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      epicId: '2',
      sprintId: '1',
      assignee: 'Sarah Wilson',
      points: 3,
      createdAt: new Date('2024-01-20'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const LongDescription: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '6',
      name: 'Implement advanced search functionality',
      description: `This task involves implementing a comprehensive search system that will allow users to query across multiple data sources including user profiles, documents, projects, and archived items. The search functionality needs to support various filtering options such as date range, document type, priority level, and team member assignments. It should also include real-time search suggestions with autocomplete capabilities, full-text search with relevance ranking, and the ability to save custom search filters for future use. The implementation must be optimized for performance and handle large datasets gracefully with pagination support. Additionally, we need to integrate the search results with the existing analytics system to track user search patterns and improve the overall search experience over time.`,
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      epicId: '2',
      sprintId: '2',
      assignee: 'John Doe',
      points: 13,
      createdAt: new Date('2024-01-15'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const VeryLongDescription: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '7',
      name: 'Refactor authentication system',
      description: `The current authentication system needs a complete overhaul to improve security, performance, and maintainability. This comprehensive refactoring will involve:

1. Implementing OAuth 2.0 and OpenID Connect standards for more secure token management
2. Adding support for multi-factor authentication (MFA) including TOTP, SMS, and hardware keys
3. Migrating from session-based authentication to JWT tokens with proper refresh mechanisms
4. Implementing rate limiting and brute force attack prevention mechanisms
5. Adding audit logging for all authentication events for compliance and security monitoring
6. Creating a comprehensive test suite with 95%+ code coverage
7. Implementing automatic session cleanup and token expiration policies
8. Adding support for single sign-on (SSO) across multiple applications
9. Implementing passwordless authentication options for modern user experience
10. Creating detailed documentation and developer guides

This refactoring is critical for improving our security posture, meeting compliance requirements for GDPR and SOC 2, and providing a better user experience. The work will be broken down into multiple sprints and requires coordination between frontend and backend teams.`,
      status: 'todo',
      priority: 'critical',
      type: 'epic',
      epicId: '1',
      sprintId: '2',
      assignee: 'Jane Smith',
      points: 21,
      createdAt: new Date('2024-01-18'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const MultilineDescription: Story = {
  args: {
    isOpen: true,
    initialTask: {
      id: '8',
      name: 'Add support for real-time notifications',
      description: `Requirements:
• Implement WebSocket connection for real-time updates
• Support for email, SMS, and in-app notifications
• User preferences for notification types and frequency
• Notification history and archiving
• Batch processing for high-volume notifications
• Graceful degradation when WebSocket unavailable

Acceptance Criteria:
- Notifications delivered within 2 seconds
- Support at least 10,000 concurrent connections
- 99.9% delivery success rate
- Full test coverage for notification logic
- Documentation for notification API

Technical Notes:
Use existing database schema. Consider using Redis for caching.
Integrate with current user preference system.`,
      status: 'review',
      priority: 'high',
      type: 'story',
      epicId: '2',
      sprintId: '2',
      assignee: 'Mike Johnson',
      points: 8,
      createdAt: new Date('2024-01-16'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    colleagues: [],
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};
