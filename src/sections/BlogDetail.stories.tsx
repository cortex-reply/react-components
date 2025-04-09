import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { BlogDetail, type CategoryListProps } from './BlogDetail'
import { type BlogProps } from './BlogListSection'

export default {
  title: 'Website Components/BlogDetail',
  component: BlogDetail,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
    docs: {
      description: {
        component:
          'A card component that displays a service with an icon, title, description, and a link.',
      },
    },
  },
  argTypes: {
    icon: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    slug: { control: 'text' },
  },
  decorators: [
    (Story) => (
      // <div className="bg-white dark:bg-gray-900 p-4">
      <Story />
      // </div>
    ),
  ],
} as Meta

const Template = (args: { page: BlogProps[]; categoryList: CategoryListProps }) => (
  <BlogDetail {...args} />
)

export const Default = Template.bind({})
Default.args = {
  categoryList: {
    title: 'Categories',
    links: [
      { label: 'Category 1', href: 1, link: 'https://www.google.com' },
      { label: 'Category 2', href: 2, link: 'https://www.google.com' },
      { label: 'Category 3', href: 3, link: 'https://www.google.com' },
    ],
  },
  page: {
    id: 2,
    title: 'Test Post 2',
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
    relatedPosts: [],
    categories: [
      {
        id: 1,
        title: 'Test Category 1',
        slug: 'test-category-1',
        updatedAt: '2025-01-06T20:16:54.416Z',
        createdAt: '2025-01-06T20:16:54.416Z',
        _status: 'published',
      },
    ],
    meta: { title: 'Test Post 1', image: null, description: null },
    publishedAt: '2025-01-06T20:17:25.595Z',
    authors: [
      {
        id: 1,
        name: 'Rob',
        jobRole: null,
        profilePicture: {
          id: 1,
          name: 'Rob Ellison',
          src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
          alt: 'Rob Ellison',
          prefix: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
          sizes: {
            square: {
              url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
            },
          },
        },
        workHistory: [],
        certifications: [],
        areasOfExpertise: [],
        dateOfBirth: null,
        joinDate: null,
        role: 'admin',
        sub: null,
        updatedAt: '2025-01-06T20:16:54.416Z',
        createdAt: '2025-01-06T20:16:54.416Z',
        enableAPIKey: null,
        apiKey: null,
        email: 'rob@sdsdd.com',
        loginAttempts: 0,
        linkedIn: 'https://www.linkedin.com/in/robellison/',
      },
      {
        id: 2,
        name: 'Rob Ellison',
        jobRole: 'Software Engineer',
        profilePicture: {
          id: 1,
          name: 'Rob Ellison',
          src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
          alt: 'Rob Ellison',
          sizes: {
            square: {
              url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
            },
          },
          prefix: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
          updatedAt: '2025-01-06T20:16:54.416Z',
          createdAt: '2025-01-06T20:16:54.416Z',
        },
        linkedIn: 'https://www.linkedin.com/in/robellison/',
      },
    ],
    populatedAuthors: [{ id: 1, name: 'Rob Ellison' }],
    publishedToWebsite: false,
    slug: 'test-post-2',
    slugLock: true,
    updatedAt: '2025-01-06T20:17:31.465Z',
    createdAt: '2025-01-06T20:17:27.818Z',
    _status: 'published',
  },
}

export const LoadsOfBlogs = Template.bind({})
LoadsOfBlogs.args = {
  ...Default.args,
  pages: { totalPages: 40, page: 20 },
}

export const NoCategories = Template.bind({})
NoCategories.args = {
  ...Default.args,
  page: {
    ...Default.args.page,
    categoryList: {
      title: 'Categories',
    },
  },
  categoryList: null,
}

export const NoAuthorImage = Template.bind({})
NoAuthorImage.args = {
  ...Default.args,
  page: {
    ...Default.args.page,
    authors: [
      {
        id: 1,
        name: 'Dave Brown',
        jobRole: null,
        profilePicture: null,
        workHistory: [],
        certifications: [],
        areasOfExpertise: [],
        dateOfBirth: null,
        joinDate: null,
        role: 'admin',
        sub: null,
        updatedAt: '2025-01-06T20:16:54.416Z',
        createdAt: '2025-01-06T20:16:54.416Z',
        enableAPIKey: null,
        apiKey: null,
        email: '',
      },
    ],
    populatedAuthors: [{ id: 1, name: 'Dave Brown' }],
  },
}
