import type { Meta, StoryObj } from '@storybook/react'
import { OrgChart } from './OrgChart'
import type { OrgChartProps } from './types'
import {
  smallTeamData,
  mediumTeamData,
  singlePersonData,
  deepHierarchyData,
  wideHierarchyData,
  dualPartnershipData,
  detailedDescriptionsData,
  emptyData,
} from './mockData'

const meta: Meta<OrgChartProps> = {
  title: 'Advanced Components/OrgChart',
  component: OrgChart,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'An organizational chart component that displays hierarchical user relationships. Integrates with PayloadCMS3 user data.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    users: {
      description: 'Array of user objects with manager relationships',
      control: { type: 'object' },
    },
    onNodeClick: {
      description: 'Callback function when a user node is clicked',
      action: 'nodeClicked',
    },
    expandable: {
      description: 'Whether nodes can be collapsed/expanded',
      control: { type: 'boolean' },
    },
    initiallyExpanded: {
      description: 'Whether nodes start in expanded state',
      control: { type: 'boolean' },
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
    companyInfo: {
      description: 'Company information including name and logo',
      control: { type: 'object' },
    },
    defaultExpandedLevels: {
      description: 'Number of levels to show expanded by default',
      control: { type: 'number', min: 1, max: 10 },
    },
  },
} satisfies Meta<OrgChartProps>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Small team example with 6 people in a simple hierarchy.
 * Perfect for startups or small departments.
 */
export const SmallTeam: Story = {
  args: {
    users: smallTeamData,
    expandable: false,
    initiallyExpanded: true,
  },
}

/**
 * Medium-sized team with multiple branches and managers.
 * Shows how the component handles 14 people across different departments.
 */
export const MediumTeam: Story = {
  args: {
    users: mediumTeamData,
    expandable: false,
    initiallyExpanded: true,
  },
}

export const SinglePersonUser: Story = {
  args: {
    users: [{
      id: 1,
      name: 'Test user - do not delete',
      email: 'test@test.com',
      jobRole: null,
      manager: null,
      about: null,
      profilePicture: null,
      holidaysRemaining: 25,
      startingHolidays: 25,
      dateOfBirth: null,
      joinDate: null,
      linkedIn: null,
      assets: [],
      role: 'admin',
      updatedAt: '2025-12-29T17:19:00.709Z',
      createdAt: '2025-12-08T18:36:20.346Z',
      enableAPIKey: null,
      apiKey: null
    }],
    expandable: false,
    initiallyExpanded: true,
  },
}

/**
 * Single person organization (e.g., solo founder or CEO).
 * Demonstrates the component with minimal data.
 */
export const SinglePerson: Story = {
  args: {
    users: singlePersonData,
    expandable: false,
    initiallyExpanded: true,
  },
}

/**
 * Deep hierarchy with 6 levels of reporting.
 * Shows vertical scaling capabilities.
 */
export const DeepHierarchy: Story = {
  args: {
    users: deepHierarchyData,
    expandable: false,
    initiallyExpanded: true,
  },
}

/**
 * Wide hierarchy with many people at the same level.
 * Demonstrates horizontal scaling with 6 direct reports.
 */
export const WideHierarchy: Story = {
  args: {
    users: wideHierarchyData,
    expandable: false,
    initiallyExpanded: true,
  },
}

/**
 * Dual partnership structure with 2 top-level partners.
 * Shows how the company logo appears with controlled expansion levels.
 */
export const DualPartnership: Story = {
  args: {
    users: dualPartnershipData,
    expandable: true,
    defaultExpandedLevels: 2,
    companyInfo: {
      name: 'Cortex Reply',
      logo: {
        url: '/logo.png',
        alt: 'Cortex Reply Logo',
      },
    },
  },
}

/**
 * Expandable/collapsible nodes for better navigation in large organizations.
 * Shows 2 levels expanded by default. Click the arrow buttons to expand or collapse branches.
 */
export const ExpandableNodes: Story = {
  args: {
    users: mediumTeamData,
    expandable: true,
    defaultExpandedLevels: 2,
  },
}

/**
 * Shows only 1 level expanded by default.
 * Useful for very large organizations where you want to progressively reveal structure.
 */
export const InitiallyCollapsed: Story = {
  args: {
    users: mediumTeamData,
    expandable: true,
    defaultExpandedLevels: 1,
  },
}

/**
 * Interactive example with click handling.
 * Open the Actions panel to see click events.
 */
export const WithClickHandler: Story = {
  args: {
    users: smallTeamData,
    expandable: false,
    initiallyExpanded: true,
    onNodeClick: (user: any) => {
      console.log('Clicked user:', user)
      alert(`Clicked: ${user.name} (${user.email})`)
    },
  },
}

/**
 * Empty state when no users are provided.
 */
export const EmptyState: Story = {
  args: {
    users: emptyData,
    expandable: false,
    initiallyExpanded: true,
  },
}

/**
 * Wide hierarchy with company logo.
 * Shows how the company node appears when there are many partners at the top level.
 */
export const WideHierarchyWithCompany: Story = {
  args: {
    users: wideHierarchyData,
    expandable: true,
    defaultExpandedLevels: 2,
    companyInfo: {
      name: 'Tech Innovators Inc',
    },
  },
}

/**
 * Deep hierarchy showing 3 levels expanded by default.
 * Demonstrates how defaultExpandedLevels controls the initial view of complex organizations.
 */
export const DeepHierarchyExpanded: Story = {
  args: {
    users: deepHierarchyData,
    expandable: true,
    defaultExpandedLevels: 3,
  },
}

/**
 * Team with detailed long descriptions.
 * Demonstrates how the component handles lengthy "about" text with hover tooltips.
 */
export const DetailedDescriptions: Story = {
  args: {
    users: detailedDescriptionsData,
    expandable: true,
    defaultExpandedLevels: 3,
  },
}

/**
 * Custom styling example with additional CSS classes.
 */
export const CustomStyling: Story = {
  args: {
    users: smallTeamData,
    expandable: false,
    initiallyExpanded: true,
    className: 'bg-muted/50 rounded-lg',
  },
}
