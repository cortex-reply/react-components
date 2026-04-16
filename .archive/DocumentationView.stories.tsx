
import type { Meta, StoryObj } from '@storybook/react';
import { DocumentationView } from './DocumentationView';

const meta: Meta<typeof DocumentationView> = {
  title: 'Digital Colleagues/DocumentationView',
  component: DocumentationView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Documentation view for project information and guides.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DocumentationView>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default documentation view with project information.',
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Documentation view optimized for mobile devices.',
      },
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Documentation view on tablet screens.',
      },
    },
  },
};

export const DarkBackground: Story = {
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
        story: 'Documentation view with dark background for contrast testing.',
      },
    },
  },
};
