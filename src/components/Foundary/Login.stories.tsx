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
          'A simplified and elegant login component with configurable text, branding, and logo. ' +
          'Features a single-click login, loading states, smooth animations, and integrated brand logo. ' +
          'After successful login, the component redirects to the specified URL. ' +
          'Use with the separate LandingMenu component for post-login workspace selection.'
      }
    }
  },
  argTypes: {
    onLogin: { 
      action: 'login completed',
      description: 'Callback function called with auth token when login is successful'
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
    logoProps: {
      control: 'object',
      description: 'Props to pass to the Logo component (width, height, className)'
    },
    redirectUrl: {
      control: 'text',
      description: 'URL to redirect to after successful login'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Login>

// Mock login handler for stories
const mockLoginHandler = () => {
  action('Login completed')()
}

/**
 * Default login with simple button
 */
export const Default: Story = {
  args: {
    onLogin: mockLoginHandler
  },
  parameters: {
    docs: {
      description: {
        story: 'The default login with a simple button. Simulates login and redirects to dashboard.'
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
    className: 'bg-gradient-to-br from-indigo-50 to-cyan-50'
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
    logoProps: { width: 100, height: 100, className: "opacity-90" },
    redirectUrl: "/admin/dashboard"
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
 * Custom logo configuration
 */
export const CustomLogo: Story = {
  args: {
    onLogin: mockLoginHandler,
    logoProps: { 
      width: 120, 
      height: 120, 
      className: "border-2 border-primary rounded-lg p-2" 
    },
    title: "Custom Logo Demo",
    subtitle: "Showing customized logo styling"
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing custom logo sizing and styling options.'
      }
    }
  }
}

/**
 * Different redirect URL example
 */
export const CustomRedirect: Story = {
  args: {
    onLogin: mockLoginHandler,
    redirectUrl: "/workspace/landing",
    title: "Login to Workspace",
    subtitle: "You'll be redirected to the landing page",
    buttonText: "Access Workspace"
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing custom redirect URL after successful login.'
      }
    }
  }
}
