import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SvgGradient } from './SvgGradient'
import BG from '../../../.storybook/public/image-post1.webp'

const meta: Meta<typeof SvgGradient> = {
  title: 'Website Components/SvgGradient',
  component: SvgGradient,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof SvgGradient>

export const Default: Story = {
  render: (args) => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SvgGradient gradientId="customGradient" />
      <path d="M12 2L2 22h20L12 2z" fill="url(#customGradient)" />
    </svg>
  ),
}
