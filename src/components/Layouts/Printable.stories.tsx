import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Printable } from './Printable';
import { fn } from '@storybook/test';
import { DynamicIcon } from '@/components/Images'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'

const GithubIcon = () => (
  // <FontAwesomeIcon icon={faGithub} size="10x" />
  <DynamicIcon iconName="github" size="4x" type="brands" />
)
const AWSIcon = () => <DynamicIcon iconName="aws" type="brands" />
const AzureIcon = () => <DynamicIcon iconName="azure" type="kit" />
const SolutionIcon = () => <DynamicIcon iconName="people-sharing" size="4x" type="kit" />

const ServiceIcon = () => <DynamicIcon iconName="cloud-network-sharing" size="4x" type="kit" />

const ProductIcon = () => <DynamicIcon iconName="development" size="4x" type="kit" />


const meta: Meta<typeof Printable> = {
  title: 'Example Pages/Print',
  component: Printable,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    layout: {
      control: { type: 'radio' },
      options: ['portrait', 'landscape'],
    },
  },
};

export default meta;


const Template = (args: any) => <Printable {...args} />
type PageStory = StoryObj<typeof Printable>

export const Default: PageStory = {
  render: Template,
  args: {
    layout: 'landscape',
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

export const Simple = {
  args: {
    ...Default.args,
    hero: {
      type: 'mediumImpact',
      media: 'stock1.jpg?height=400&width=800',
      children: <h1 className="text-4xl font-bold">Medium Impact Hero</h1>,
    },
    relatedContent: {
      title: 'Related Links',
      links: [
      ],
    },
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
          alt: '',
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
          blockName: 'Intro',

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
          theme: {
            settings: {
              theme: 'dark',
              background: 'solid',
            },
          },
        },
        {
          id: '67828accbfbb3500011b4cdb',
          title: 'Aenean ut ligula ac libero vehicula luctus',

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
          blockName: 'Features',
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
                type: 'custom',
                newTab: null,
                url: '#',
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
                type: 'custom',
                newTab: true,
                url: '#',
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
          blockName: 'half and half',

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
                          text: 'Suspendisse potenti',
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
                          text: 'Aliquam erat volutpat',
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
        {
          id: '678405ffdb401cc8f2fa0059',

          media: {
            id: 59,
            alt: 'Red gradient',
            prefix: 'media',
            updatedAt: '2025-01-11T23:03:48.548Z',
            createdAt: '2025-01-11T23:03:48.548Z',
            url: '/image-hero1.webp',
            thumbnailURL: '/api/media/file/BhkOkUO2efEsQ6LRiTjlQ-300x169.png',
            filename: 'BhkOkUO2efEsQ6LRiTjlQ.png',
            mimeType: 'image/png',
            filesize: 71842,
            width: 1920,
            height: 1080,
            focalX: 50,
            focalY: 50,

            sizes: {
              thumbnail: {
                url: '/api/media/file/BhkOkUO2efEsQ6LRiTjlQ-300x169.png',
                width: 300,
                height: 169,
                mimeType: 'image/png',
                filesize: 4148,
                filename: 'BhkOkUO2efEsQ6LRiTjlQ-300x169.png',
              },
              square: {
                url: '/api/media/file/BhkOkUO2efEsQ6LRiTjlQ-500x500.png',
                width: 500,
                height: 500,
                mimeType: 'image/png',
                filesize: 9982,
                filename: 'BhkOkUO2efEsQ6LRiTjlQ-500x500.png',
              },
              small: {
                url: '/api/media/file/BhkOkUO2efEsQ6LRiTjlQ-600x338.png',
                width: 600,
                height: 338,
                mimeType: 'image/png',
                filesize: 9891,
                filename: 'BhkOkUO2efEsQ6LRiTjlQ-600x338.png',
              },
              medium: {
                url: '/api/media/file/BhkOkUO2efEsQ6LRiTjlQ-900x506.png',
                width: 900,
                height: 506,
                mimeType: 'image/png',
                filesize: 23375,
                filename: 'BhkOkUO2efEsQ6LRiTjlQ-900x506.png',
              },
              large: {
                url: '/api/media/file/BhkOkUO2efEsQ6LRiTjlQ-1400x788.png',
                width: 1400,
                height: 788,
                mimeType: 'image/png',
                filesize: 54495,
                filename: 'BhkOkUO2efEsQ6LRiTjlQ-1400x788.png',
              },

              xlarge: {
                url: '/api/media/file/BhkOkUO2efEsQ6LRiTjlQ-1920x1080.png',
                width: 1920,
                height: 1080,
                mimeType: 'image/png',
                filesize: 71842,
                filename: 'BhkOkUO2efEsQ6LRiTjlQ-1920x1080.png',
              },
            },
          },
          blockName: 'image',
          blockType: 'mediaBlock',
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
          id: '67840629128ef9000175be54',
          doc: 19,
          url: null,
          label: 'Test Page',
        },
      ],
      updatedAt: '2025-01-12T18:12:57.130Z',
      createdAt: '2025-01-11T15:14:20.282Z',
      _status: 'published',
    },
  },
}

