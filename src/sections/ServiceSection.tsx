import { Container } from '@/components/Other/Container'
import { getStaggeredDelay } from '@/lib/utils/setStaggeredDelay'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'
// import { ServiceCard, ServiceProps } from '@/components/Cards/ServiceCard'
import { FeatureCard } from '../components'
import { ImageProps } from 'next/image'
import { PageShape } from '@/components/Other/PageShape'
import { Divide } from 'lucide-react'

export interface ServiceSectionProps {
  services: any[]
  className?: ClassValue
  image?: ImageProps
}

export function ServiceSection({ services, className }: ServiceSectionProps) {
  console.log('ServiceSection', services)
  const cardsettings = {
  settings: {
    width: 'full' as 'full',
    card: 'light' as 'light',
  }
  }

  

  return (
      <Container className='py-8'>
        {services && services.length > 0 && (
          <div className="flex flex-wrap justify-center gap-y-8">
            {services.map((service, index) => (
              
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={getStaggeredDelay([200, 400, 600], index)}
                className="w-full px-4 md:w-1/2 lg:w-1/3"
              >
                {/* <ServiceCard {...service} /> */}
                <FeatureCard {...cardsettings} icon={{ type: 'none'}} title={service.title} image={service.image} content={service.content} link={service.link} />
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
