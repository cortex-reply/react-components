import { cn } from '@/lib/utils'
import { RichText } from '@/components/Payload/RichText'
import { ClassValue } from 'clsx'

type Alignment = 'start' | 'center' | 'end'

export interface SectionHeadingProps {
  subtitle?: string
  title: string
  description?: string
  alignment?: Alignment
  hasBottomSpacing?: boolean
  invert?: boolean
  className?: ClassValue
}

export type SectionHeadingWithoutStylingProps = Omit<
  SectionHeadingProps,
  'alignment' | 'hasBottomSpacing'
>

/**
 * This component renders a text section with `subtitle`, `title`,
 * and `description`. It has styling options for alignment
 * @param SectionHeadingProps
 * @returns JSX.Element
 */
export function SectionHeading({
  subtitle,
  title,
  description,
  alignment = 'start',
  hasBottomSpacing = false,
  className,
  invert = false,
}: SectionHeadingProps) {
  const wrapperClasses = cn(
    alignment === 'start' && 'text-left',
    alignment === 'center' && 'text-center',
    alignment === 'end' && 'text-right',
    { 'mb-10 md:mb-[3.75rem]': hasBottomSpacing },
    className,
  )

  return (
    <div className={wrapperClasses}>
      {subtitle && (
        <span className={'mb-[.625rem] block text-semibold uppercase text-accent md:text-md'}>
          {subtitle}
        </span>
      )}
      <h2 className={cn('text-primary text-2xl md:text-4xl')}>{title}</h2>
      {/* If description is an object, this is Rich Text. If it is a string, it is plain text */}
      {typeof description === 'string'
        ? description && <p className={'mt-5 whitespace-pre-line text-foreground'}>{description}</p>
        : description && (
            // <p className={'mt-5 whitespace-pre-line'}>
            <RichText
              content={description}
              enableGutter={false}
              className="prose-headings:text-accent prose-p:text-primary"
            />
            // </p>
          )}
    </div>
  )
}
