import React from 'react'

import Website from './Website'
import { fn } from '@storybook/test'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { DynamicIcon } from '@/components/Images'
import { Meta, StoryObj } from '@storybook/react'
import pattern1 from '@/images/hero/image-hero1.webp'

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
  title: 'Example Pages/Website',
  component: Website,
  // decorators: [
  //   (Story: React.FC) => (
  //     <div>
  //       <Story />
  //     </div>
  //   ),
  // ],
}

const Template = (args: any) => <Website {...args} />

type PageStory = StoryObj<typeof Website>

export const Default: PageStory = {
  render: Template,
  args: {
    title: 'Storage Service',
    section: 'Storage',
    description:
      'A scalable object storage service that offers industry-leading performance, security, and availability.',
    children: (
      <div className="prose max-w-none">
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <div className="aspect-video overflow-hidden rounded-lg bg-slate-100">
          <div className="flex h-full items-center justify-center">Video Placeholder</div>
        </div>
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum,
          urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu
          volutpat dignissim in a lorem.
        </p>
        <p>
          Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit
          amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum.
          Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus
          imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.
        </p>
        <p>
          Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel
          lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero
          convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis
          sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum
          felis.
        </p>
        <p>
          Aenean ut ligula ac libero vehicula luctus. Integer ultricies nisl id mi dictum, eget
          tincidunt augue interdum. Sed eu malesuada erat. Nam fringilla lectus id dolor gravida
          lacinia. Aliquam erat volutpat. Vestibulum nec ipsum vitae elit dapibus suscipit vel at
          ipsum.
        </p>
        <div className="aspect-video overflow-hidden rounded-lg bg-slate-100">
          <div className="flex h-full items-center justify-center">Video Placeholder</div>
        </div>
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <div className="aspect-video overflow-hidden rounded-lg bg-slate-100">
          <div className="flex h-full items-center justify-center">Video Placeholder</div>
        </div>
      </div>
    ),
    header: {
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
    page: {
      id: 7,
      title: 'Ways of Working',

      hero: {
        type: 'highImpact',

        richText: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                tag: 'h1',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'How we work',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
            ],
            direction: 'ltr',
          },
        },
        links: [],

        media: {
          id: 34,
          alt: 'Global digital mesh network',
          prefix: 'media',
          updatedAt: '2025-01-08T23:05:26.243Z',
          createdAt: '2025-01-08T23:05:26.243Z',
          url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF.jpg',
          thumbnailURL: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-300x200.jpg',
          filename: 'a-Ht-M8SAwtqOdjTkdVwF.jpg',
          mimeType: 'image/jpeg',
          filesize: 190660,
          width: 2121,
          height: 1414,
          focalX: 50,
          focalY: 50,

          sizes: {
            thumbnail: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-300x200.jpg',
              width: 300,
              height: 200,
              mimeType: 'image/jpeg',
              filesize: 11319,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-300x200.jpg',
            },
            square: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-500x500.jpg',
              width: 500,
              height: 500,
              mimeType: 'image/jpeg',
              filesize: 38667,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-500x500.jpg',
            },
            small: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-600x400.jpg',
              width: 600,
              height: 400,
              mimeType: 'image/jpeg',
              filesize: 32551,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-600x400.jpg',
            },
            medium: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-900x600.jpg',
              width: 900,
              height: 600,
              mimeType: 'image/jpeg',
              filesize: 58719,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-900x600.jpg',
            },
            large: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-1400x933.jpg',
              width: 1400,
              height: 933,
              mimeType: 'image/jpeg',
              filesize: 107469,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-1400x933.jpg',
            },

            xlarge: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-1920x1280.jpg',
              width: 1920,
              height: 1280,
              mimeType: 'image/jpeg',
              filesize: 165278,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-1920x1280.jpg',
            },
          },
        },
      },
      layout: [
        {
          id: '6772cd28c14b6a26539135b6',
          blockName: null,

          columns: [
            {
              id: '6772cd2bc14b6a26539135b7',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Ways of Working',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'We want to build a company culture where effort is recognised and rewarded, therefore we would like to set out some guidelines.',
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
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Effort Matters:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' Every team member’s contributions, big or small, are valued and noticed.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Commitment to Excellence:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' Deliver work with attention to quality and impact.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Proactive Collaboration:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' Support teammates and contribute to shared goals.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: ' ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Working Hours',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Core Hours:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: ' All employees should be available from ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: '08:30 to 17:30',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' to maintain collaboration and responsiveness during key business hours. Total working week 40 hours',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Flexible Working:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' We support flexibility outside core hours, allowing you to adjust your start and finish times as long as work priorities are met and team coordination remains unaffected.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'In-Office Day:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: ' To promote team culture, all employees are required to work ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'one day a week in their local office',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: '. This day will be agreed upon within teams to ensure maximum participation and collaboration.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Holiday Process',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' - TBC (confirmed once we have an App)',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: ' ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Team Collaboration',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Bi-Weekly - ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: 'All employees must attend the Bi-Weekly team meeting at their local office or remotely via teams (optionally can travel to the remote office for the meeting if they wish)',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Bench Call',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' - Any employees on the bench must attend the daily bench call and provide updates on their progress.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: "POD's",
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' - Everyone should be actively involved with at least POD',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Cameras',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' - Camera should always be on during Teams calls',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: ' ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                  ],
                  direction: 'ltr',
                },
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },
        {
          id: '6772d7f357671c5f5b6b4e0c',
          title: 'Document Management',
          description: null,
          blockName: null,

          features: [
            {
              id: '6772d80757671c5f5b6b4e0d',
              title: 'Cortex Intranet',

              content: {
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
                          text: 'Will be used for as much documentation as possible. ',
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
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'It has two main features:',
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
                    {
                      tag: 'ol',
                      type: 'list',
                      start: 1,
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          type: 'listitem',
                          value: 1,
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              mode: 'normal',
                              text: 'The Content Management System. This is used to create content for both internal and external consumption. External content for our website is authored here and published.',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 0,
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                        },
                        {
                          type: 'listitem',
                          value: 2,
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              mode: 'normal',
                              text: 'Github. Used for design documents and other content, code and artefacts that we should keep tight control over. This content can also be published internally without going through the full GitFlow process.',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 0,
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                        },
                      ],
                      listType: 'number',
                      direction: 'ltr',
                    },
                  ],
                  direction: 'ltr',
                },
              },
              link: {
                type: 'custom',
                newTab: null,
                url: '/',
                label: 'Home',
              },

              icon: {
                type: 'fa-thin',
                icon: 'home',
              },
            },
            {
              id: '6772d8b857671c5f5b6b4e0e',
              title: 'SharePoint',

              content: {
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
                          text: 'SharePoint is used to store Microsoft Office documents like PowerPoint and Word documents.',
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
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          type: 'linebreak',
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'The ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'Document Library',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' library should not be used as this is where Teams dumps files.',
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
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Avoid using OneDrive to store files. Use SharePoint wherever possible.',
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
              },
              link: {
                type: 'custom',
                newTab: true,
                url: 'https://reply.sharepoint.com/sites/Cortex790',
                label: 'Sharepoint',
              },

              icon: {
                type: 'fa-kit',
                icon: 'microsoft-office',
              },
            },
            {
              id: '6772d95357671c5f5b6b4e0f',
              title: 'Teams',

              content: {
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
                          text: 'Should be used for conversations. Files should be shared as links to SharePoint documents.',
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
              },
              link: {
                type: 'custom',
                newTab: null,
                url: '#',
                label: '#',
              },

              icon: {
                type: 'fa-thin',
                icon: 'screen-users',
              },
            },
          ],
          blockType: 'features',
        },
      ],
      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2024-12-30T14:47:13.971Z',
      publishedToWebsite: false,
      slug: 'ways-of-working',
      slugLock: true,
      parent: null,
      breadcrumbs: [
        {
          id: '67805ee8bfbb3500011b4be8',
          doc: 7,
          url: null,
          label: 'Ways of Working',
        },
      ],
      updatedAt: '2025-01-09T23:42:32.648Z',
      createdAt: '2024-12-30T14:47:05.921Z',
      _status: 'published',
    },
    edit: true,
  },
}

