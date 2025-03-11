import { ImageProps } from '@/common-types'
import { Container } from '@/components/Other/Container'
import {
  SectionHeading,
  SectionHeadingWithoutStylingProps,
} from '@/components/HeaderFooter/SectionHeading'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface AboutSectionProps {
  images?: {
    pattern: ImageProps
    image1: ImageProps
    image2: ImageProps
    image3: ImageProps
    image4: ImageProps
  }
  sectionHeading: SectionHeadingWithoutStylingProps
  keyPoints?: {
    icon: React.ReactNode
    title: string
  }[]
  description?: string
  className?: string
}

export function AboutSection(aboutSectionData: AboutSectionProps) {
  const { images, sectionHeading, keyPoints, description } = aboutSectionData

  return (
    <>
      {/* <div className="sticky top-0">
       </div> */}
      <section
        id="about-section"
        className={cn(
          ' clip-custom-top-l sticky md:top-0 md:h-screen z-2 flex flex-col items-center justify-center section-padding-primary dark bg-background',
          aboutSectionData.className || '',
        )}
      >
        {/* <Mask className="absolute inset-0" /> */}

        {/* <div className="absolute w-full -top-[1245px]">
        </div> */}

        {/* <section className="section-padding-primary overflow-hidden"> */}
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[.92fr_1fr] 2xl:gap-20">
            {/* Content  */}
            <div className="lg:order-2" data-aos="fade-left" data-aos-delay="200">
              <SectionHeading {...sectionHeading} />
              {keyPoints && keyPoints.length > 0 && (
                <div className="mt-7 grid gap-5 text-accent sm:grid-cols-2 md:mt-10 md:gap-[1.875rem]">
                  {keyPoints.map((keyPoint, index) => (
                    <div
                      key={index}
                      className="group flex min-h-[64px] items-center gap-5 rounded-5 border border-accent px-6 py-2 md:min-h-[85px] md:px-[1.875rem] md:py-3"
                    >
                      <span className="duration flex-none scale-100 transition-transform ease-linear group-hover:scale-90">
                        {keyPoint.icon}
                      </span>
                      <h3 className="text-md font-bold leading-[1.25] md:text-lg">
                        {keyPoint.title}
                      </h3>
                    </div>
                  ))}
                </div>
              )}
              {description && <p className="mt-5 text-primary md:mt-[1.875rem]">{description}</p>}
            </div>

            {/* Images  */}
            {images && (
              <div className="mx-auto text-center">
                <div className="relative mx-auto grid max-w-[580px] grid-cols-2 gap-2.5 overflow-hidden">
                  {/* Image 1  */}
                  <div className="relative flex justify-end overflow-hidden">
                    <div className="relative z-[2] mt-auto" data-aos="fade-up" data-aos-delay="200">
                      {/* <span className="absolute -left-2.5 -top-2.5 -z-1 h-full w-full rounded-tl-[60px] bg-accent"></span> */}
                      <div className="relative z-[4] overflow-hidden">
                        <Image
                          src={images.image1.src}
                          alt={images.image1.alt}
                          width={images.image1.width}
                          height={images.image1.height}
                          className="rounded-tl-[60px] object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Pattern  */}
                    {/* <Image
                    src={images.pattern.src}
                    width={383}
                    height={246}
                    alt="pattern-background"
                    className="absolute bottom-[-55%] left-[42px] z-1  block object-cover"
                    data-aos="zoom-in"
                    data-aos-delay="250"
                  /> */}
                  </div>

                  {/* Image 2  */}
                  <div className="flex overflow-hidden">
                    <Image
                      src={images.image2.src}
                      alt={images.image2.alt}
                      width={images.image2.width}
                      height={images.image2.height}
                      className="rounded-[80px_10px] object-cover"
                      data-aos="fade-right"
                      data-aos-delay="300"
                    />
                  </div>

                  {/* Image 3  */}
                  <div className="ml-auto flex max-w-[250px] justify-end overflow-hidden">
                    <Image
                      src={images.image3.src}
                      alt={images.image4.alt}
                      width={images.image3.width}
                      height={images.image3.height}
                      className="rounded-[50px_10px] object-cover"
                      data-aos="fade-left"
                      data-aos-delay="350"
                    />
                  </div>

                  {/* Image 4 */}
                  <div className="overflow-hidden">
                    <Image
                      src={images.image4.src}
                      alt={images.image4.alt}
                      width={images.image4.width}
                      height={images.image4.height}
                      className="rounded-10 rounded-br-[80px] object-cover"
                      data-aos="fade-right"
                      data-aos-delay="400"
                    />
                  </div>

                  <div className="absolute left-1/2 top-1/2 z-[4] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                    <div data-aos="zoom-in" data-aos-delay="450">
                      <span className="grid h-[100px] w-[100px]  place-items-center rounded-full border-[12px] border-white bg-accent text-[30px] text-white">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 27 27"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M26.8125 13.8672C26.8125 14.9922 25.875 15.9297 24.8125 15.9297H15.8125V24.9297C15.8125 25.9922 14.875 26.8672 13.8125 26.8672C12.6875 26.8672 11.8125 25.9922 11.8125 24.9297V15.9297H2.8125C1.6875 15.9297 0.8125 14.9922 0.8125 13.8672C0.8125 12.8047 1.6875 11.9297 2.8125 11.9297H11.8125V2.92969C11.8125 1.80469 12.6875 0.867188 13.8125 0.867188C14.875 0.867188 15.8125 1.80469 15.8125 2.92969V11.9297H24.8125C25.875 11.8672 26.8125 12.8047 26.8125 13.8672Z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
      {/* <style jsx>{`
  .clip-custom-bottom {
  clip-path: polygon(0% 0%, 0% 16.2%, 0% 83.2%, 0% 87.3%, 65.4% 99.6%, 100% 72.9%, 100% 16.2%, 100% 0%);
}
  .clip-custom-top-r {
  clip-path: polygon(0% 100%, 0% 83.8%, 0% 16.8%, 0% 12.7%, 65.4% 0.4%, 100% 27.1%, 100% 83.8%, 100% 100%);
}
  .clip-custom-top-l {
  clip-path: polygon(100% 100%, 100% 83.8%, 100% 16.8%, 100% 12.7%, 34.6% 0.4%, 0% 27.1%, 0% 83.8%, 0% 100%);
}
`}</style> */}
    </>
  )
}
const Mask = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1245"
      className={cn(className, 'absolute w-full h-full')}
    >
      <defs>
        <mask id="mask">
          {/* The entire section is black, meaning it's hidden */}
          <rect width="100%" height="100%" fill="black" />
          {/* The polygon shape is white, meaning it's visible (transparent) */}
          <polygon
            fill="white"
            points="0 0 0 201.561092 0 1036.200679 0 1087.625789 1255.099121 1240.909908 1920 908.450984 1920 201.561092 1920 0 0 0"
          />
        </mask>
      </defs>

      {/* Apply the mask to a black rectangle to create transparency */}
      <rect width="100%" height="100%" fill="black" mask="url(#mask)" />
    </svg>
  )
}
