import type { StaticImageData } from 'next/image'

import { cn } from '@/lib/utils/cn'
import React from 'react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '@/components/Payload/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const { className, enableGutter = true, imgClassName, media, staticImage } = props

  return (
    <div
      className={cn(
        'h-full',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      <Media
        // imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
        imgClassName={cn('rounded-[0.8rem] max-h-full', imgClassName)}
        className='h-full'
        resource={media}
        src={staticImage}
      />
    </div>
  )
}
