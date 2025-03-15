import { cn } from '@/lib/utils'
import { AnimatePresence } from 'framer-motion'
import Slider from 'react-slick'
import Image from 'next/image'
import { Button, Container } from '../components'
import Link from 'next/link'
import { useState } from 'react'

export const CaseStudies: React.FC<{
  caseStudies?: { title: string; content: string; link: string; name: string; image: string }[]
}> = ({ caseStudies = [] }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
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
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next)
      console.log(`Current slide: ${current}, Next slide: ${next}`)
    },
  }
  return (
    <AnimatePresence>
      {CaseStudies && CaseStudies?.length > 0 && (
        <div>
          <Image
            src={caseStudies[currentSlide]?.image}
            alt="case-studies-bg "
            sizes="100vw"
            fill
            className="bg-cover w-full min-h-[100vh] h-fit"
          />
          <div className="mt-auto mb-auto">
            <Slider {...settings}>
              {caseStudies?.map(({ name, title, content, link }) => (
                <div
                  key={`case-study-${name}`}
                  className=" w-full align-center h-full mx-auto my-auto text-center md:pt-16 pt-12"
                >
                  <h3 className="w-full md:max-w-[65%] mx-auto text-center text-2xl sm:text-3xl md:text-5xl text-primary px-6 sm:px-8">
                    {title}
                  </h3>
                  <h3 className="py-2 md:py-8 w-full md:max-w-[85%] mx-auto text-center text-xl sm:text-2xl md:text-4xl text-destructive-foreground px-4 sm:px-8">
                    {content}
                  </h3>
                  <Link href={link} className=" w-full text-center">
                    <Button
                      variant="outline"
                      className="rounded-full border-accent bg-transparent text-destructive-foreground p-4 hover:bg-accent "
                    >
                      READ THE FULL CASE STUDY
                    </Button>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
