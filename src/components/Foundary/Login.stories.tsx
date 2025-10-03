import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Login } from './Login'

const meta: Meta<typeof Login> = {
  title: 'Foundary/Login',
  component: Login,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 
          'A highly customizable and elegant login component with configurable text, branding, logo, and workspace choices. ' +
          'Features a single-click login, loading states, smooth animations, and integrated brand logo. ' +
          'All text content and post-login workspace options can be customized via props. ' +
          'Workspace choices support internal URLs, external URLs, and custom callback functions for flexible navigation.'
      }
    }
  },
  argTypes: {
    onLogin: { 
      action: 'login clicked',
      description: 'Callback function called when login button is clicked'
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state when login is being processed externally'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the login container'
    },
    title: {
      control: 'text',
      description: 'Main title text for the login screen'
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle/description text for the login screen'
    },
    buttonText: {
      control: 'text',
      description: 'Text for the login button'
    },
    loadingText: {
      control: 'text',
      description: 'Loading text shown when signing in'
    },
    welcomeTitle: {
      control: 'text',
      description: 'Post-login welcome title'
    },
    welcomeSubtitle: {
      control: 'text',
      description: 'Post-login subtitle for workspace selection'
    },
    logoSrc: {
      control: 'text',
      description: 'Logo source URL'
    },
    logoAlt: {
      control: 'text',
      description: 'Logo alt text'
    },
    workspaceChoices: {
      control: 'object',
      description: 'Array of workspace choice options for post-login selection'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Login>

// Mock login handler for stories
const mockLoginHandler = () => {
  action('Login button clicked')()
}

/**
 * Default login with simple button
 */
export const Default: Story = {
  args: {
    onLogin: mockLoginHandler,
    isLoading: false
  },
  parameters: {
    docs: {
      description: {
        story: 'The default login with a simple button. Click to see the post-login workspace selection.'
      }
    }
  }
}

/**
 * Login in external loading state
 */
export const Loading: Story = {
  args: {
    onLogin: mockLoginHandler,
    isLoading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Login with external loading state. The button is disabled and shows loading indicators.'
      }
    }
  }
}

/**
 * Login with custom styling
 */
export const CustomStyling: Story = {
  args: {
    onLogin: mockLoginHandler,
    className: 'bg-gradient-to-br from-indigo-50 to-cyan-50',
    isLoading: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Login with custom background gradient styling.'
      }
    }
  }
}

/**
 * Customized text and branding example
 */
export const CustomBranding: Story = {
  args: {
    onLogin: mockLoginHandler,
    title: "Welcome to Acme Corp",
    subtitle: "Access your enterprise workspace",
    buttonText: "Enter System",
    loadingText: "Authenticating...",
    welcomeTitle: "Hello, Welcome!",
    welcomeSubtitle: "Select your preferred working mode",
    logoAlt: "Acme Corporation Logo",
    isLoading: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to customize all text content and branding for different organizations.'
      }
    }
  }
}

/**
 * Custom workspace choices with different options
 */
export const CustomWorkspaceChoices: Story = {
  args: {
    onLogin: mockLoginHandler,
    workspaceChoices: [
      {
        id: 'analytics',
        title: 'Analytics Dashboard',
        description: 'View reports, metrics, and business intelligence data.',
        icon: React.createElement('div', { className: 'h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl' }, 'A'),
        color: 'text-green-600',
        gradient: 'from-green-500 to-teal-600',
        url: '/dashboard/analytics'
      },
      {
        id: 'admin',
        title: 'Admin Panel',
        description: 'Manage users, settings, and system configuration.',
        icon: React.createElement('div', { className: 'h-12 w-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xl' }, 'S'),
        color: 'text-red-600',
        gradient: 'from-red-500 to-pink-600',
        url: '/admin'
      },
      {
        id: 'external',
        title: 'External Tool',
        description: 'Launch external application in new tab.',
        icon: React.createElement('div', { className: 'h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl' }, 'E'),
        color: 'text-blue-600',
        gradient: 'from-blue-500 to-indigo-600',
        url: 'https://example.com'
      },
      {
        id: 'custom',
        title: 'Custom Action',
        description: 'Execute custom callback function.',
        icon: React.createElement('div', { className: 'h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl' }, 'C'),
        color: 'text-purple-600',
        gradient: 'from-purple-500 to-violet-600',
        onClick: () => action('Custom workspace action executed')()
      }
    ],
    isLoading: false
  },
  parameters: {
    docs: {
      description: {
        story: 
          'Example showing custom workspace choices with different navigation options: ' +
          'internal URLs, external URLs, and custom callback functions.'
      }
    }
  }
}

/**
 * Interactive demo showing complete user flow
 */
export const InteractiveDemo: Story = {
  args: {
    onLogin: () => {
      action('Interactive demo - User clicked login')()
    },
    isLoading: false
  },
  parameters: {
    docs: {
      description: {
        story: 
          'Interactive demo showing the complete login flow. Click the login button to see the ' +
          'workspace selection screen with Ava (digital assistant) and team collaboration options.'
      }
    }
  }
}
