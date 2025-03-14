import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ImageEffect } from './ImageEffect'
import BG from '../../../.storybook/public/image-post1.webp'

const meta: Meta<typeof ImageEffect> = {
  title: 'Website Components/ImageEffect',
  component: ImageEffect,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof ImageEffect>

export const Default: Story = {
  render: (args) => (
    <ImageEffect
      effect="gradient"
      image={{ src: BG, alt: 'Image Effect', width: 1000, height: 500 }}
    />
  ),
}

export const GlowEffect: Story = {
  render: (args) => <ImageEffect image={{ src: BG, alt: 'Image Effect' }} effect="glow" />,
}
