import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { CollapsibleBlock } from './CollapsibleArea'

const meta: Meta<typeof CollapsibleBlock> = {
  title: 'Reusable Blocks/CollapsibleArea',
  component: CollapsibleBlock,
}

export default meta
type Story = StoryObj<typeof CollapsibleBlock>

const Template: Story = (args) => <CollapsibleBlock {...args} />

export const Default: Story = Template.bind({})
Default.args = {
  title: 'Collapsible Area',
  richText: {
    root: {
      children: [
        {
          type: 'text',
          text: 'This is a regular text.',
        },
        {
          type: 'text',
          text: 'This is bold text.',
          format: 1, // IS_BOLD
        },
      ],
    },
  },
}

export const longTitle: Story = {
  args: {
    title:
      'This is a long title that will wrap to the next line providing that the text is really long and does not fit in the available space. More text will be added to make sure that the title wraps to the next line.',
    richText: {
      root: {
        children: [
          {
            type: 'text',
            text: 'This is a regular text.',
          },
          {
            type: 'text',
            text: 'This is bold text.',
            format: 1, // IS_BOLD
          },
        ],
      },
    },
  },
}

export const longTextArea: Story = {
  args: {
    title: 'Long text area',
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
  },
}
