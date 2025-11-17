import type { Meta, StoryObj } from '@storybook/react'
import { OrgChart } from './OrgChart'
import {
  smallTeamData,
  mediumTeamData,
  singlePersonData,
  deepHierarchyData,
  wideHierarchyData,
  emptyData,
} from './mockData'

const meta = {
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
  },
} satisfies Meta<typeof OrgChart>

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
 * Expandable/collapsible nodes for better navigation in large organizations.
 * Click the arrow buttons to expand or collapse branches.
 */
export const ExpandableNodes: Story = {
  args: {
    users: mediumTeamData,
    expandable: true,
    initiallyExpanded: true,
  },
}

/**
 * Expandable nodes that start collapsed.
 * Useful for very large organizations where you want to progressively reveal structure.
 */
export const InitiallyCollapsed: Story = {
  args: {
    users: mediumTeamData,
    expandable: true,
    initiallyExpanded: false,
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
    onNodeClick: (user) => {
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
