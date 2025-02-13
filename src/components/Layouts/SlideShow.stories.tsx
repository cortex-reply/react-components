'use client'
import React from 'react'
import { SlideShow } from './SlideShow'
import type { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof SlideShow> = {
  title: 'Layouts/SlideShow',
  component: SlideShow,
  tags: ['autodocs'],
  argTypes: {
    // color: {
    //   options: ['primary', 'secondary', 'tertiary', 'quaternary', 'highlight', 'accent', 'muted', 'paper'],
    //   control: { type: 'select' },
    // }
  },
}
export default meta

type Story = StoryObj<typeof SlideShow>

export const Primary: Story = {
  args: {
    blocks: [
      { id: 'section1', title: 'Section 1', color: 'bg-red-500' },
      { id: 'section2', title: 'Section 2', color: 'bg-blue-500' },
      { id: 'section3', title: 'Section 3', color: 'bg-green-500' },
      { id: 'section4', title: 'Section 4', color: 'bg-yellow-500' },
    ],
  },
}
