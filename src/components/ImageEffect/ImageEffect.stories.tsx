import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ImageEffect } from './ImageEffect'
import BG from '../../../.storybook/public/image-post1.webp'

const meta: Meta<typeof ImageEffect> = {
  title: 'Website Components/ImageEffect',
  component: ImageEffect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    effect: {
      control: 'radio',
      options: ['glow', 'gradient'],
      description: 'Choose the effect applied to the image.',
      defaultValue: 'gradient',
    },
    className: {
      control: 'text',
      description: 'Custom class names for styling the container.',
      defaultValue: '',
    },
  },
}

export default meta

type Story = StoryObj<typeof ImageEffect>

export const Default: Story = {
  args: {
    effect: 'gradient',
    image: { src: BG, alt: 'Image Effect', width: 1000, height: 500 },
  },
  render: (args) => <ImageEffect {...args} />,
}

export const GlowEffect: Story = {
  args: {
    effect: 'glow',
    image: { src: BG, alt: 'Image Effect', width: 1000, height: 500 },
  },
  render: (args) => <ImageEffect {...args} />,
}
