import React from 'react'
import {
 
  BookOpen,
  LifeBuoy,
  Send,
  Settings2,
 
} from 'lucide-react'
import Documentation from './Documentation'
import { fn } from '@storybook/test'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { DynamicIcon } from '@/components//Images'
import { StoryObj } from '@storybook/react';

const GithubIcon = () => (
  // <FontAwesomeIcon icon={faGithub} size="10x" />
  <DynamicIcon iconName="github" size="4x" type="brands" />
)
const AWSIcon = () => <DynamicIcon iconName="aws" type="brands" />
const AzureIcon = () => <DynamicIcon iconName="azure" type="kit" />
const SolutionIcon = () => <DynamicIcon iconName="people-sharing" size="4x" type="kit" />

const ServiceIcon = () => <DynamicIcon iconName="cloud-network-sharing" size="4x" type="kit" />

const ProductIcon = () => <DynamicIcon iconName="development" size="4x" type="kit" />

export default {
  title: 'Example Pages/Documentation Content',
  component: Documentation,
  decorators: [
    (Story: React.FC) => (
      <div className="bg-sidebar">
        <Story />
      </div>
    ),
  ],
}

const Template = (args: any) => <Documentation {...args} />

export const Default: StoryObj = {
  render: Template,
  args: {
    header: {
      title: 'Your Company',
      logo: 'cortex-reply.png',
      menuItems: [
        {
          name: 'Documentation',
          items: [
            {
              name: 'Platforms & Services',
              description: 'Cloud services',
              href: '#',
              icon: ServiceIcon, // Pass the component, not <ChartPieIcon />
            },
            {
              name: 'Solutions & Propositions',
              description: 'Solutions that we have built',
              href: '#',
              icon: SolutionIcon,
            },
            {
              name: 'Products',
              description: 'Products that we sell',
              href: '#',
              icon: ProductIcon,
            },
          ],
        },
        {
          name: 'Resources',
          items: [
            { name: 'Documentation', href: '#', icon: ChartPieIcon },
            { name: 'API Reference', href: '#', icon: CursorArrowRaysIcon },
            { name: 'Github', href: '#', icon: GithubIcon },
          ],
          actions: [
            { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
            { name: 'Contact sales', href: '#', icon: PhoneIcon },
            { name: 'View all products', href: '#', icon: RectangleGroupIcon },
          ],
        },
        {
          name: 'Intranet',
          href: '#',
        },
      ],
    },
    onToggleAppGrid: () => {
      fn()
    },
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
          label: 'Support',
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
      onAddDocument: fn(),
      onEditDocument: fn(),
      onPrintDocument: fn(),
    },
    github: {
      onPublishDraft: fn(),
      // fetchBranches?: (collection: any) => void;
      handleNewBranch: fn(),
      handlePR: fn(),
      onSave: fn(),
    },
  },
}
