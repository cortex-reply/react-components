import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { LandingMenu } from './LandingMenu'

const meta: Meta<typeof LandingMenu> = {
  title: 'Foundary/LandingMenu',
  component: LandingMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 
          'A post-login landing menu component that allows users to choose their workspace. ' +
          'Features customizable workspace choices with support for internal URLs, external URLs, and custom callbacks. ' +
          'Includes smooth animations, hover effects, and configurable branding.'
      }
    }
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the landing menu container'
    },
    welcomeTitle: {
      control: 'text',
      description: 'Welcome title text'
    },
    welcomeSubtitle: {
      control: 'text',
      description: 'Welcome subtitle text'
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
      description: 'Array of workspace choice options'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof LandingMenu>

/**
 * Default landing menu with Ava and team collaboration options
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'The default landing menu with Ava (digital assistant) and team collaboration options.'
      }
    }
  }
}

/**
 * Custom branding example
 */
export const CustomBranding: Story = {
  args: {
    welcomeTitle: "Welcome to Acme Corp",
    welcomeSubtitle: "Select your preferred working mode",
    logoAlt: "Acme Corporation Logo"
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing customized branding and messaging for different organizations.'
      }
    }
  }
}

/**
 * Custom workspace choices with different options
 */
export const CustomWorkspaceChoices: Story = {
  args: {
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
    ]
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
 * Three workspace options layout
 */
export const ThreeOptions: Story = {
  args: {
    workspaceChoices: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        description: 'Overview of your key metrics and activities.',
        icon: React.createElement('div', { className: 'h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl' }, 'D'),
        color: 'text-blue-600',
        gradient: 'from-blue-500 to-cyan-600',
        url: '/dashboard'
      },
      {
        id: 'projects',
        title: 'Projects',
        description: 'Manage and collaborate on your projects.',
        icon: React.createElement('div', { className: 'h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl' }, 'P'),
        color: 'text-green-600',
        gradient: 'from-green-500 to-emerald-600',
        url: '/projects'
      },
      {
        id: 'settings',
        title: 'Settings',
        description: 'Configure your account and preferences.',
        icon: React.createElement('div', { className: 'h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl' }, 'S'),
        color: 'text-purple-600',
        gradient: 'from-purple-500 to-violet-600',
        url: '/settings'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with three workspace options to show how the layout adapts.'
      }
    }
  }
}

/**
 * Custom styling example
 */
export const CustomStyling: Story = {
  args: {
    className: 'bg-gradient-to-br from-indigo-50 to-cyan-50',
    welcomeTitle: "Choose Your Path",
    welcomeSubtitle: "Select the workspace that fits your workflow"
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing custom background styling and messaging.'
      }
    }
  }
}
