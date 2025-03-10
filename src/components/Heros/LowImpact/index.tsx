import React from 'react'

import type { Page } from '@/payload-types'

import { RichText } from '@/components/Payload/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
      <div className="min-w-full py-10 bg-muted mt-24">
        <div className="container">
          {children || (richText && <RichText content={richText} enableGutter={false} />)}
        </div>
      </div>

  )
}
