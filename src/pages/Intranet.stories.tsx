'use client'
import React from 'react'
import Intranet from './Intranet'
import type { StoryObj, Meta } from '@storybook/react'
import { withIntranetLayout } from '../decorators/Intranet'

import { DynamicIcon } from '@/components/Images'
import { fn } from '@storybook/test'
import {
 
  BookOpen,
  LifeBuoy,
  Send,
  Settings2,
 
} from 'lucide-react'
const ServiceIcon = () => <DynamicIcon iconName="cloud-network-sharing" size="4x" type="kit" />

const ProductIcon = () => <DynamicIcon iconName="development" size="4x" type="kit" />

const GithubIcon = () => (
  // <FontAwesomeIcon icon={faGithub} size="10x" />
  <DynamicIcon iconName="github" size="4x" type="brands" />
)
const AWSIcon = () => <DynamicIcon iconName="aws" type="brands" />
const AzureIcon = () => <DynamicIcon iconName="azure" type="kit" />
const SolutionIcon = () => <DynamicIcon iconName="people-sharing" size="4x" type="kit" />

const meta: Meta<typeof Intranet> = {
  title: 'Pages/Intranet',
  component: Intranet,
  tags: ['autodocs'],
  argTypes: {
    // color: {
    //   options: ['primary', 'secondary', 'tertiary', 'quaternary', 'highlight', 'accent', 'muted', 'paper'],
    //   control: { type: 'select' },
    // }
  },
  parameters: {
    layoutType: 'page', // This tells the decorator to render as a page
    showHeader: true, // This enables the header
    theme: 'dark', // Default theme (optional)
  },
  decorators: [
    withIntranetLayout, // Add the intranet decorator
  ],
}
export default meta

type Story = StoryObj<typeof Intranet>

