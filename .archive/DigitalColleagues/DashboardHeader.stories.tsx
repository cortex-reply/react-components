
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DashboardHeader } from './DashboardHeader';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Digital Colleagues/DashboardHeader',
  component: DashboardHeader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isRightSidebarOpen: {
      control: 'boolean',
      description: 'Whether the right sidebar is open',
    },
    onToggleRightSidebar: {
      action: 'toggled sidebar',
      description: 'Function called when sidebar toggle is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {
  args: {
    isRightSidebarOpen: false,
    onToggleRightSidebar: action('onToggleRightSidebar'),
  },
};

export const SidebarOpen: Story = {
  args: {
    isRightSidebarOpen: true,
    onToggleRightSidebar: action('onToggleRightSidebar'),
  },
};