export const WithThemes = {
  args: {
    ...Default.args,
    page: {
      id: 1,
      title: 'Demo Page 1',

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
                    text: 'Test Hero Text',
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
          id: '67a74c276365f244c8b6d149',
          blockName: null,

          columns: [
            {
              id: '67a74ea16365f244c8b6d14b',
              size: 'oneThird',

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

          theme: {
            settings: {
              theme: 'dark',
              background: 'image',
              overlay: true,
              image: {
                id: 1,
                alt: null,
                prefix: 'media',
                updatedAt: '2025-02-08T12:27:55.461Z',
                createdAt: '2025-02-08T12:27:55.461Z',
                url: '/stock1.jpg',
                thumbnailURL: '/stock1.jpg',
                filename: 'stock1.jpg',
                mimeType: 'image/jpeg',
                filesize: 346701,
                width: 2190,
                height: 1369,
                focalX: 50,
                focalY: 50,

                sizes: {
                  thumbnail: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-300x188.jpg',
                    width: 300,
                    height: 188,
                    mimeType: 'image/jpeg',
                    filesize: 15812,
                    filename: 'etpN-LCfCvz_906z2BUPn-300x188.jpg',
                  },

                  square: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-500x500.jpg',
                    width: 500,
                    height: 500,
                    mimeType: 'image/jpeg',
                    filesize: 51438,
                    filename: 'etpN-LCfCvz_906z2BUPn-500x500.jpg',
                  },

                  small: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-600x375.jpg',
                    width: 600,
                    height: 375,
                    mimeType: 'image/jpeg',
                    filesize: 46315,
                    filename: 'etpN-LCfCvz_906z2BUPn-600x375.jpg',
                  },

                  medium: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-900x563.jpg',
                    width: 900,
                    height: 563,
                    mimeType: 'image/jpeg',
                    filesize: 88535,
                    filename: 'etpN-LCfCvz_906z2BUPn-900x563.jpg',
                  },

                  large: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-1400x875.jpg',
                    width: 1400,
                    height: 875,
                    mimeType: 'image/jpeg',
                    filesize: 172764,
                    filename: 'etpN-LCfCvz_906z2BUPn-1400x875.jpg',
                  },

                  xlarge: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-1920x1200.jpg',
                    width: 1920,
                    height: 1200,
                    mimeType: 'image/jpeg',
                    filesize: 279466,
                    filename: 'etpN-LCfCvz_906z2BUPn-1920x1200.jpg',
                  },
                },
              },
            },
          },
        },

        {
          id: '67a74edb6365f244c8b6d14d',

          media: {
            id: 2,
            alt: null,
            prefix: 'media',
            updatedAt: '2025-02-08T12:32:42.621Z',
            createdAt: '2025-02-08T12:32:42.621Z',
            url: '/stock1.jpg',
            thumbnailURL: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-300x169.jpg',
            filename: 'Fayy0Ql49FqefU1Rv1Vg1.jpg',
            mimeType: 'image/jpeg',
            filesize: 174350,
            width: 2309,
            height: 1299,
            focalX: 50,
            focalY: 50,

            sizes: {
              thumbnail: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-300x169.jpg',
                width: 300,
                height: 169,
                mimeType: 'image/jpeg',
                filesize: 9560,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-300x169.jpg',
              },

              square: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-500x500.jpg',
                width: 500,
                height: 500,
                mimeType: 'image/jpeg',
                filesize: 29650,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-500x500.jpg',
              },

              small: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-600x338.jpg',
                width: 600,
                height: 338,
                mimeType: 'image/jpeg',
                filesize: 26905,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-600x338.jpg',
              },

              medium: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-900x506.jpg',
                width: 900,
                height: 506,
                mimeType: 'image/jpeg',
                filesize: 48121,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-900x506.jpg',
              },

              large: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-1400x788.jpg',
                width: 1400,
                height: 788,
                mimeType: 'image/jpeg',
                filesize: 87354,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-1400x788.jpg',
              },

              xlarge: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-1920x1080.jpg',
                width: 1920,
                height: 1080,
                mimeType: 'image/jpeg',
                filesize: 133780,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-1920x1080.jpg',
              },
            },
          },
          blockName: null,
          blockType: 'mediaBlock',
        },

        {
          id: '67a74ef36365f244c8b6d14f',
          title: 'Test Feature',
          description: null,
          blockName: null,

          features: [
            {
              id: '67a74efc6365f244c8b6d151',
              title: 'Feature 1',

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
                  ],
                  direction: 'ltr',
                },
              },

              link: {
                type: 'none',
                newTab: null,
                url: null,
              },

              icon: {
                type: 'fa-thin',
                icon: 'cloud',
              },
            },

            {
              id: '67a74f116365f244c8b6d153',
              title: 'Feature 2',

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
                newTab: null,
                url: null,
              },

              icon: {
                type: 'fa-thin',
                icon: 'user',
              },
            },

            {
              id: '67a74f246365f244c8b6d155',
              title: 'Feature 3',

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
                url: null,
              },

              icon: {
                type: 'fa-thin',
                icon: 'space',
              },
            },
          ],
          blockType: 'features',

          theme: {
            settings: {
              theme: 'dark',
              background: 'solid',
            },
          },
        },
        {
          id: '67a74c276365f244c8b6d149',
          blockName: null,

          columns: [
            {
              id: '67a74ea16365f244c8b6d14b',
              size: 'full',

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

          theme: {
            settings: {
              theme: 'dark',
              background: 'image',

              image: {
                id: 1,
                alt: null,
                prefix: 'media',
                updatedAt: '2025-02-08T12:27:55.461Z',
                createdAt: '2025-02-08T12:27:55.461Z',
                url: '/stock1.jpg',
                thumbnailURL: '/stock1.jpg',
                filename: 'stock1.jpg',
                mimeType: 'image/jpeg',
                filesize: 346701,
                width: 2190,
                height: 1369,
                focalX: 50,
                focalY: 50,

                sizes: {
                  thumbnail: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-300x188.jpg',
                    width: 300,
                    height: 188,
                    mimeType: 'image/jpeg',
                    filesize: 15812,
                    filename: 'etpN-LCfCvz_906z2BUPn-300x188.jpg',
                  },

                  square: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-500x500.jpg',
                    width: 500,
                    height: 500,
                    mimeType: 'image/jpeg',
                    filesize: 51438,
                    filename: 'etpN-LCfCvz_906z2BUPn-500x500.jpg',
                  },

                  small: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-600x375.jpg',
                    width: 600,
                    height: 375,
                    mimeType: 'image/jpeg',
                    filesize: 46315,
                    filename: 'etpN-LCfCvz_906z2BUPn-600x375.jpg',
                  },

                  medium: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-900x563.jpg',
                    width: 900,
                    height: 563,
                    mimeType: 'image/jpeg',
                    filesize: 88535,
                    filename: 'etpN-LCfCvz_906z2BUPn-900x563.jpg',
                  },

                  large: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-1400x875.jpg',
                    width: 1400,
                    height: 875,
                    mimeType: 'image/jpeg',
                    filesize: 172764,
                    filename: 'etpN-LCfCvz_906z2BUPn-1400x875.jpg',
                  },

                  xlarge: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-1920x1200.jpg',
                    width: 1920,
                    height: 1200,
                    mimeType: 'image/jpeg',
                    filesize: 279466,
                    filename: 'etpN-LCfCvz_906z2BUPn-1920x1200.jpg',
                  },
                },
              },
            },
          },
        },
        {
          id: '67a7859083ee5e530f094671',
          blockName: null,

          columns: [
            {
              id: '67a7859883ee5e530f094673',
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
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Sed at eros vel lacus varius varius nec id metus. ',
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
                          text: 'Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Duis sed nisl euismod, ullamcorper augue at.',
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
                          text: 'Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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

          theme: {
            settings: {
              theme: 'default',
              background: 'transparent',
              image: null,
              overlay: null,
            },
          },
        },
      ],

      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2025-02-08T12:21:09.440Z',

      links: [],
      slug: 'demo-page-1',
      slugLock: true,
      parent: null,

      breadcrumbs: [
        {
          id: '67a74fd4738d7abda09e2fc2',
          doc: 1,
          url: null,
          label: 'Demo Page 1',
        },
      ],
      updatedAt: '2025-02-08T12:36:36.948Z',
      createdAt: '2025-02-08T12:20:41.149Z',
      _status: 'published',
    },
    layout: 'landscape',
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
    }
  }
}

export const Portrait = {
  args: {
    ...Default.args,
    layout: 'portrait',
  }
}

export const Lanscape = {
  args: {
    ...Default.args,
    layout: 'landscape',
  }
}
