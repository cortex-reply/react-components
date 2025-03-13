import { Container } from '@/components/Other/Container'
import { getStaggeredDelay } from '@/lib/utils/setStaggeredDelay'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'
// import { ServiceCard, ServiceProps } from '@/components/Cards/ServiceCard'
import { FeatureCard } from '../components'
import { ImageProps } from 'next/image'
import { RichText } from '@/components/Payload/RichText'
import { Divide } from 'lucide-react'

export interface ServiceSectionProps {
  services: any[]
  title?: string
  content?: Record<string, any>
  className?: ClassValue
  image?: ImageProps
}

export function ServiceSection({ services, className, title, content }: ServiceSectionProps) {
  const cardsettings = {
    settings: {
      width: 'full' as 'full',
      card: 'light' as 'light',
    },
  }
  return (
    <Container className="py-8">
      <div className={cn('w-full text-left')}>
        {title && <h2 className="text-3xl md:text-5xl text-primary">{title}</h2>}
        <div className="mt-4 text-gray-700 pb-12 ">
          {content && (
            <RichText
              enableGutter={false}
              content={content}
              enableProse={false}
              className={cn(
                'prose prose-headings:text-3xl prose-p:text-2xl prose-headings:text-foreground prose-p:text-foreground',
              )}
            />
          )}
        </div>
      </div>
      {services && services.length > 0 && (
        <div className="-mx-4 flex flex-wrap justify-between gap-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={getStaggeredDelay([200, 400, 600], index)}
              className="w-full h-full md:px-4 md:w-1/2 lg:w-1/3"
            >
              {/* <ServiceCard {...service} /> */}
              <FeatureCard
                {...cardsettings}
                icon={{ type: 'none' }}
                title={service.title}
                image={service.image}
                content={service.content}
                link={service.link}
              />
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}

// image,
//   icon,
//   title,
//   subtitle,
//   content,
//   statistic,
//   settings,
//   link,

//   className,
