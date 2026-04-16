
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ChatInterface } from './ChatInterface';

const meta: Meta<typeof ChatInterface> = {
  title: 'Digital Colleagues/ChatInterface',
  component: ChatInterface,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['copilot', 'teams'],
      description: 'Current chat mode',
    },
    onModeChange: {
      action: 'mode changed',
      description: 'Function called when mode changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatInterface>;

export const CopilotMode: Story = {
  args: {
    mode: 'copilot',
    onModeChange: action('onModeChange'),
  },
};

export const TeamsMode: Story = {
  args: {
    mode: 'teams',
    onModeChange: action('onModeChange'),
  },
};

export const InContainer: Story = {
  args: {
    mode: 'copilot',
    onModeChange: action('onModeChange'),
  },
  decorators: [
    (Story) => (
      <div className="h-96">
        <Story />
      </div>
    ),
  ],
};
