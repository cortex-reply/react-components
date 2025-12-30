import { cn } from '@/lib/utils/cn'
import React, { Fragment } from 'react'
import Image from 'next/image'

import type { Page, Media } from '@/payload-types'

import { CallToActionBlock } from './CallToAction'
import { ContentBlock } from './Content'
import { MediaBlock } from './MediaBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { ReusableContentBlock } from './ReusableContentBlock'
import { CollapsibleBlock } from './CollapsibleArea'

const blockComponents: { [key: string]: React.FC<any> } = {
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  collapsibleArea: CollapsibleBlock,
  imageBlock: MediaBlock,
  features: FeaturesBlock,
  reusableContentBlock: ReusableContentBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  fill?: boolean
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <section id="render-blocks" className={cn(props.fill ? 'h-full w-full' : '')}>
        {blocks.map((block, index) => {
          const { blockType } = block as { blockType: keyof typeof blockComponents }
          const theme = (block as any)?.theme
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (blockType === 'reusableContentBlock') {
              return (
                <Fragment key={index}>
                  <RenderBlocks blocks={(block as any).reusableContent.layout} />
                </Fragment>
              )
            } else if (Block) {
              return (
                <div
                  className={cn(
                    'py-6 relative',
                    props.fill && 'flex h-full items-center justify-center',
                  )}
                  key={index}
                >
                  <Theme block={block} index={index} />
                  <div
                    className={cn(
                      'container h-full relative',
                      theme?.settings?.theme || 'dark',
                      // theme?.settings?.theme === 'dark'
                      //   ? 'dark'
                      //   : theme?.settings?.theme === 'green'
                      //     ? 'green'
                      //     : '',
                    )}
                  >
                    <Block {...block} />
                  </div>
                </div>
              )
            }
          }
          return null
        })}
      </section>
    )
  }

  return null
}

export const Theme: React.FC<{
  block: any
  index: number
}> = (props) => {
  if (!('theme' in props.block)) {
    return <div className={cn('absolute inset-0 w-screen h-full dark bg-background')}></div>
  }

  const theme = (props.block as any)?.theme

  if (theme.settings.background === 'image') {
    const themeSettings = {
      imagePosition: theme.settings.imagePosition || 'left',
      overlay: theme.settings.overlay !== undefined ? theme.settings.overlay : true,
    }
    return (
      <div
        className={cn(
          'absolute inset-0 w-full h-full bg-background',
          theme.settings.theme || 'dark',
          // theme.settings.theme === 'dark'
          //   ? 'dark bg-background'
          //   : theme.settings.theme === 'green'
          //     ? 'green bg-background'
          //     : '',
        )}
      >
        <Image
          src={theme.settings?.image?.url || '/placeholder.svg'}
          alt={theme.settings?.image?.alt || ''}
          fill
          className="object-cover"
          priority
        />
        {theme.settings.overlay && (
          <div
            className="absolute inset-0"
            style={{
              background:
                themeSettings.imagePosition === 'left'
                  ? 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)'
                  : 'linear-gradient(-90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)',
            }}
          />
        )}
      </div>
    )
  }
  return (
    <div
      className={cn(
        'absolute inset-0 w-screen h-full bg-background',
        theme.settings.theme || 'dark',
        // theme.settings.theme === 'dark'
        //   ? 'dark bg-background'
        //   : theme.settings.theme === 'green'
        //     ? 'green bg-background'
        //     : '',
      )}
    ></div>
  )
}

export const RenderBlocksWithShapes: React.FC<{
  blocks: Page['layout'][0][]
  fill?: boolean
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <main id="content-blocks" className={cn(props.fill ? 'h-full w-full' : '')}>
        {blocks.map((block, index) => {
          const { blockType } = block as { blockType: keyof typeof blockComponents }
          const theme = (block as any)?.theme
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (blockType === 'reusableContentBlock') {
              return (
                <Fragment key={index}>
                  <RenderBlocks blocks={(block as any).reusableContent.layout} />
                </Fragment>
              )
            } else if (Block) {
              return (
                // <div
                //   className={cn(
                //     'relative flex w-full',
                //     props.fill && 'h-full items-center justify-center',
                //   )}
                //   key={index}
                // >
                  <ThemeWithShapes block={block} allBlocks={blocks} index={index}>
                    <Block {...block} />
                  </ThemeWithShapes>
                // </div>
              )
            }
          }
          return null
        })}
      </main>
    )
  }

  return null
}

