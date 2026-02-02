import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { RichText } from '@/components/Payload/RichText'
import { DynamicIcon, type DynamicIconProps, type IconType } from '../Images'
import Image, { type StaticImageData } from 'next/image'
import { getLinkHref } from '@/lib/utils/getLinkHref'

import type { FeaturesBlock as FeaturesBlockProps, Media } from '@/payload-types'
type Section = NonNullable<FeaturesBlockProps['features']>[number]

interface FeatureCardProps extends Section {
  image?: Partial<Media>
  subtitle?: string
  settings?: Section['settings'] & {
    width?: '1/4' | '1/3' | '1/2' | 'full' | 'auto'
    order?: number
  }
  className?: string
  link?: Section['link'] & {
    label: string
  }
  // icon?: React.ReactNode | DynamicIconProps
  // content?: Record<string, any> | string
  // statistic?: string
  title: string
}

//   variant?: 'solid' | 'outline' | 'gradient' | 'radial' | 'light'

//   iconSize?: 'small' | 'large'
//   width?: '1/4' | '1/3' | '1/2' | 'full' | 'auto'
//   order?: number
//   heading: string
//   subheading?: string
//   content?: Record<string, any> | string
//   statistic?: string
//   buttonText?: string
//   buttonHref?: string
// }
function isDynamicIconProps(icon: any): icon is DynamicIconProps {
  return icon && typeof icon === 'object' && 'type' in icon && 'iconName' in icon
}
export function FeatureCard({
  image,
  icon,
  title,
  subtitle,
  content,
  statistic,
  settings,
  link,
  className,
}: FeatureCardProps) {
  const variants = {
    solid: 'bg-accent',
    outline: 'bg-background border border-accent',
    gradient: 'bg-gradient-to-br from-[#A42368] to-[#4A1030]',
    radial: 'bg-gradient-to-br from-[#4A1030] to-[#2D0A1D] relative overflow-hidden',
    light: 'bg-background',
  }
  const sizes = {
    '1/4': 'w-1/4',
    '1/3': 'w-1/3',
    '1/2': 'w-1/2',
    full: 'w-full',
    auto: 'w-full',
  }

  return (
    <a
      href={getLinkHref(link)}
      className={cn(
        'min-w-56 max-w-xl h-full flex flex-col group bg-background',
        image ? 'p-0' : 'p-6 md:p-8',
        settings &&
          !image &&
          variants[
            settings?.card === 'default' ? 'solid' : (settings?.card as keyof typeof variants)
          ],
        image && 'bg-foreground',
        settings && settings?.card === 'outline' ? 'text-gray-900' : 'text-white',
        sizes[settings?.width ?? 'auto'],
        'intersect-once intersect:animate-flip-up opacity-0 intersect:opacity-100 intersect:animate-duration-500',
        settings && `intersect:animate-delay-${settings.order || 0 + 1}00`,
        className,
      )}
    >
      {/* Image Section */}
      {image && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={image.url || '/placeholder.svg'}
            alt={image.alt || 'card header image'}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      {/* Body */}
      <div className={cn(image ? 'p-6 md:p-8' : 'p-0', 'flex flex-col flex-grow')}>
        <div className="flex flex-col flex-grow">
          {subtitle && (
            <div className="text-primary uppercase text-sm font-light mb-4">{subtitle}</div>
          )}

          {/* Header Section */}
          <div className="flex items-start gap-4 mb-4">
            <IconLocation
              icon={{
                type: (icon?.type as IconType) || 'fa-light',
                iconName: icon?.icon || 'no-icon-error',
              }}
              heading={title ?? ''}
              variant={settings?.card === 'default' ? 'solid' : (settings?.card ?? 'solid')}
              iconSize={settings?.iconSize || 'large'}
            />
          </div>

          {/* Content Section */}
          {content && typeof content === 'object' && (
            <RichText
              enableGutter={false}
              content={content}
              enableProse={false}
              className={cn(
                'prose-sm prose-p:text-lg prose-headings:text-xl',
                'space-y-3',
                settings?.card === 'outline' || settings?.card === 'light'
                  ? 'prose-headings:text-foreground prose-p:text-foreground prose-a:text-foreground'
                  : 'prose-headings:text-white prose-p:text-gray-100 prose-a:text-gray-100',
                image && 'prose-headings:text-background prose-p:text-background',
              )}
            />
          )}
          {content && typeof content === 'string' && (
            <div
              className={cn(
                'prose-sm prose-p:text-lg prose-headings:text-xl',
                'space-y-3',
                settings?.card === 'outline' || settings?.card === 'light'
                  ? 'prose text-foreground'
                  : 'prose text-gray-100',
                image && 'prose text-background',
              )}
            >
              {content}
            </div>
          )}
        </div>

        {/* CTA Button */}
        {link && link.url && (
          <div className="mt-6">
            <span className="text-accent font-semibold uppercase text-sm block hover:text-accent/80 transition-colors">
              {link?.label || 'Find out more'}
            </span>
          </div>
        )}
      </div>
    </a>
  )
}

const IconLocation = ({
  icon,
  heading,
  variant,
  iconSize,
  subtitle,
}: {
  icon?: DynamicIconProps
  heading: string
  subtitle?: string
  variant?: 'solid' | 'outline' | 'gradient' | 'radial' | 'light'
  iconSize?: 'small' | 'large'
}) => {
  if (icon && iconSize === 'small' && icon.iconName != 'no-icon-error') {
    return (
      <div className="flex items-start justify-between w-full mb-2">
        <div
          className={cn(
            variant === 'outline' || variant === 'light' ? 'text-primary' : 'text-white',
            iconSize === 'small' ? 'text-2xl' : 'text-3xl',
          )}
        >
          {heading}
        </div>
        {isDynamicIconProps(icon) && (
          <div
            className={cn(
              'rounded-full p-0 transform group-hover:scale-110 transition-transform duration-400',
              variant === 'outline' || variant === 'light' ? 'text-primary' : 'text-white',
              iconSize === 'small' ? '-mr-2 ml-1 mt-1' : '',
            )}
          >
            <DynamicIcon type={icon.type} iconName={icon.iconName} size="2x" />
          </div>
        )}
      </div>
    )
  } else if (icon && icon.iconName != 'no-icon-error') {
    return (
      <div className="flex flex-col gap-4">
        {isDynamicIconProps(icon) && (
          <div
            className={cn(
              'h-12 w-12 mb-3 transform group-hover:scale-110 transition-transform duration-400',
              variant === 'outline' || variant === 'light' ? 'text-accent' : '',
            )}
          >
            <DynamicIcon type={icon.type} iconName={icon.iconName} size="4x" />
          </div>
        )}

        <h3
          className={cn(
            'font-normal',
            variant === 'outline' || variant === 'light'
              ? 'text-2xl text-primary'
              : 'text-3xl text-white',
          )}
        >
          {heading}
        </h3>
      </div>
    )
  } else {
    return (
      <div className="flex items-center gap-4 mb-2">
        <div
          className={cn(
            'font-regular',
            variant === 'outline' || variant === 'light' ? 'text-2xl text-primary' : 'text-3xl',
          )}
        >
          {heading}
        </div>
      </div>
    )
  }
}
