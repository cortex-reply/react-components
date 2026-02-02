import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'

import { cn } from '@/lib/utils/cn'
import React from 'react'
import { RichText } from '@/components/Payload/RichText'
import { getLinkHref } from '@/lib/utils/getLinkHref'
import type { Page } from '@/payload-types'
import { ContentCard, FeatureCard } from '../Cards'
// type Props = {
//   className?: string
// } & FeaturesBlockProps
import { type DynamicIconProps } from '../Images'

type Props = {
  title?: string | null
  description?: Record<string, any> | string | null
  features?: Section[] | null
  id?: string | null
  nested?: boolean
}

type Section = NonNullable<FeaturesBlockProps['features']>[number]

export const FeaturesBlock: React.FC<Props> = ({ title, description, features, id, nested=false }) => {
  // export function FeatureBlock({ title, features, theme = 'dark' }: FeatureBlockProps) {
  // return null

  return (
    <section className={cn(!nested ? '' : 'w-full', '')}>
      <div className='prose prose:max-w-none'>
      {title && (
        <h2 className="mb-6 mt-0 text-primary" id={id || ''}>
          {title}
        </h2>
      )}
      {description && typeof description === 'string' && (
        <p className="mb-5 text-foreground">{description}</p>
      )}
      {description && typeof description === 'object' && (
        <div className="mb-5 text-foreground">
          <RichText content={description} enableGutter={false} />
        </div>
      )}
</ div>
      <div className={`grid gap-6 mt-6 md:grid-cols-${features ? features.length > 2 ? 2 : features.length : 1} lg:grid-cols-${features ? features.length > 3 ? 3 : features.length : 1}`}>
      {/* <div className={`grid gap-8 mt-10 grid-cols-${features ? features.length : 1}`}> */}
        {features &&
          features.map((section, index) => {
            // card?: ('outline' | 'solid' | 'gradient' | 'radial' | 'none') | null;
       
              const icon = () => {
                if (section.icon && 'type' in section.icon && section.icon.type !== 'none') {
                  return {
                    type: section.icon.type,
                    icon: section.icon.icon,
                  } as unknown as DynamicIconProps
                }
                return undefined
              }
              return (
                <FeatureCard
                  key={index}
                  title={section.title || ''}
                  // subtitle={section.subtitle || ''}
                  content={section.content || undefined}
                  statistic={section.statistic || undefined}
                  settings={{
                    ...section.settings,
                    width: 'auto',
                    order: index,
                  }}
                  link={section.link ? { ...section.link, label: 'Learn more' } : undefined}
                  icon={((icon() as unknown) as { type: "none" | "fa-kit" | "fa-light" | "fa-thin" | "fa-brands"; icon?: string | null }) ?? { type: 'none', icon: null }}
                />
                // <ContentCard
                //   key={index}
                //   variant={
                //     section.settings?.card === 'default' ? 'light' : section.settings?.card || 'outline'
                //   }
                //   icon={icon() || undefined}
                //   iconSize={section.settings?.iconSize || 'large'}
                //   width='auto'
                //   order={index}
                //   heading={section.title || ''}
                //   content={section.content || undefined}
                //   statistic={section.statistic || undefined}
                //   buttonText={section.link?.url ? 'Find out more' : undefined}
                //   buttonHref={section.link?.url || undefined}
                // />
              )
            
            // const Icon = <div><i className=`${section.icon.type} ${section.icon.icon}`></i></div>
          })}
      </div>
    </section>
  )
}

{
  /* <Icon 
                className={cn(
                  'h-12 w-12',
                  theme === 'dark' ? 'text-pink-500' : 'text-pink-600'
                )} 
              /> */
}

const IconFeature = ({ section, index }: { section: Section; index: number }) => {
  if (!section) return null
  const content = (
    <div key={index} className="flex flex-col gap-4">
      {section.icon && (
        <div className="text-accent h-12 w-12 mb-3 transform group-hover:scale-110 transition-transform duration-400">
          <i className={`${section.icon.type} fa-${section.icon.icon} fa-4x`}></i>
        </div>
      )}
      <h3 className="text-2xl group-hover:text-accent transition-colors duration-400">
        {section.title}
      </h3>
      {/* Statistic Display */}
      {section.statistic && (
        <div className="mb-6">
          <div className="text-4xl text-wrap font-bold leading-none overflow-hidden text-foreground">{section.statistic}</div>
        </div>
      )}
      {section.content && typeof section.content != 'object' && (
        <div className="text-lg opacity-80" dangerouslySetInnerHTML={{ __html: section.content }} />
      )}
      {section.content && typeof section.content === 'object' && (
        <div className="text-lg opacity-80">
          <RichText content={section.content} enableGutter={false} />
        </div>
      )}
    </div>
  )
  return section.link ? (
    <a
      href={getLinkHref(section.link)}
      key={index}
      className="no-underline group"
    >
      {content}
    </a>
  ) : (
    content
  )
}
