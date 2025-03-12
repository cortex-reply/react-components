import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CaseStudies } from './CaseStudies'
import Case_Studies_BG from '../images/case-studies/Case-Studies-bg.png'

const caseStudies = [
  {
    title: 'Helping our clients harness the power of AI to drive operational excellence.',
    content:
      'The Cortex team consistently delivered and provided valuable input into shaping and implementing the ways of working and the delivery',
    link: '#',
    name: 'case-study-1',
  },
  {
    title: 'Helping our clients harness the power of AI to drive operational excellence.',
    content:
      'The Cortex team consistently delivered and provided valuable input into shaping and implementing the ways of working and the delivery',
    link: '#',
    name: 'case-study-2',
  },
  {
    title: 'Helping our clients harness the power of AI to drive operational excellence.',
    content:
      'The Cortex team consistently delivered and provided valuable input into shaping and implementing the ways of working and the delivery',
    link: '#',
    name: 'case-study-3',
  },
]

const meta: Meta<typeof CaseStudies> = {
  title: 'Reusable Blocks/CaseStudies',
  component: CaseStudies,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof CaseStudies>

export const Default: Story = {
  render: (args) => <CaseStudies bgImage={Case_Studies_BG} caseStudies={caseStudies} />,
}
