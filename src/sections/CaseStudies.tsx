'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components'

export const CaseStudies: React.FC<{
  caseStudies?: { title: string; content: string; link: string; name: string; image: string }[]
}> = ({ caseStudies = [] }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef) // Animation triggers when 20% visible

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
    },
  }

  return (
    <div ref={sectionRef} className="h-[100dvh] w-full relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {caseStudies.map((study, index) => (
          <Image
            key={`bg-${index}`}
            src={study?.image}
            alt="case-studies-bg"
            fill
            sizes="100dvw"
            className={`object-cover w-full h-full absolute transition-opacity duration-1000 ease-in-out 
              ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
            `}
          />
        ))}
        <div className="absolute inset-0 bg-black/50"></div> {/* Dark Overlay */}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start hidden & below
        animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate when in view
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full  mx-auto text-center "
      >
        <Slider {...settings}>
          {caseStudies.map(({ name, title, content, link }) => (
            <div
              key={`case-study-${name}`}
              className="w-full align-center h-full mx-auto my-auto text-center md:pt-16 pt-12"
            >
              <h3 className="w-full md:max-w-[65%] mx-auto text-center text-2xl sm:text-3xl md:text-5xl text-primary px-6 sm:px-8">
                {title}
              </h3>
              <p className="py-2 md:py-8 w-full md:max-w-[85%] mx-auto text-center text-xl sm:text-2xl md:text-4xl text-destructive-foreground px-4 sm:px-8">
                {content}
              </p>
              <Link href={link}>
                <Button
                  variant="outline"
                  className="rounded-full border-accent bg-transparent text-destructive-foreground p-4 hover:bg-accent transition-all duration-300"
                >
                  READ THE FULL CASE STUDY
                </Button>
              </Link>
            </div>
          ))}
        </Slider>
      </motion.div>
    </div>
  )
}