export const ThemeWithShapes: React.FC<{
  block: any
  allBlocks: Page['layout'][0][]
  index: number
  children: React.ReactNode
}> = (props) => {
  if (props.index === 0) { // first block. this is always light
    return (
      <section className='relative flex w-full'>
        <div className={cn('absolute inset-0 w-screen h-full light bg-background')}></div>
        <div className={cn('container h-full relative pt-6 pb-12 min-h-[22em] light bg-background')}>
          {props.children}
        </div>
      </section>
    )
  }

  // for even blocks, use lightmode

  const darkmode = (index: number): string => {
    if (index % 2 === 0) {
      return 'light'
    } else {
      return 'dark'
    }
  }

  const BlockTop: React.FC<{ index: number; allBlocks: Page['layout'][0][] }> = ({
    index,
    allBlocks,
  }) => {
    if (index === 1) {
      // the 2nd block should always have a top shape
      return <DarkTop position="left" />
    }
    if (prevBlockTheme(index, allBlocks) === 'dark' && currentBlockTheme(index, allBlocks) === 'light') {
      return <LightTop position="left" />
    }
    if (prevBlockTheme(index, allBlocks) === 'light' && currentBlockTheme(index, allBlocks) === 'dark') {
      return <DarkTop position="left" />
    }


    // Return null if no valid JSX element is determined
    return null
  }

  const BlockBottom: React.FC<{ index: number; allBlocks: Page['layout'][0][] }> = ({
    index,
    allBlocks,
  }) => {
    // console.log('BlockBottom index:', index, nextBlockTheme(index, allBlocks) , currentBlockTheme(index, allBlocks))
    if (nextBlockTheme(index, allBlocks) === 'light' && currentBlockTheme(index, allBlocks) === 'dark') {
      // console.log('BlockBottom index:', index, 'returning dark bottom')
      // the 2nd block should always have a top shape
      return <LightTop position="left" />
    }
    // Return null if no valid JSX element is determined
    return null
  }


  const prevBlockTheme = (index: number, allBlocks: Page['layout'][0][]): string => {
    if (index === 1) {
      return 'light'
    }
    const prevBlock = allBlocks[index - 1] as any
    if ('theme' in prevBlock) {
      if (prevBlock.theme?.settings?.theme === 'light') {
        return 'light'
      } else {
        return 'dark'
      }    } else {
      return 'dark'
    }
  }
  const nextBlockTheme = (index: number, allBlocks: Page['layout'][0][]): string => {
    if (index === allBlocks.length - 1) { // it's the 2nd to last. the footer is always dark.
      // console.log('nextBlockTheme index:', index, 'returning dark')
      return 'dark'
    }
    if (index === 0) {
      return 'light'
    }
    const nextBlock = allBlocks[index + 1] as any
    if ('theme' in nextBlock) {
      if (nextBlock.theme?.settings?.theme === 'light') {
        return 'light'
      } else {
        return 'dark'
      }
    } else {
      return 'dark'
    }
  }
  const currentBlockTheme = (index: number, allBlocks: Page['layout'][0][]): string => {

    // if (index === 1) {
    //   // console.log('currentBlockTheme index:', index, allBlocks[index]?.theme)
    //   // console.log('currentBlockTheme index:', index, allBlocks.length)
    // }


    if (index === allBlocks.length - 1) { // it's the 2nd to last. the footer is always dark so this should be dark too.
      return 'dark'
    }
    const block = allBlocks[index] as any
    if (!block.theme) {
      return 'dark'
    }
    if (block.theme?.settings?.theme === 'light') {
      return 'light'
    } else {
      return 'dark'
    }
  }


  // console.log('theme', props.block.theme, props.index)
  if (!props.block.theme || !props.block.theme.settings) {
    // this theme needs to be a continuation of the previous theme
    if (prevBlockTheme(props.index, props.allBlocks) === 'dark') {
      /// continue as dark
      // console.log('no theme... index:', props.index, 'continue as dark')
      return (
        <section id={props.block.name || "content-block"} className='relative flex flex-col w-full pt-12'>
          {/* <BlockTop index={props.index} allBlocks={props.allBlocks} /> */}
          <div className={cn('absolute inset-0 w-screen dark bg-background')}></div>
          <div className={cn('container relative', 'dark bg-background py-1')}>
            {props.children}
          </div>
          {/* <BlockBottom index={props.index} allBlocks={props.allBlocks} /> */}
        </section>
      )
    } else {
      // console.log('no theme... index:', props.index, 'new dark section')
      return (
        <section id={props.block.name || "content-block-start"} className='relative flex flex-col w-full'>
          <BlockTop index={props.index} allBlocks={props.allBlocks} />
          <div className={cn('absolute inset-0 w-screen')}></div>
          <div className="bg-black">
            <div className={cn('container relative', 'dark bg-background py-1')}>
              {props.children}
            </div>
            {/* <BlockBottom index={props.index} allBlocks={props.allBlocks} /> */}
          </div>
        </section>
      )
    }
  }

  if (
    !('theme' in props.block) ||
    prevBlockTheme(props.index, props.allBlocks) === currentBlockTheme(props.index, props.allBlocks)
  ) {
    // this theme needs to be a continuation of the previous theme
    // console.log('contiune theme. index:', props.index)
    // console.log('prevBlockTheme:', props.index, prevBlockTheme(props.index, props.allBlocks))
    // console.log('currentBlockTheme:', props.index, currentBlockTheme(props.index, props.allBlocks))
    // console.log('nextBlockTheme:', props.index, nextBlockTheme(props.index, props.allBlocks))
    const theme = currentBlockTheme(props.index, props.allBlocks)
    return (
      <section id={props.block.name || "content-block-continue"} className=' relative flex flex-col w-full pt-20'>
        {/* <BlockTop index={props.index} allBlocks={props.allBlocks} /> */}
        <div className={cn('absolute inset-0 w-screen bg-background', theme)}></div>
        <div className={cn('container relative bg-background py-1', theme, theme ==='light' && 'py-12')}>
          {props.children}
        </div>
        {/* <BlockBottom index={props.index} allBlocks={props.allBlocks} /> */}
      </section>
    )
  }

  if (
    prevBlockTheme(props.index, props.allBlocks) !== currentBlockTheme(props.index, props.allBlocks)
  ) {
    // new theme
    // console.log('new theme. index:', props.index, 'theme:', currentBlockTheme(props.index, props.allBlocks))
    // console.log('prevBlockTheme:', props.index, prevBlockTheme(props.index, props.allBlocks))
    // console.log('currentBlockTheme:', props.index, currentBlockTheme(props.index, props.allBlocks))
    // console.log('nextBlockTheme:', props.index, nextBlockTheme(props.index, props.allBlocks))
    // console.log(props.index, 'content: ', props.block)
    const theme = currentBlockTheme(props.index, props.allBlocks)
    // if (prevBlockTheme(props.index, props.allBlocks) === 'dark') {
    return (
      <section id={props.block.blockName || "content-block-continue"} className='relative flex flex-col w-full'>
        <BlockTop index={props.index} allBlocks={props.allBlocks} />
        <div className={cn('absolute inset-0 w-screen bg-background', theme)}></div>
        <div className={cn('container relative bg-background min-h-[22em] content-center py-1', theme, theme === 'light' && 'py-12')}>
          {props.children}
        </div>
        {/* <BlockBottom index={props.index} allBlocks={props.allBlocks} /> */}
      </section>
    )
  // } else {
  //   return (
  //     <section id={props.block.blockName || "content-block-start"} className='w-full'>
  //       <BlockTop index={props.index} allBlocks={props.allBlocks} />
  //       <div className={cn('absolute inset-0 w-screen bg-background', theme)}></div>
  //       <div className={cn('container relative', 'bg-background', theme)}>
  //         {props.children}
  //       </div>
  //       <BlockBottom index={props.index} allBlocks={props.allBlocks} />
  //     </section>
  //   )
  // }
}


  if (!('theme' in props.block)) {
    // continue the previous theme
    return (
      <div className={cn('container h-full relative', 'dark')}>
        <div className={cn('absolute inset-0 w-screen h-full dark bg-background py-1')}></div>
        {props.children}
      </div>
    )
  }

  const theme = (props.block as any)?.theme

  if (theme.settings.background === 'image') {
    const themeSettings = {
      imagePosition: theme.settings.imagePosition || 'left',
      overlay: theme.settings.overlay !== undefined ? theme.settings.overlay : true,
    }
    return (
      <div
        className={cn(
          'absolute inset-0 w-full h-full bg-background',
          theme.settings.theme || 'dark',
          // theme.settings.theme === 'dark'
          //   ? 'dark bg-background'
          //   : theme.settings.theme === 'green'
          //     ? 'green bg-background'
          //     : '',
        )}
      >
        <Image
          src={theme.settings?.image?.url || '/placeholder.svg'}
          alt={theme.settings?.image?.alt || ''}
          fill
          className="object-cover"
          priority
        />
        {theme.settings.overlay && (
          <div
            className="absolute inset-0"
            style={{
              background:
                themeSettings.imagePosition === 'left'
                  ? 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)'
                  : 'linear-gradient(-90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)',
            }}
          />
        )}
      </div>
    )
  }
  return (
    <div
      className={cn(
        'absolute inset-0 w-screen h-full bg-background',
        theme.settings.theme || 'dark',
        // theme.settings.theme === 'dark'
        //   ? 'dark bg-background'
        //   : theme.settings.theme === 'green'
        //     ? 'green bg-background'
        //     : '',
      )}
    ></div>
  )
}