export const LowImpactHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'lowImpact',
      children: <h1 className="text-4xl font-bold">Low Impact Hero</h1>,
    },
    heroBackgroundImage: 'stock1.jpg?height=400&width=800',
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
    heroBackgroundImage: 'stock1.jpg?height=400&width=800',
  },
}

export const HighImpactHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'highImpact',
      children: (
        <div className="max-w-none mx-auto prose dark:prose-invert mb-6">
          <h1 className="col-start-2">High Impact Hero </h1>
          <p className="col-start-2"></p>
          <p className="col-start-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
            vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor
            lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus
            et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim
            in a lorem.
          </p>
          <p className="col-start-2"></p>
          <p className="col-start-2">
            Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit
            amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros
            fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu
            pellentesque. Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.
          </p>
        </div>
      ),
      media: 'stock1.jpg?height=400&width=800',
    },
    media: 'stock1.jpg?height=400&width=800',
  },
}

export const PostHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'postHero',
      post: {
        id: '1',
        title: 'Sample Post Title',
        categories: [
          { id: '1', title: 'Category 1' },
          { id: '2', title: 'Category 2' },
        ],
        meta: {
          image: { url: 'stock1.jpg' },
        },
        populatedAuthors: [
          {
            id: '1',
            name: 'Author 1',
            avatar: {
              id: '1',
              url: '/path/to/avatar1.jpg',
              alt: 'Author 1 Avatar',
            },
          },
          {
            id: '2',
            name: 'Author 2',
            avatar: {
              id: '2',
              url: '/path/to/avatar2.jpg',
              alt: 'Author 2 Avatar',
            },
          },
        ],
        publishedAt: '2023-10-01T12:00:00Z',
        content: 'Sample post content...',
      },
    },
  },
}

