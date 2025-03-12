import { cn } from '@/lib/utils'
import { AnimatePresence } from 'framer-motion'
import Slider from 'react-slick'
import Image from 'next/image'
import { Container } from '../components'

export const CaseStudies: React.FC<{
  bgImage: string
  caseStudies?: { title: string; content: string; link: string; name: string }[]
}> = ({ bgImage, caseStudies = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <></>,
    prevArrow: <></>,
  }
  return (
    <AnimatePresence>
      {CaseStudies && CaseStudies?.length > 0 && (
        <div>
          <Image
            src={bgImage}
            alt="case-studies-bg "
            sizes="100vw"
            fill
            className="bg-cover w-full"
          />
          <div className="mt-auto mb-auto">
            <Slider {...settings}>
              {caseStudies?.map(({ name, title, content, link }) => (
                <div key={`case-study-${name}`} className="flex flex-col gap-16 w-full ">
                  <h2 className="w-full text-center text-2xl md:text-5xl text-primary text-center max-w-1/2">
                    {title}
                  </h2>
                  <h3 className="text-center text-xl md:text-4xl text-destructive-foreground text-center w-full max-w-3/4">
                    {content}
                  </h3>
                  <div className="flex justify-center"></div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