export const Primary: Story = {
  args: {
    motd: {
      title: 'Welcome to the Intranet',
      message:
        'This is a message of the day. It can be used to communicate important information to all employees.',
      brandFrom: 'one',
      brandTo: 'two',
    },
    events: [
      {
        type: 'birthday',
        date: '2023-06-15',
        title: "John Doe's Birthday",
        description: 'Wish John a happy birthday!',
        avatarSrc: 'https://i.pravatar.cc/150?img=1',
      },
      {
        type: 'company_event',
        date: '2023-08-10',
        title: 'Summer Company Picnic',
        description: 'Join us for food, games, and fun at the annual summer picnic!',
        avatarSrc: 'https://i.pravatar.cc/150?img=3',
      },
      {
        type: 'company_event',
        date: '2023-10-31',
        title: 'Halloween Party',
      },
    ],
    customers: [
      {
        name: 'Acme Corp',
        logo: '/cortex-reply.png',
        href: '#',
        gradientStart: '#3B82F6',
        gradientEnd: '#2563EB',
      },
      {
        name: 'Globex',
        logo: '/logos/dropbox.png',
        href: '#',
        gradientStart: '#10B981',
        gradientEnd: '#059669',
      },
      {
        name: 'Initech',
        logo: '/logos/customer1.png',
        href: '#',
        gradientStart: '#EC4899',
        gradientEnd: '#DB2777',
      },
      {
        name: 'Umbrella',
        logo: '/logos/customer2.png',
        href: '#',
        gradientStart: '#F59E0B',
        gradientEnd: '#D97706',
      },
    ],
    sidebarLeft: {
      title: 'Playground',
      subTitle: 'Airview',
      mainNav: [
        {
          label: 'AWS',
          url: '#',
          icon: AWSIcon,
          isActive: true,
          links: [
            {
              label: 'EC2',
              url: '#',
            },
            {
              label: 'IAM',
              url: '#',
            },
            {
              label: 'S3',
              url: '#',
            },
          ],
        },
        {
          label: 'Microsoft Azure',
          url: '#',
          icon: AzureIcon,
          links: [
            {
              label: 'Virtual Machines',
              url: '#',
            },
            {
              label: 'Storage',
              url: '#',
            },
            {
              label: 'Azure SQL',
              url: '#',
            },
          ],
        },
        {
          label: 'Documentation',
          url: '#',
          icon: BookOpen,
          links: [
            {
              label: 'Introduction',
              url: '#',
            },
            {
              label: 'Get Started',
              url: '#',
            },
            {
              label: 'Tutorials',
              url: '#',
            },
            {
              label: 'Changelog',
              url: '#',
            },
          ],
        },
        {
          label: 'Settings',
          url: '#',
          icon: Settings2,
          links: [
            {
              label: 'General',
              url: '#',
            },
            {
              label: 'Team',
              url: '#',
            },
            {
              label: 'Billing',
              url: '#',
            },
            {
              label: 'Limits',
              url: '#',
            },
          ],
        },
      ],
      secondaryNav: [
        {
          label: 'Admin',
          url: '#',
          icon: LifeBuoy,
        },
        {
          label: 'Feedback',
          url: '#',
          icon: Send,
        },
      ],
      onSidebarMenu: fn(),
    },
    sidebarRight: {
      tableOfContents: [
        {
          title: 'Getting Started',
          url: '#',
          links: [
            {
              title: 'Installation',
              url: '#',
              isActive: true,
            },
            {
              title: 'Project Structure',
              url: '#',
            },
          ],
        },
        {
          title: 'Building Your Application',
          url: '#',
          links: [
            {
              title: 'Routing',
              url: '#',
              isDraft: true,
            },
            {
              title: 'Data Fetching',
              url: '#',
            },
            {
              title: 'Rendering',
              url: '#',
            },
            {
              title: 'Caching',
              url: '#',
            },
            {
              title: 'Styling',
              url: '#',
            },
            {
              title: 'Optimizing',
              url: '#',
            },
            {
              title: 'Configuring',
              url: '#',
            },
            {
              title: 'Testing',
              url: '#',
            },
            {
              title: 'Authentication',
              url: '#',
            },
            {
              title: 'Deploying',
              url: '#',
            },
            {
              title: 'Upgrading',
              url: '#',
            },
            {
              title: 'Examples',
              url: '#',
            },
          ],
        },
        {
          title: 'API Reference',
          url: '#',
          links: [
            {
              title: 'Components',
              url: '#',
            },
            {
              title: 'File Conventions',
              url: '#',
            },
            {
              title: 'Functions',
              url: '#',
            },
            {
              title: 'next.config.js Options',
              url: '#',
            },
            {
              title: 'CLI',
              url: '#',
            },
            {
              title: 'Edge Runtime',
              url: '#',
            },
          ],
        },
        {
          title: 'Architecture',
          url: '#',
          links: [
            {
              title: 'Accessibility',
              url: '#',
            },
            {
              title: 'Fast Refresh',
              url: '#',
            },
            {
              title: 'Next.js Compiler',
              url: '#',
            },
            {
              title: 'Supported Browsers',
              url: '#',
            },
            {
              title: 'Turbopack',
              url: '#',
            },
          ],
        },
        {
          title: 'Community',
          url: '#',
          links: [
            {
              title: 'Contribution Guide',
              url: '#',
            },
          ],
        },
      ],
      relatedContent: {
        knowledge: [
          {
            label: 'AWS Risk Assessment Terraform Module',
            url: '/knowledge/terraform_risk_assessment_AWS/_index.md',
            type: 'published',
          },
          {
            label: 'AWS Airview CCF Terraform Module',
            url: '/knowledge/terraform_aws_airview_ccf/_index.md',
            type: 'note',
          },
        ],
        services: [
          {
            label: 'AWS Account Vending Machine',
            url: '/services/aws_account_vending_machine/_index.md',
            type: 'published',
          },
          {
            label: 'AWS Beanstalk',
            url: '/services/aws_beanstalk/_index.md',
            type: 'draft',
          },
          {
            label: 'AWS Airwalk Network Firewall Terraform Module',
            url: '/services/aws_vpc/terraform-aws-airwalk-module-networkfirewall.md',
            type: 'published',
          },
          {
            label: 'AWS WAF and Shield',
            url: '/services/aws_waf_and_shield/_index.md',
            type: 'published',
          },
        ],
      },
      // onAddDocument: fn(),
      // onEditDocument: fn(),
      // onPrintDocument: fn(),
    },
  },
}
