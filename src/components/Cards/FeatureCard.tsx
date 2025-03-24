import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { RichText } from '@/components/Payload/RichText'
import { DynamicIcon, type DynamicIconProps, type IconType } from '../Images'
import Image, { type StaticImageData } from 'next/image'

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
  // variant = 'outline',
  className,
  // icon,
  // iconSize = 'large',
  // width = 'auto',
  // order = 0,
  // heading,
  // subheading,
  // content,
  // statistic,
  // buttonText,
  // buttonHref,
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

  //console.log('image', image)

  return (
    <a
      href={link?.url || '#'}
      className={cn(
        'min-w-56 max-w-xl h-full flex flex-col group',
        image ? 'p-0 pb-4' : 'p-8',
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
        <div className="relative h-1/2 lg:h-2/3 w-full mb-0 pt-2">
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
      <div
        className={cn(
          image ? 'p-4 md:p-1 md:px-8' : 'p-0 md:p-0',
          'flex h-2/5 md:max-h-1/2 flex-col flex-grow',
        )}
      >
        {subtitle && <div className="mb-4 text-primary uppercase font-light">{subtitle}</div>}

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-2 md:mb-0">
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

        {/* Statistic Display */}
        {statistic && (
          <div className="mb-6">
            <div
              className={cn(
                'text-4xl text-wrap font-bold leading-none overflow-hidden',
                settings?.card === 'outline' || settings?.card === 'light'
                  ? 'text-brand-green'
                  : 'text-white',
              )}
            >
              {statistic}
            </div>
          </div>
        )}

        {/* Content Section */}
        {content && typeof content === 'object' && (
          <RichText
            enableGutter={false}
            content={content}
            enableProse={false}
            className={cn(
              'space-y-6',
              settings?.card === 'outline' || settings?.card === 'light'
                ? 'prose prose-headings:text-foreground prose-p:text-foreground prose-a:text-foreground'
                : 'prose prose-headings:text-white prose-p:text-gray-100 prose-a:text-gray-100',
              image && 'prose prose-headings:text-background prose-p:text-background',
            )}
          />
        )}
        {content && typeof content === 'string' && (
          <div
            className={cn(
              'space-y-6',
              settings?.card === 'outline' || settings?.card === 'light'
                ? 'prose text-foreground'
                : 'prose text-gray-100',
              image && 'prose text-background',
            )}
          >
            {content}
          </div>
        )}

        {/* Decorative Background for CTA variant */}
        {settings?.card === 'radial' && (
          <div
            className="absolute bottom-0 right-0 w-2/3 h-2/3 blur-3xl rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(164,35,104,0.3) 0%, rgba(74,16,48,0) 70%)',
            }}
          />
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
