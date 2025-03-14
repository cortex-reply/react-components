import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Blogs } from './Blogs'
import BG from '../../.storybook/public/image-post1.webp'
import { ImageTest, BlocksTest, HeroTest, RichTextTest } from '../tests/payload'
const blogs = [
  {
    title: 'INSIGHT6',
    content: 'Unleashing the Power of AI: Building Foundations for Success',
    link: { label: 'LEARN MORE', url: '#' },
    image: ImageTest.hero,
    name: '1',
  },
  {
    title: 'NEWS5',
    content: 'Business Outcoes of an AI Centre of Excellence',
    link: { label: 'LEARN MORE', url: '#' },
    image: ImageTest.hero,
    name: '2',
  },
  {
    title: 'INSIGHT4',
    content: 'Unleashing the Power of AI: Building Foundations for Success',
    link: { label: 'LEARN MORE', url: '#' },
    image: ImageTest.hero,
    name: '3',
  },
  {
    title: 'NEWS3',
    content: 'Business Outcoes of an AI Centre of Excellence',
    link: { label: 'LEARN MORE', url: '#' },
    image: ImageTest.hero,
    name: '4',
  },
  {
    title: 'INSIGHT2',
    content: 'Unleashing the Power of AI: Building Foundations for Success',
    link: { label: 'LEARN MORE', url: '#' },
    image: ImageTest.hero,
    name: '5',
  },
  {
    title: 'NEWS1',
    content: 'Business Outcoes of an AI Centre of Excellence',
    link: { label: 'LEARN MORE', url: '#' },
    image: ImageTest.hero,
    name: '6',
  },
]

const meta: Meta<typeof Blogs> = {
  title: 'Reusable Blocks/Blogs',
  component: Blogs,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Blogs>

export const Default: Story = {
  render: (args) => <Blogs bgImage={BG} blogs={blogs} />,
}