export const SectionHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'sectionHero',
      image: pattern1,
      title: 'Services',
      breadcrumbItems: [
        {
          label: 'Home',
          href: '/',
        },
        {
          label: 'Service',
        },
      ],
    },
  },
}

export const RandomText = {
  args: {
    ...Default.args,
    hero: {
      type: 'mediumImpact',
      media: 'stock1.jpg?height=400&width=800',
      children: <h1 className="text-4xl font-bold">Medium Impact Hero</h1>,
    },
    relatedContent: [
      {
        title: 'Related Links',
        links: [
          { title: 'Employee Handbook', url: '/handbook' },
          { title: 'IT Support', url: '/it-support' },
          { title: 'HR Portal', url: '/hr' },
          { title: 'Company Directory', url: '/directory' },
        ],
      },
    ],
    page: {
      id: 19,
      title: 'Test Page',

      hero: {
        type: 'highImpact',

        richText: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                tag: 'h1',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Sed non velit nec arcu volutpat dignissim in a lorem.',
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
        },
        links: [],

        media: {
          id: 34,
          alt: 'Global digital mesh network',
          prefix: 'media',
          updatedAt: '2025-01-08T23:05:26.243Z',
          createdAt: '2025-01-08T23:05:26.243Z',
          url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF.jpg',
          thumbnailURL: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-300x200.jpg',
          filename: 'a-Ht-M8SAwtqOdjTkdVwF.jpg',
          mimeType: 'image/jpeg',
          filesize: 190660,
          width: 2121,
          height: 1414,
          focalX: 50,
          focalY: 50,

          sizes: {
            thumbnail: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-300x200.jpg',
              width: 300,
              height: 200,
              mimeType: 'image/jpeg',
              filesize: 11319,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-300x200.jpg',
            },
            square: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-500x500.jpg',
              width: 500,
              height: 500,
              mimeType: 'image/jpeg',
              filesize: 38667,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-500x500.jpg',
            },
            small: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-600x400.jpg',
              width: 600,
              height: 400,
              mimeType: 'image/jpeg',
              filesize: 32551,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-600x400.jpg',
            },
            medium: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-900x600.jpg',
              width: 900,
              height: 600,
              mimeType: 'image/jpeg',
              filesize: 58719,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-900x600.jpg',
            },
            large: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-1400x933.jpg',
              width: 1400,
              height: 933,
              mimeType: 'image/jpeg',
              filesize: 107469,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-1400x933.jpg',
            },

            xlarge: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-1920x1280.jpg',
              width: 1920,
              height: 1280,
              mimeType: 'image/jpeg',
              filesize: 165278,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-1920x1280.jpg',
            },
          },
        },
      },
      layout: [
        {
          id: '67828accbfbb3500011b4cd7',
          blockName: null,

          columns: [
            {
              id: '67828accbfbb3500011b4cd6',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
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
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: ' ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: ' Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'Pellentesque habitant morbi tristique sen',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 8,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: 'ectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: 'Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 2,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: ' ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: ' ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                  ],
                  direction: 'ltr',
                },
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },
        {
          id: '67828accbfbb3500011b4cdb',
          title: 'Aenean ut ligula ac libero vehicula luctus. I',

          description: {
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
                      text: 'Suspendisse potenti. ',
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
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      mode: 'normal',
                      text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
          },
          blockName: null,
          features: [
            {
              id: '67828accbfbb3500011b4cd8',
              title: 'Aenean ut ligula ac libero vehicula luctus. ',

              content: {
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
                          text: 'Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
              },
              link: {
                type: 'none',
                newTab: null,
                url: '/',
                label: 'Home',
              },

              icon: {
                type: 'fa-thin',
                icon: 'home',
              },
            },
            {
              id: '67828accbfbb3500011b4cd9',
              title: 'Lorem ipsum dolor sit amet',

              content: {
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
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
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
              },
              link: {
                type: 'none',
                newTab: true,
                url: '',
                label: 'test',
              },

              icon: {
                type: 'fa-kit',
                icon: 'microsoft-office',
              },
            },
            {
              id: '67828accbfbb3500011b4cda',
              title: 'Sed non velit nec arcu volutpat dignissim in a lorem.',

              content: {
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
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum.',
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
              },
              link: {
                type: 'custom',
                newTab: null,
                url: '#',
                label: '#',
              },

              icon: {
                type: 'fa-thin',
                icon: 'screen-users',
              },
            },
          ],
          blockType: 'features',
        },
        {
          id: '67828be29b9e476536d9588d',
          blockName: null,

          columns: [
            {
              id: '67828be59b9e476536d9588e',
              size: 'half',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                    {
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aliquam erat volutpat. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                    {
                      tag: 'h4',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aliquam erat volutpat. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
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
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
            {
              id: '67828c239b9e476536d9588f',
              size: 'half',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aliquam erat volutpat. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                    {
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },
      ],
      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2025-01-11T15:14:20.488Z',
      publishedToWebsite: false,
      slug: 'test-page',
      slugLock: true,
      parent: null,
      breadcrumbs: [
        {
          id: '67828dcbbfbb3500011b4d28',
          doc: 19,
          url: null,
          label: 'Test Page',
        },
      ],
      updatedAt: '2025-01-11T15:27:07.957Z',
      createdAt: '2025-01-11T15:14:20.282Z',
      _status: 'published',
    },
    edit: true,
  },
}

export const Bug = {
  args: {
    ...Default.args,
    page: {
      id: 1,
      title: 'Test Page 1',

      hero: {
        type: 'lowImpact',

        richText: {
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
                    text: 'Some stuff here',
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
        },

        links: [],
        media: null,
      },

      layout: [
        {
          id: '677cff59e83a777e0788b6f4',
          blockName: null,

          columns: [
            {
              id: '6782c9f47aff0559171133f7',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus. Integer ultricies nisl id mi dictum, eget tincidunt augue interdum. Sed eu malesuada erat. Nam fringilla lectus id dolor gravida lacinia. Aliquam erat volutpat. Vestibulum nec ipsum vitae elit dapibus suscipit vel at ipsum.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus. Integer ultricies nisl id mi dictum, eget tincidunt augue interdum. Sed eu malesuada erat. Nam fringilla lectus id dolor gravida lacinia. Aliquam erat volutpat. Vestibulum nec ipsum vitae elit dapibus suscipit vel at ipsum.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus. Integer ultricies nisl id mi dictum, eget tincidunt augue interdum. Sed eu malesuada erat. Nam fringilla lectus id dolor gravida lacinia. Aliquam erat volutpat. Vestibulum nec ipsum vitae elit dapibus suscipit vel at ipsum.',
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

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus. Integer ultricies nisl id mi dictum, eget tincidunt augue interdum. Sed eu malesuada erat. Nam fringilla lectus id dolor gravida lacinia. Aliquam erat volutpat. Vestibulum nec ipsum vitae elit dapibus suscipit vel at ipsum.',
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

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus. Integer ultricies nisl id mi dictum, eget tincidunt augue interdum. Sed eu malesuada erat. Nam fringilla lectus id dolor gravida lacinia. Aliquam erat volutpat. Vestibulum nec ipsum vitae elit dapibus suscipit vel at ipsum.',
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
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },
      ],

      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2025-01-07T10:18:02.877Z',
      publishedToWebsite: false,
      slug: 'test-page-1',
      slugLock: true,
      parent: null,

      breadcrumbs: [
        {
          id: '6782d21b313684e7c80a4918',
          doc: 1,
          url: null,
          label: 'Test Page 1',
        },
      ],
      updatedAt: '2025-01-11T20:18:35.031Z',
      createdAt: '2025-01-07T10:17:38.896Z',
      _status: 'published',
    },
  },
}

export const Bug2 = {
  args: {
    ...Default.args,
    page: {
      id: 33,
      title: 'Agile Ways of Working',

      hero: {
        type: 'lowImpact',

        richText: {
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
                    text: 'Agile Ways of Working',
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
        },

        links: [],
        media: null,
      },

      layout: [
        {
          id: '678fbb9bef18b752fa6ba8f9',
          blockName: 'Agile Ways of Working',

          columns: [
            {
              id: '678fbba0ef18b752fa6ba8fa',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Agile Ways of working',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: null,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Agile is a methodology that promotes continuous iteration of development and testing throughout the software development lifecycle. It emphasises flexibility, collaboration, and customer satisfaction.',
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

                    {
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Core Principles',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      tag: 'ol',
                      type: 'list',
                      start: 1,
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          type: 'listitem',
                          value: 1,
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              mode: 'normal',
                              text: 'Customer Collaboration',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 1,
                              version: 1,
                            },

                            {
                              mode: 'normal',
                              text: ': Engage with customers frequently to gather feedback and ensure the product meets their needs.',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 0,
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                        },

                        {
                          type: 'listitem',
                          value: 2,
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              mode: 'normal',
                              text: 'Responding to Change',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 1,
                              version: 1,
                            },

                            {
                              mode: 'normal',
                              text: ': Be adaptable and ready to pivot based on feedback and changing requirements.',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 0,
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                        },

                        {
                          type: 'listitem',
                          value: 3,
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              mode: 'normal',
                              text: 'Individuals and Interactions',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 1,
                              version: 1,
                            },

                            {
                              mode: 'normal',
                              text: ': Value people and communication over processes and tools.',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 0,
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                        },

                        {
                          type: 'listitem',
                          value: 4,
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              mode: 'normal',
                              text: 'Working Software',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 1,
                              version: 1,
                            },

                            {
                              mode: 'normal',
                              text: ': Deliver functional software frequently, with a preference for shorter timescales.',
                              type: 'text',
                              style: '',
                              detail: 0,
                              format: 0,
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                        },
                      ],
                      listType: 'number',
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },
                  ],
                  direction: 'ltr',
                },
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },

        {
          id: '678fbc43ef18b752fa6ba8fb',
          blockName: 'Agile Roles',

          columns: [
            {
              id: '678fbc52ef18b752fa6ba8fc',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Agile Roles',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'table',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Role',
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
                              direction: null,
                              headerState: 3,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Description',
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
                              direction: null,
                              headerState: 1,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Product Owner',
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
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Responsible for bridging the gap between the customer, business stakeholders, and the development team, ',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: ' An expert on the product and the customer’s needs and priorities. ',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 3,
                                      format: 'start',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Defines the product backlog and prioritises requirements',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 4,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Works with the development team to help clarify requirements and shields them from business prioritisation noise. ',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Scrum Master',
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
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Scrum masters are servant leaders',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Facilitates the Agile ceremonies',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 3,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Supports the development team by removing blockers',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Development Team members',
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
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'The team who create the product. Can be made up of developers, programmers, analysts, testers, designers, writers, engineers, editors, and anyone else involved in creating the product',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Development team members are cross-functional and have multiple skills they contribute to the product development work',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Stakeholders',
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
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Anyone with an interest in the product',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Provide input and are affected by the product’s outcome',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 3,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Can include people from different departments, or even different companies',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 4,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Stakeholders must be involved, providing regular feedback and support to the development team and product owner, but are outside of the scrum team',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },
                      ],

                      colWidths: [170, 408],
                      direction: null,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'horizontalrule',
                      version: 1,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                  ],
                  direction: 'ltr',
                },
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },

        {
          id: '678fbc60ef18b752fa6ba8fd',
          blockName: 'Agile Ceremonies',

          columns: [
            {
              id: '678fbc69ef18b752fa6ba8fe',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Agile Ceremonies',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'table',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Ceremony',
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
                              direction: null,
                              headerState: 3,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Frequency',
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
                              direction: null,
                              headerState: 1,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Description',
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
                              direction: null,
                              headerState: 1,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'PI Planning',
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

                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      mode: 'normal',
                                      text: ' ',
                                      type: 'text',
                                      style: '',
                                      detail: 0,
                                      format: 0,
                                      version: 1,
                                    },
                                  ],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Quarterly',
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
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Program Increment (PI) Planning',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Focused planning with all the teams, stakeholders, and product owners/managers in one place to review the program backlog.',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 3,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'creates a shared vision among Agile teams. Throughout the event, business stakeholders, project owners, and project teams review their program backlog. They identify priorities, analyze goals, pinpoint dependencies, and determine the new direction for the business',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Sprint Planning',
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

                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      mode: 'normal',
                                      text: ' ',
                                      type: 'text',
                                      style: '',
                                      detail: 0,
                                      format: 0,
                                      version: 1,
                                    },
                                  ],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Fortnightly',
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
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Takes place at the beginning of each sprint',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Define the sprint goal (based on priorities from the product owner) and the requirements to achieve this goal.',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 3,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Individual tasks needed to complete each requirement',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 4,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'The whole team should be involved',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 5,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Input – backlog items, capacity, product owner priorities',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 6,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Team to decide what work they will complete in the upcoming iteration.',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Mid sprint review',
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

                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      mode: 'normal',
                                      text: ' ',
                                      type: 'text',
                                      style: '',
                                      detail: 0,
                                      format: 0,
                                      version: 1,
                                    },
                                  ],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Fortnightly',
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
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Review the work completed so far in the sprint and that the team are still on track to meet the sprint goals',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Make any adjustments to tasks in the sprint that may be required. this could be re-prioritising tasks, reallocating resources, or refining their approach to certain tasks ',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Daily Stand up',
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

                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      mode: 'normal',
                                      text: ' ',
                                      type: 'text',
                                      style: '',
                                      detail: 0,
                                      format: 0,
                                      version: 1,
                                    },
                                  ],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Everyday',
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
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Daily meeting to ensure everyone is aware of what is going on. ',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Each team member gives an update based on 3 questions:',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 3,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          tag: 'ul',
                                          type: 'list',
                                          start: 1,
                                          format: '',
                                          indent: 0,
                                          version: 1,

                                          children: [
                                            {
                                              type: 'listitem',
                                              value: 1,
                                              format: '',
                                              indent: 1,
                                              version: 1,

                                              children: [
                                                {
                                                  mode: 'normal',
                                                  text: 'What was done yesterday',
                                                  type: 'text',
                                                  style: '',
                                                  detail: 0,
                                                  format: 0,
                                                  version: 1,
                                                },
                                              ],
                                              direction: 'ltr',
                                            },

                                            {
                                              type: 'listitem',
                                              value: 2,
                                              format: '',
                                              indent: 1,
                                              version: 1,

                                              children: [
                                                {
                                                  mode: 'normal',
                                                  text: 'What will be done today',
                                                  type: 'text',
                                                  style: '',
                                                  detail: 0,
                                                  format: 0,
                                                  version: 1,
                                                },
                                              ],
                                              direction: 'ltr',
                                            },

                                            {
                                              type: 'listitem',
                                              value: 3,
                                              format: '',
                                              indent: 1,
                                              version: 1,

                                              children: [
                                                {
                                                  mode: 'normal',
                                                  text: 'Any blockers/obstacles',
                                                  type: 'text',
                                                  style: '',
                                                  detail: 0,
                                                  format: 0,
                                                  version: 1,
                                                },
                                              ],
                                              direction: 'ltr',
                                            },
                                          ],
                                          listType: 'bullet',
                                          direction: 'ltr',
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: 'ltr',
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: 'ltr',
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'End of Sprint demo/show’n’tell',
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

                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      mode: 'normal',
                                      text: ' ',
                                      type: 'text',
                                      style: '',
                                      detail: 0,
                                      format: 0,
                                      version: 1,
                                    },
                                  ],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Fortnightly',
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
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Team showcases the work completed during the sprint - any new feature/ functionality that was part of the sprint goals',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Opportunity for stakeholders to provide any feedback ',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: 'ltr',
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: 'ltr',
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          height: 228,
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Sprint Retrospective',
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
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Fortnightly',
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
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  tag: 'ul',
                                  type: 'list',
                                  start: 1,
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [
                                    {
                                      type: 'listitem',
                                      value: 1,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Held at the end of each sprint to review how the team is working',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 2,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Reflect on the sprint focusing on:',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 3,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          tag: 'ul',
                                          type: 'list',
                                          start: 1,
                                          format: '',
                                          indent: 0,
                                          version: 1,

                                          children: [
                                            {
                                              type: 'listitem',
                                              value: 1,
                                              format: '',
                                              indent: 1,
                                              version: 1,

                                              children: [
                                                {
                                                  mode: 'normal',
                                                  text: 'What went well',
                                                  type: 'text',
                                                  style: '',
                                                  detail: 0,
                                                  format: 0,
                                                  version: 1,
                                                },
                                              ],
                                              direction: 'ltr',
                                            },

                                            {
                                              type: 'listitem',
                                              value: 2,
                                              format: '',
                                              indent: 1,
                                              version: 1,

                                              children: [
                                                {
                                                  mode: 'normal',
                                                  text: 'What could be improved',
                                                  type: 'text',
                                                  style: '',
                                                  detail: 0,
                                                  format: 0,
                                                  version: 1,
                                                },
                                              ],
                                              direction: 'ltr',
                                            },

                                            {
                                              type: 'listitem',
                                              value: 3,
                                              format: '',
                                              indent: 1,
                                              version: 1,

                                              children: [
                                                {
                                                  mode: 'normal',
                                                  text: 'Any action points',
                                                  type: 'text',
                                                  style: '',
                                                  detail: 0,
                                                  format: 0,
                                                  version: 1,
                                                },
                                              ],
                                              direction: 'ltr',
                                            },
                                          ],
                                          listType: 'bullet',
                                          direction: 'ltr',
                                        },
                                      ],
                                      direction: 'ltr',
                                    },

                                    {
                                      type: 'listitem',
                                      value: 3,
                                      format: '',
                                      indent: 0,
                                      version: 1,

                                      children: [
                                        {
                                          mode: 'normal',
                                          text: 'Suggested Retro tool: ',
                                          type: 'text',
                                          style: '',
                                          detail: 0,
                                          format: 0,
                                          version: 1,
                                        },

                                        {
                                          id: '6790bf3f49735a7ad6434b9c',
                                          type: 'link',

                                          fields: {
                                            doc: null,
                                            url: 'https://www.retrotool.app/',
                                            newTab: false,
                                            linkType: 'custom',
                                          },
                                          format: '',
                                          indent: 0,
                                          version: 3,

                                          children: [
                                            {
                                              mode: 'normal',
                                              text: 'Retro tool | Simple and effective retrospectives for your team',
                                              type: 'text',
                                              style: '',
                                              detail: 0,
                                              format: 0,
                                              version: 1,
                                            },
                                          ],
                                          direction: 'ltr',
                                        },
                                      ],
                                      direction: 'ltr',
                                    },
                                  ],
                                  listType: 'bullet',
                                  direction: 'ltr',
                                },
                              ],
                              direction: 'ltr',
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: 'ltr',
                        },
                      ],

                      colWidths: [92, 92, 372],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },
                  ],
                  direction: 'ltr',
                },
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },

        {
          id: '678fbc7aef18b752fa6ba8ff',
          blockName: 'Agile Artefacts',

          columns: [
            {
              id: '678fbc7def18b752fa6ba900',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Agile Artefacts',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },

                    {
                      type: 'table',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Artefact',
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
                              headerState: 3,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Description',
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
                              headerState: 1,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 1,
                              backgroundColor: null,
                            },
                          ],
                          direction: 'ltr',
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'User Story',
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
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: 'ltr',
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
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
                                      text: 'Product Backlog',
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
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: 'ltr',
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },

                        {
                          type: 'tablerow',
                          format: '',
                          indent: 0,
                          version: 1,

                          children: [
                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 2,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },

                            {
                              type: 'tablecell',
                              format: '',
                              indent: 0,
                              colSpan: 1,
                              rowSpan: 1,
                              version: 1,

                              children: [
                                {
                                  type: 'paragraph',
                                  format: '',
                                  indent: 0,
                                  version: 1,

                                  children: [],
                                  direction: null,
                                  textStyle: '',
                                  textFormat: 0,
                                },
                              ],
                              direction: null,
                              headerState: 0,
                              backgroundColor: null,
                            },
                          ],
                          direction: null,
                        },
                      ],

                      colWidths: [92, 92, 92],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                  ],
                  direction: 'ltr',
                },
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },
      ],

      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2025-01-21T15:28:09.099Z',
      publishedToWebsite: false,

      links: [
        {
          id: '678fbb87ef18b752fa6ba8f8',

          link: {
            type: 'reference',
            newTab: null,

            reference: {
              relationTo: 'pages',

              value: {
                id: 25,
                title: 'Delivery Methodologies',
                slug: 'delivery-methodologies',
              },
            },
            url: null,
            label: 'test',
          },
        },
      ],
      slug: 'agile-ways-of-working',
      slugLock: true,
      parent: null,

      breadcrumbs: [
        {
          id: '6790c52f0ab3d900013f4967',
          doc: 33,
          url: null,
          label: 'Agile Ways of Working',
        },
      ],
      updatedAt: '2025-01-22T10:15:12.002Z',
      createdAt: '2025-01-21T15:21:20.859Z',
      _status: 'published',
    },
  },
}

