import {
  BookOpen,
  Bot,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
} from 'lucide-react'
import { DynamicIcon } from '../Images'

import React from 'react'
import { SidebarLeftMulti } from './SidebarLeftMulti'
import { SidebarProvider } from '@/components/ui/sidebar'
import { fn } from '@storybook/test'
export default {
  title: 'Menus/SidebarLeftMulti',
  component:  SidebarLeftMulti,
}

const Template = (args) => (
  <SidebarProvider>
    <SidebarLeftMulti {...args} />
  </SidebarProvider>
)
//
export const Default = Template.bind({})
// mainNav: [
//   {
//     title: "Playground",
//     url: "#",
//     icon: SquareTerminal,
//     isActive: true,
//     items: [
//       {
//         title: "History",
//         url: "#",
//       },
//       {
//         title: "Starred",
//         url: "#",
//       },
//     ]
//   },
Default.args = {
  title: 'Playground',
  subTitle: 'Airview',
  menuHeading: 'Main Menu',
  mainNav: [
    {
      name: 'Models',
      nav: [
    {
      label: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      links: [
        { label: 'History', url: '#' },
        { label: 'Starred', url: '#' },
        { label: 'Settings', url: '#' },
      ],
    },
    {
      label: 'Models',
      url: '#',
      icon: Bot,
      links: [
        { label: 'Genesis', url: '#' },
        { label: 'Explorer', url: '#' },
        { label: 'Quantum', url: '#' },
      ],
    },
    {
      label: 'Documentation',
      url: '#',
      icon: BookOpen,
      links: [
        { label: 'Introduction', url: '#' },
        { label: 'Get Started', url: '#' },
        { label: 'Tutorials', url: '#' },
        { label: 'Changelog', url: '#' },
      ],
    },
    {
      label: 'Settings',
      url: '#',
      icon: Settings2,
      links: [
        { label: 'General', url: '#' },
        { label: 'Team', url: '#' },
        { label: 'Billing', url: '#' },
        { label: 'Limits', url: '#' },
      ],
    },
  ],
},
{
      name: '2nd Menu',
      nav: [
    {
      label: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      links: [
        { label: 'History', url: '#' },
        { label: 'Starred', url: '#' },
        { label: 'Settings', url: '#' },
      ],
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
  onNavClick: fn(),
}



export const Loading = Template.bind({})
Loading.args = {
  title: 'Playground',
  loading: true,
  subTitle: 'Airview',
  menuHeading: 'Main Menu',
  mainNav: undefined,
  secondaryNav: undefined,
  onNavClick: fn(),
}
const GithubIcon = () => <DynamicIcon iconName="github" type="brands" />

export const CustomIcons = Template.bind({})
CustomIcons.args = {
  title: 'Playground',
  subTitle: 'Airview',
  menuHeading: 'Main Menu',
  mainNav: [{
      name: 'Models',
      nav: [
    {
      label: 'Kubernetes',
      url: '/collections/solutions/solutions/kubernetes/_index.md',
      icon: GithubIcon,
      type: 'published',
      links: [
        {
          label: 'High Level Design',
          url: '/solutions/designs/high_level_design_lczbvf99/_index.md',
          type: 'published',
        },
        {
          label: 'Istio Ambient Mesh',
          url: '/solutions/designs/istio_ambient_mesh_leemxsdx/_index.md',
          type: 'published',
        },
        {
          label: 'AWS Landing Zone - Elastic Kubernetes Service (EKS)',
          url: '/solutions/designs/elastic_kubernetes_service_eks_ljwysr3d/_index.md',
          type: 'published',
        },
      ],
    },
    {
      label: 'AI Contact Centre',
      url: '/collections/solutions/solutions/contact_centre/_index.md',
      type: 'published',
    },
    // Additional items follow the same structure...
  ],
},
  ],
}

export const NoArgs = Template.bind({})
NoArgs.args = {}
