import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ManagementSidebar } from './ManagementSidebar';

const meta: Meta<typeof ManagementSidebar> = {
  title: 'Digital Colleagues/ManagementSidebar',
  component: ManagementSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    currentView: {
      control: { type: 'select' },
      options: ['kanban', 'planning', 'tasks', 'files', 'epics'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ManagementSidebar>;

export const KanbanView: Story = {
  args: {
    currentView: 'kanban',
    onViewChange: action('onViewChange'),
    children: (
      <div className="p-8 bg-gray-50 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Kanban View</h2>
          <p className="text-gray-600">This is where the Kanban board would be displayed</p>
        </div>
      </div>
    ),
  },
};

export const PlanningView: Story = {
  args: {
    currentView: 'planning',
    onViewChange: action('onViewChange'),
    children: (
      <div className="p-8 bg-blue-50 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Planning View</h2>
          <p className="text-gray-600">This is where the planning interface would be displayed</p>
        </div>
      </div>
    ),
  },
};

export const TasksView: Story = {
  args: {
    currentView: 'tasks',
    onViewChange: action('onViewChange'),
    children: (
      <div className="p-8 bg-green-50 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tasks View</h2>
          <p className="text-gray-600">This is where the task management would be displayed</p>
        </div>
      </div>
    ),
  },
};

export const FilesView: Story = {
  args: {
    currentView: 'files',
    onViewChange: action('onViewChange'),
    children: (
      <div className="p-8 bg-purple-50 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Files View</h2>
          <p className="text-gray-600">This is where the file browser would be displayed</p>
        </div>
      </div>
    ),
  },
};

export const EpicsView: Story = {
  args: {
    currentView: 'epics',
    onViewChange: action('onViewChange'),
    children: (
      <div className="p-8 bg-orange-50 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Epic Planning</h2>
          <p className="text-gray-600">This is where the epic planning would be displayed</p>
        </div>
      </div>
    ),
  },
};

export const InteractiveDemo: Story = {
  args: {
    currentView: 'kanban',
    onViewChange: action('onViewChange'),
    children: (
      <div className="p-8 h-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Project Management Dashboard</h1>
          <p className="text-gray-600">Switch between different views using the sidebar</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Active Tasks</h3>
            <div className="text-2xl font-bold text-blue-600">23</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Completed</h3>
            <div className="text-2xl font-bold text-green-600">142</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">In Progress</h3>
            <div className="text-2xl font-bold text-orange-600">8</div>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Task "User Authentication" was completed</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Epic "API Integration" was started</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Sprint planning meeting scheduled</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};
