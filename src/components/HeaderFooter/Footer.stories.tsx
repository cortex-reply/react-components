import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Footer, type SectionProps } from './Footer'
import { FaInstagram, FaLinkedin, FaLinkedinIn } from 'react-icons/fa6'
import { GoMail } from 'react-icons/go'
import { SlLocationPin } from 'react-icons/sl'
import { CiMobile1 } from 'react-icons/ci'
import logoLight from '../../../.storybook/public/cortex-reply-light.png'
import logoDark from '../../../.storybook/public/cortex-reply-dark.png'

export default {
  title: 'Footer/Footer',
  component: Footer,
  parameters: {
    docs: {
      description: {
        component:
          'A footer component that displays various sections including about, links, and contact information.',
      },
    },
  },
  argTypes: {
    className: { control: 'text' },
    footerData: { control: 'object' },
  },
} as Meta

const Template: StoryFn<SectionProps> = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {
  className: '',
  logoLight: logoLight,
  logoDark: logoDark,
  footerData: {
    about: {
      description:
        'we enable organisations to harnesses the power of generative AI and drive operational excellence.',
      socialLinks: [
        {
          icon: <FaLinkedinIn />,
          href: 'https://www.linkedin.com/company/cortex-reply/',
        },
        {
          icon: <FaInstagram />,
          href: 'https://www.instagram.com/cortex.reply/',
        },
      ],
    },
    columnOne: {
      title: 'Our Services',
      links: [{ label: 'Ai Enablement' }, { label: 'FinOps' }, { label: 'Digital Colleagues' }],
    },
    columnTwo: {
      contactUs: [
        {
          icon: <CiMobile1 />,
          href: '+44 (0) 2077306000',
        },
        {
          icon: <GoMail />,
          href: 'cortex.sales@replay.com',
        },
        {
          icon: <SlLocationPin />,
          href: '38 Grosvenor Gardens, London, SW1W 0WB, England',
        },
      ],
    },
    footerBottom: {
      copyrightText: '© Cortex Reply Ltd 2025 | All Rights Reserved',
      links: [
        {
          label: 'Privacy and Cookie Policy',
          href: '/privacy-policy',
          openNewTab: false,
        },
        {
          label: 'Legal & accessibility',
          href: '/contact',
          openNewTab: false,
        },
        {
          label: 'Modern slavery act',
          href: '/contact',
          openNewTab: false,
        },
      ],
    },
  },
}

export const NoBlog = Template.bind({})
NoBlog.args = {
  className: '',
  logoLight: logoLight,
  logoDark: logoDark,
  footerData: {
    about: {
      description: 'This is a sample description for the about section.',
      socialLinks: [
        {
          icon: <FaLinkedin />,
          href: 'https://www.linkedin.com/company/cortex-reply/',
        },
        {
          icon: <FaInstagram />,
          href: 'https://www.instagram.com/cortex.reply/',
        },
      ],
    },
    columnOne: {
      title: 'Column One',
      links: [
        { href: '/link1', label: 'Link 1' },
        { href: '/link2', label: 'Link 2' },
      ],
    },
    columnTwo: {
      title: 'Contact Us',
      location: '1234 Street Name, City, Country',
      mails: ['contact@example.com', 'support@example.com'],
    },

    footerBottom: {
      copyrightText: 'copyright',
      links: [
        {
          label: 'Privacy Policy',
          href: '/privacy-policy',
          openNewTab: false,
        },
        {
          label: 'Contact Us',
          href: '/contact',
          openNewTab: false,
        },
      ],
    },
  },
}
