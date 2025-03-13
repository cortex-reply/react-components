import React from 'react'
import Page from './PageSections'
import { Meta, StoryObj } from '@storybook/react'
import { FaInstagram, FaLinkedin, FaLinkedinIn } from 'react-icons/fa6'
import logoLight from '../../.storybook/public/cortex-reply-light.png'
import logoDark from '../../.storybook/public/cortex-reply-dark.png'
import { ImageTest, BlocksTest, HeroTest, PagesTest } from '../tests/payload'
import serviceImage from '../../.storybook/public/assets/images/background/waves.jpg'
import { CiMobile1 } from 'react-icons/ci'
import { GoMail } from 'react-icons/go'
import { SlLocationPin } from 'react-icons/sl'

const bgImage = {
  blurDataURL: '/assets/props/Cortex-Handshake-BG.jpg',
  height: 1315,
  url: '/assets/props/Cortex-Handshake-BG.jpg',
  width: 1920,
}

const content = (description: string) => {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,

      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,

          children: [
            {
              mode: 'normal',
              text: description,
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          textStyle: '',
          textFormat: 0,
        },
      ],
      direction: 'ltr',
    },
  }
}

export default {
  title: 'Pages/PageSections',
  component: Page,
  decorators: [
    (Story: React.FC) => (
      <div className="bg-sidebar">
        <Story />
      </div>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
    docs: {
      description: {
        component: 'Example page separators.',
      },
    },
  },
}

const Template = (args: any) => <Page {...args} />

type PageStory = StoryObj<typeof Page>

export const Default: PageStory = {
  render: Template,
  args: {
    title: 'Lorem Ipsum',
    subtitle: 'Dolor Sit Amet',
    style: 'scroll',
    hero: {
      type: 'dummy',
    },
    service: {
      title: 'Our Services',
      content: content('What we do.'),
      services: [
        {
          image: bgImage,
          title: 'Service Title',
          content: content('This is a description of the service.'),
          link: { label: 'find out more', url: '#' },
        },
        {
          image: bgImage,
          title: 'Service Title',
          content: content('This is a description of the service.'),
          link: { label: 'find out more', url: '#' },
        },
        {
          image: bgImage,
          title: 'Service Title',
          content: content('This is a description of the service.'),
          link: { label: 'find out more', url: '#' },
        },
      ],
      image: serviceImage,
    },
    contact: {
      sectionHeading: {
        title: 'Get in Touch',
        subtitle: 'We would love to hear from you',
      },
      image: {
        src: '/assets/images/contact.png',
        alt: 'Contact Us',
        blurDataURL: 'data:image/jpeg;base64,...', // Add your blur data URL here
      },
      contactInfo: {
        sectionHeading: {
          title: 'Contact Information',
          subtitle: 'Reach out to us through any of the following methods',
        },
        location: '123 Main Street, Anytown, AT 12345',
        mail: 'info@example.com',
        phone: '+1 (555) 123-4567',
      },
      locations: [
        {
          title: 'Head Office',
          location: '123 Main Street, Anytown, AT 12345',
          mails: ['headoffice@example.com'],
          phoneNumbers: ['+1 (555) 123-4567'],
          embedUrl: 'https://www.google.com/maps/embed?...', // Add your Google Maps embed URL here
        },
        {
          title: 'Branch Office',
          location: '456 Elm Street, Othertown, OT 67890',
          mails: ['branchoffice@example.com'],
          phoneNumbers: ['+1 (555) 987-6543'],
          embedUrl: 'https://www.google.com/maps/embed?...', // Add your Google Maps embed URL here
        },
      ],
    },
    blog: {
      sectionHeading: {
        // subtitle: 'Payload',
        title: 'Insights',
        description: 'Read our latest thought leadership articles.',
      },
      blogs: [
        {
          slug: '/blog/pioneering-progress',
          image: {
            src: '/assets/images/blog/istockphoto1.jpg',
            alt: 'Pioneering Progress, One Algorithm at a Time',
          },
          authors: [{ name: 'admin with a long name' }, { name: 'demo' }],
          categories: ['Technology', 'Other'],
          publishedAt: '2025-01-01T17:19:41.270Z',
          commentCount: '05',
          title: 'Pioneering Progress, One Algorithm at a Time',
          description:
            'Aliquam eros justo, posuere lobortis non, viverra laoreet augue mattis start fermentum ullamcorper viverra laoreet. By Admin. Technology. 28th February 2022. Leave a comment.',
        },
        {
          slug: '/blog/innovative-solutions',
          image: {
            src: '/assets/images/blog/istockphoto2.jpg',
            alt: 'Innovative Solutions for Modern Problems',
          },
          publishedAt: '2025-01-01T17:19:41.270Z',
          categories: [],
          commentCount: '10',
          title: 'Innovative Solutions for Modern Problems',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. By John Doe. Innovation. 15th March 2022. Leave a comment.',
        },
        {
          slug: '/blog/future-of-tech',
          image: {
            src: '/assets/images/blog/istockphoto3.jpg',
            alt: 'The Future of Technology',
          },
          authors: [{ name: 'admin' }, { name: 'demo' }],
          publishedAt: '2025-01-01T17:19:41.270Z',
          commentCount: '08',
          title: 'The Future of Technology',
          description:
            'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. By Jane Doe. Future. 22nd April 2022. Leave a comment.',
        },
      ],
    },
    footer: {
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
    },
  },
}

export const ParallaxScroll = {
  args: {
    ...Default.args,
    style: 'slide',
  },
}

export const LowImpactHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'lowImpact',
      children: <h1 className="text-4xl font-bold">Low Impact Hero</h1>,
    },
  },
}

export const MediumImpactHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'mediumImpact',
      media: 'stock1.jpg?height=400&width=800',
      children: <h1 className="text-4xl font-bold">Medium Impact Hero</h1>,
    },
  },
}

export const HighImpactHero = {
  args: {
    ...Default.args,
    hero: HeroTest.highImpactSimple,
  },
}

export const PostHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'post',
      children: <h1 className="text-4xl font-bold">Post Hero</h1>,
      media: 'stock1.jpg?height=400&width=800',
    },
    media: 'stock1.jpg?height=400&width=800',
  },
}

export const SectionHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'section',
      children: <h1 className="text-4xl font-bold">Post Hero</h1>,
      media: 'stock1.jpg?height=400&width=800',
    },
    media: 'stock1.jpg?height=400&width=800',
  },
}
