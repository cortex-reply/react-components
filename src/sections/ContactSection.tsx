import Image from 'next/image'
import { ImageProps, blurDataUrl } from '@/common-types'
import { Container } from '@/components/Other/Container'
import {
  SectionHeading,
  type SectionHeadingWithoutStylingProps,
} from '@/components/HeaderFooter/SectionHeading'
// import { BREAKPOINTS } from '@/src/themes/interface'
import { Form } from './form'
// import { cn } from '@/src/utils/shadcn'
import { FaEnvelope, FaPhoneFlip } from 'react-icons/fa6'
// import { FaMapMarkerAlt } from 'react-icons/fa'

export interface ContactSectionProps {
  sectionHeading: SectionHeadingWithoutStylingProps
  image: Omit<ImageProps, 'width' | 'height'>

  contactInfo: {
    sectionHeading: SectionHeadingWithoutStylingProps
    location: string
    mail: string
    phone: string
  }
  locations: {
    title: string
    location: string
    mails: string[]
    phoneNumbers: string[]
    embedUrl: string
  }[]
}

// const addressIconParentClasses = cn(
//   'w-[50px] h-[50px] relative top-1 text-md/[1] rounded-full inline-grid place-items-center text-white bg-primary flex-none',
// )
// const addressItemClasses = cn('flex gap-30px')
// const addressTitleClasses = cn(
//   'text-md font-bold leading-[1.5] mb-1.5 text-accent-900 dark:text-white',
// )

export function ContactSection(contactSectionData: ContactSectionProps) {
  const { sectionHeading, image } = contactSectionData

  return (
    <div className="relative w-full light py-[60px]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 items-center justify-center">
        {/* Image area  */}
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            objectFit="contain"
            sizes={`(min-width: 768px) 30vw, 50vw`}
            // sizes={`(min-width: ${BREAKPOINTS.md}) 60vw, 100vw`}
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        </div>

        <div className="w-full h-full">
          <div className="bg-white p-10">
            <div className="mb-30px">
              <SectionHeading {...sectionHeading} invert />
            </div>
            <Form />
          </div>
        </div>
      </div>
    </div>
  )
}
export function LocationsSection(contactSectionData: ContactSectionProps) {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-3">
            <div>
              <h2 className="text-pretty text-4xl text-primary">Locations</h2>
              <p className="mt-4 text-base/7 text-foreground">
                We have multiple locations across the UK.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              {contactSectionData.locations &&
                contactSectionData.locations.map((location, index) => (
                  <div key={index} className="rounded-2xl p-10 border">
                    <h3 className="text-base/7 text-primary">{location.title}</h3>
                    <address className="mt-3 space-y-1 text-sm/6 not-italic text-foreground">
                      {location.location
                        .split(',')
                        ?.map((line, index) => <p key={index}>{line}</p>)}{' '}
                      {location.mails && (
                        <p className="flex items-center space-x-2">
                          <FaEnvelope className="pr-2 text-primary size-auto" />
                          <span>{location.mails[0]}</span>
                        </p>
                      )}
                      {location.phoneNumbers && location.phoneNumbers.length > 0 && (
                        <p className="flex items-center space-x-2">
                          <FaPhoneFlip className="pr-2 text-primary size-auto" />
                          {location.phoneNumbers[0]}
                        </p>
                      )}
                    </address>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
{
  /* <section className="section-padding-primary">
        <Container>
          <div className="flex flex-col gap-[50px] md:flex-row">
            <div className="md:w-1/2 lg:w-2/3">
              <div className="mb-30px">
                <SectionHeading {...sectionHeading} />
              </div>
              <Form />
            </div>
            <div className="md:w-1/2 lg:w-2/6">
              <div className="mb-30px">
                <SectionHeading {...contactInfo.sectionHeading} />
              </div>
              <ul aria-label="addresses" className="grid gap-5">
                <li className={addressItemClasses}>
                  <span className={addressIconParentClasses}>
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <h3 className={addressTitleClasses}>Address</h3>
                    <address className="not-italic">{contactInfo.location}</address>
                  </div>
                </li>
                <li className={addressItemClasses}>
                  <span className={addressIconParentClasses}>
                    <FaEnvelope />
                  </span>
                  <div>
                    <h3 className={addressTitleClasses}>Email Address</h3>
                    <a href={`mailto:${contactInfo.mail}`}>{contactInfo.mail}</a>
                  </div>
                </li>
                
              </ul>
            </div>
          </div>
        </Container>
      </section> */
}
