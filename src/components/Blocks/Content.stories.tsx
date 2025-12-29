import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ContentBlock } from './Content'
import { BlocksTest } from '../../tests/payload'

const meta: Meta<typeof ContentBlock> = {
  title: 'Reusable Blocks/ContentBlock',
  component: ContentBlock,
}

export default meta
type Story = StoryObj<typeof ContentBlock>

export const Default: Story = {
  args: {
    ...BlocksTest.content.halfWithEmbeddedImage,
  },
}

export const Media: Story = {
  args: {
    ...BlocksTest.content.media,
  },
}

export const ThreeColumns: Story = {
  args: {
    ...BlocksTest.content.oneThirdWithImageTheme3Collumns,
  },
}

export const HeaderAndThreeColumns: Story = {
  args: {
    ...BlocksTest.content.headerAndTheme3Collumns,
  },
}

export const BoxesWithThreeColumns: Story = {
  args: {
    ...BlocksTest.content.boxesWithThreeColumns,
  },
}

export const BoxesWithImage: Story = {
  args: {
    ...Default.args,
    theme: {
      ...Default.args.theme,
      settings: {
        ...Default.args.theme?.settings,
        box: 'line',
      },
    },
  },
}

export const Features: Story = {
  args: {
    ...BlocksTest.content.halfWithFeature,
  },
}

export const FullWidthCollapsable: Story = {
  args: {
    ...BlocksTest.content.fullWidthCollapsable,
    theme: {
      ...Default.args.theme,
      settings: {
        ...Default.args.theme?.settings,
        box: 'collapsable',
      },
    },
  },
}

export const HalfWidthCollapsable: Story = {
  args: {
    ...BlocksTest.content.halfWidthCollapsable,
    theme: {
      ...Default.args.theme,
      settings: {
        ...Default.args.theme?.settings,
        box: 'collapsable',
      },
    },
  },
}

export const Test: Story = {
  args: {
    id: '681a4999a2fd5620877e41a0',
    blockName: null,

    columns: [
      {
        id: '681a499ca2fd5620877e41a2',
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
                    text: 'image below',
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
                type: 'block',

                fields: {
                  id: '681a49b9a0eff783489b8eea',

                  media: {
                    id: 1,
                    alt: 'Logo',
                    updatedAt: '2025-05-06T17:41:52.026Z',
                    createdAt: '2025-05-06T17:41:51.884Z',
                    url: '/api/images/file/aWkuXsguxANsbGKAUk7Dc.png',
                    thumbnailURL: '/api/images/file/aWkuXsguxANsbGKAUk7Dc-300x292.png',
                    filename: 'aWkuXsguxANsbGKAUk7Dc.png',
                    mimeType: 'image/png',
                    filesize: 14892,
                    width: 690,
                    height: 672,
                    focalX: 50,
                    focalY: 50,

                    sizes: {
                      thumbnail: {
                        url: '/api/images/file/aWkuXsguxANsbGKAUk7Dc-300x292.png',
                        width: 300,
                        height: 292,
                        mimeType: 'image/png',
                        filesize: 7250,
                        filename: 'aWkuXsguxANsbGKAUk7Dc-300x292.png',
                      },

                      square: {
                        url: '/api/images/file/aWkuXsguxANsbGKAUk7Dc-500x500.png',
                        width: 500,
                        height: 500,
                        mimeType: 'image/png',
                        filesize: 14930,
                        filename: 'aWkuXsguxANsbGKAUk7Dc-500x500.png',
                      },

                      small: {
                        url: '/api/images/file/aWkuXsguxANsbGKAUk7Dc-600x584.png',
                        width: 600,
                        height: 584,
                        mimeType: 'image/png',
                        filesize: 19090,
                        filename: 'aWkuXsguxANsbGKAUk7Dc-600x584.png',
                      },

                      medium: {
                        url: null,
                        width: null,
                        height: null,
                        mimeType: null,
                        filesize: null,
                        filename: null,
                      },

                      large: {
                        url: null,
                        width: null,
                        height: null,
                        mimeType: null,
                        filesize: null,
                        filename: null,
                      },

                      xlarge: {
                        url: null,
                        width: null,
                        height: null,
                        mimeType: null,
                        filesize: null,
                        filename: null,
                      },
                    },
                  },

                  theme: {
                    settings: {
                      theme: 'default',
                      background: 'transparent',
                    },
                  },
                  blockName: '',
                  blockType: 'imageBlock',
                },
                format: '',
                version: 2,
              },

              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'image above',
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
          type: 'none',
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
        box: 'none',
      },
    },
  },
}
