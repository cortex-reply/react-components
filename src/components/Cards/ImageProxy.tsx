'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog'
import { X } from 'lucide-react' // Using Lucide Icons as a replacement for MUI icons
import NextImage from 'next/image'
import path from 'path'
import React, { useState } from 'react'

type Menu ={
  component: string
  collection: string | null
  scope?: string
}

type LinkedItem ={
  repo: string
  owner: string
  branch: string
  path: string
}

type ContentItem ={
  source: string
  repo: string
  owner: string
  branch: string
  path: string
  reference: string
  icon?: React.ComponentType<React.ComponentProps<'svg'>> | React.JSX.Element
  collections?: string[]
  menu?: Menu
  file?: string
  linked?: LinkedItem
}

function isExternalUrl(url: string) {
  return url.startsWith('http')
}

function getAPIUrl(src: string, baseContext: string) {
  let url = src
   if (isExternalUrl(src)) {
    url = src
  } else {
    let newSrc = src.replace('./', '')

    if (newSrc.startsWith('/')) {
      newSrc = newSrc.slice(1)
    }

    url = baseContext + '/' + newSrc
  }
  return url
}

function ImageComponent({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)
  const [zoomable, setZoomable] = useState(false)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const handleClickOpen = () => {
    if (zoomable) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleImageLoaded = (event: any) => {
    const { naturalWidth, naturalHeight } = event.target
    setImageSize({ width: naturalWidth, height: naturalHeight })
    setZoomable(naturalWidth > 300 || naturalHeight > 300)
  }

  return (
    <>
      <div
        className={`relative mx-auto my-4 flex justify-center items-center cursor-pointer ${
          imageSize.height > 300 ? 'h-[300px]' : `h-[${imageSize.height}px]`
        }`}
        onClick={handleClickOpen}
      >
        <NextImage
          sizes="100vw"
          height={imageSize.height}
          width={imageSize.width}
          src={src}
          alt={alt || ''}
          onLoad={handleImageLoaded}
          unoptimized
          className="object-contain max-w-full max-h-full"
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col items-center justify-center">
          <DialogHeader className="flex w-full justify-end">
            <DialogTitle className="hidden">{alt}</DialogTitle>
            <DialogClose />
          </DialogHeader>

          <div className="flex items-center justify-center">
            <NextImage
              height={imageSize.height}
              width={imageSize.width}
              src={src}
              alt={alt || ''}
              unoptimized
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function ImageProxy({ props, baseContext }: { props: any; baseContext: string }) {
  let { src } = props

  src = getAPIUrl(src, baseContext)

  return <ImageComponent src={src} alt={props.alt} />
}
