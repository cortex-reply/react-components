import React from 'react'
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  FilePlus,
  Edit,
  Printer,
  Folder,
  Frame,
  LifeBuoy,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Send,
  Settings2,
  Share,
  Plus,
  Sparkles,
  SquareTerminal,
  Trash2,
} from 'lucide-react'
import MainPage from './MainPage'
import { fn } from '@storybook/test'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { DynamicIcon } from '@/components/Images'
import { StoryObj } from '@storybook/react';

const GithubIcon = () => (
  // <FontAwesomeIcon icon={faGithub} size="10x" />
  <DynamicIcon iconName="github" size="4x" type="brands" />
)

const ProjectIcon = () => <DynamicIcon iconName="diagram-project" size="4x" type="thin" />
const BusinessFunction = () => <DynamicIcon iconName="briefcase" size="4x" type="thin" />

const Squad = () => <DynamicIcon iconName="people-group" size="4x" type="thin" />
const AWSIcon = () => <DynamicIcon iconName="aws" type="brands" />
const AzureIcon = () => <DynamicIcon iconName="azure" type="kit" />
const SolutionIcon = () => <DynamicIcon iconName="people-sharing" size="4x" type="kit" />

const ServiceIcon = () => <DynamicIcon iconName="cloud-network-sharing" size="4x" type="kit" />

const ProductIcon = () => <DynamicIcon iconName="development" size="4x" type="kit" />

export default {
  title: 'Digital Colleagues/Main Page',
  component: MainPage,
  decorators: [
    (Story: React.FC) => (
      <div className="bg-sidebar">
        <Story />
      </div>
    ),
  ],
}

const Template = (args: any) => <MainPage {...args} />

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
      title: 'Digital Colleagues',
      // subTitle: 'Current Projects',
      ongoingWork: [
        {
          label: 'Bid Writing',
          url: '#',
          icon: ProjectIcon,
          isActive: true,
          links: [
            {
              label: 'Opportunity A',
              url: '#',
            },
            {
              label: 'Opportunity B',
              url: '#',
            },
            {
              label: 'Opportunity C',
              url: '#',
            },
          ],
        },
   
       
      ],
      mainNav: [
        {
          label: 'Projects',
          url: '#',
          icon: ProjectIcon,
          isActive: true,
        },
        {
          label: 'Business Functions',
          url: '#',
          icon: BusinessFunction,
          isActive: true,
        },
        {
          label: 'Squads',
          url: '#',
          icon: Squad,
          isActive: true,
        },  
      ],
      secondaryNav: [
        {
          label: 'Documentation',
          url: '#',
          icon: BookOpen,
        },
        {
          label: 'Settings',
          url: '#',
          icon: Settings2,
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