interface PageShapeProps {
  position?: 'left' | 'right' | 'random'
}
export const DarkTop: React.FC<PageShapeProps> = ({ position }) => {
  return (
    <div className="w-full aspect-[1920/360] z-20 relative -top-[2px] bg-white">
      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="2 2 1920 360"
        preserveAspectRatio="none"
        style={{
          transform: 'rotateX(180deg)',
          position: 'absolute',
          bottom: '-2px',

        }}
        className={cn('w-full block overflow-hidden')}
      >
        <polygon points="0 0 0 135 1255 332 1920 5 1920 0 1920 0 0 0" fill="black" />
      </svg>
    </div>
  )
}


export const LightTop: React.FC<PageShapeProps> = ({ position }) => {

  // return (
  //   <div className="relative bg-white w-full z-20 aspect-[1920/332] overflow-hidden">
  //      <div
  //        className="relative w-full z-20 aspect-[1920/332] text-white bg-black"
  //        style={{
  //         //  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 65% 100%, 0% 85%)',
  //         clipPath: 'polygon(0% 0%, 0% 40.66%, 65.36% 100%, 100% 0%)'
  //       }}
  //      ></div>
  //      </div>
  // )


  return (
<div className="w-full relative z-20 aspect-[1920/332] overflow-hidden ">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 332" // Adjusted viewBox height to 1245 to add 5px at the bottom
          // preserveAspectRatio="xMidYMax meet"
          className={cn('absolute ')}
          style={{ fontSize: 0, float:'left', alignContent: 'flex-end' }}
          // transform={transforms[1]}
        >
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" />
            </mask>
          </defs>
          <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" fill='black'/>
          {/* <rect width="100%" height="100%" fill="white" mask="url(#mask)" /> */}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/* <div className="absolute -bottom-[5px] border-none left-0 w-full h-[6px] z-10 bg-white" /> */}
      </div>)
      }
