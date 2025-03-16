import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Slider from 'react-slick'
import { FeatureCard } from '../components'
import { useRef } from 'react'
import { Media } from '@/payload-types'

export const Blogs: React.FC<{
  bgImage: string
  title: string
  blogs?: {
    content: string
    title: string
    link: { label: string; url: string }
    name: string
    image: Partial<Media>
  }[]
}> = ({ bgImage, blogs, title }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <></>,
    prevArrow: <></>,
    slidesToShow: 4,
    Infinity: false,
    dotsClass: 'slick-dots !text-left left-[40px] bottom-[-65px]',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dotsClass: 'slick-dots !text-center !left-[0px] bottom-[-65px] mx-auto',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dotsClass: 'slick-dots !text-center !left-[0px] bottom-[-65px] mx-auto',
        },
      },
    ],
  }
  let sliderRef = useRef<Slider>(null)
  const next = () => {
    sliderRef?.slickNext()
  }
  const previous = () => {
    sliderRef?.slickPrev()
  }
  return (
    <div className="w-full !h-[130dvh] min-h-[700px]">
      <div className="relative h-screen w-full ">
        <div className="clipped-image absolute inset-0 !h-[130dvh] min-h-[700px]">
          <Image
            src={bgImage}
            alt="Blogs Background Image"
            fill
            className="bg-cover w-full !h-[130dvh] min-h-[700px]"
          />
        </div>
        {blogs && blogs?.length > 0 && (
          <div className="absolute md:top-2/3 top-2/3 sm:top-3/4 transform -translate-y-1/2 w-full ">
            <div className="relative lg:ml-24 ml-0 flex justify-between items-start lg:mb-12 mb-10 flex-wrap gap-x-20 gap-y-4 ">
              <div className="text-primary text-2xl md:text-3xl !z-50">{title}</div>
              <div className="  flex-row justify-end items-center gap-2 text-primary !z-50 lg:flex hidden">
                <div onClick={previous} className="cursor-pointer !z-50">
                  <svg
                    width="50"
                    height="20"
                    viewBox="0 0 50 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="50" y1="10" x2="5" y2="10" stroke="currentColor" stroke-width="2" />
                    <polyline
                      points="15,2 5,10 15,18"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <div onClick={next} className="cursor-pointer !z-50">
                  <svg
                    width="50"
                    height="20"
                    viewBox="0 0 50 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="0" y1="10" x2="45" y2="10" stroke="currentColor" stroke-width="2" />
                    <polyline
                      points="35,2 45,10 35,18"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="blogs-list-silder overflow-hidden md:ml-12  max-w-full ml-0 h-[420px] md:h-[550px] right[-30px]">
              <Slider
                ref={(slider: any) => {
                  sliderRef = slider
                }}
                {...settings}
              >
                {blogs?.map(({ image, content, link, name, title }, index) => (
                  <div
                    className={`pr-4 ${index === 0 ? 'pl-2' : 'pl-4'} overflow-hidden md:h-[450px]  h-[350px]`}
                    key={`blogs-${name}`}
                  >
                    <FeatureCard
                      imageClassName="!h-[150px]"
                      className="bg-background prose-p:text-foreground"
                      title={title}
                      image={image}
                      settings={{ card: 'outline' }}
                      content={content}
                      link={{ ...link, type: 'custom' }}
                      contentClassName="justify-between"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