export const Bug3 = {
  args: {
    ...Default.args,
    page: {
      id: 33,
      title: 'Agile Ways of Working',

      hero: {
        type: 'lowImpact',

        richText: {
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
                    text: 'Agile Ways of Working',
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
        },

        links: [],
        media: null,
      },

      layout: [
        {
          id: '678fbb9bef18b752fa6ba8f9',
          blockName: 'Agile Ways of Working',

          columns: [
            {
              id: '678fbba0ef18b752fa6ba8fa',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: 'Agile Ways of working',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [],
                      direction: null,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Agile is a methodology that promotes continuous iteration of development and testing throughout the software development lifecycle. It emphasises flexibility, collaboration, and customer satisfaction.',
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
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },
      ],

      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2025-01-21T15:28:09.099Z',
      publishedToWebsite: false,

      links: [
        {
          id: '678fbb87ef18b752fa6ba8f8',

          link: {
            type: 'reference',
            newTab: null,

            reference: {
              relationTo: 'pages',

              value: {
                id: 25,
                title: 'Delivery Methodologies',
                slug: 'delivery-methodologies',
              },
            },
            url: null,
            label: 'test',
          },
        },
      ],
      slug: 'agile-ways-of-working',
      slugLock: true,
      parent: null,

      breadcrumbs: [
        {
          id: '6790c52f0ab3d900013f4967',
          doc: 33,
          url: null,
          label: 'Agile Ways of Working',
        },
      ],
      updatedAt: '2025-01-22T10:15:12.002Z',
      createdAt: '2025-01-21T15:21:20.859Z',
      _status: 'published',
    },
  },
}
